<template>
  <div id="app">
  <!--<img class="bg" src="./background.png" alt="">-->
    <audio :src="playSong.url" ref="play" @timeupdate="upDateTime"></audio>
    <transition :name="transitionName">
      <!--<transition name="loading" enter-active-class="animated slieInDown" leave-active-class="animated slideInUp">-->
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </transition>
    <div v-if="hideNav">
      <navigation :nowpath="path"></navigation>
    </div>
  </div>
</template>

<script>
import navigation from 'components/navigation/navigation'

export default {
  data () {
    return {
      transitionName:'moveup',
      hideNav:false,
      path:''
    }
  },
  methods:{
    upDateTime(){
        var ef = this.$refs.play;
        var curTime = (ef.currentTime / 60).toFixed(2);
        // this.$store.dispatch('currentTime', curTime);
        this.$store.state.playSong.currentTime = curTime;
        if(ef.ended){
          this.$store.dispatch('play', false);
          this.$store.dispatch('currentTime', '0.00');
          this.$store.dispatch('percentage', '0%');
          var currentListIndex =this.playSong.currentListIndex;
          if(currentListIndex+1 ===  this.$store.state.playList.length){
            this.$store.dispatch('playSongs', this.$store.state.playList[0]);
          }
          else{
            this.$store.dispatch('playSongs', this.$store.state.playList[currentListIndex+1]);
          }
          return;
        }
        if(ef.currentTime != 0){
            var percent = ((ef.currentTime / ef.duration).toFixed(2) * 100) + '%';
            // this.$store.dispatch('percentage', percent);
            this.$store.state.percentage = percent
        }
    }

  },
  computed:{
    changeSchedule(){
        return this.$store.state.changeSchedule;
    },
    signin(){
      return this.$store.state.signin;
    },
    playSong(){
      return this.$store.state.playSong;
    },
    play(){
      return this.$store.state.play;
    },
    firstLoading(){
      return this.$store.state.firstLoading;
    }
  },
  components: {
      navigation
  },
  created(){
    if(!window.localStorage.getItem('playlist734058968')){
        this.$http.get('https://api.imjad.cn/cloudmusic/?type=playlist&id=734058968').then(res=>{
        var res = JSON.parse(res.request.response).playlist.tracks;
        this.$store.dispatch('init',res);
        window.localStorage.setItem('playlist734058968',JSON.stringify(res));
      })
    }
    else{
      var stor = JSON.parse(window.localStorage.getItem('playlist734058968'));
      this.$store.dispatch('init',stor);
    }
    if(window.localStorage.getItem('play')){
      var play = JSON.parse(window.localStorage.getItem('play'));
      var info = {
        id:play.id,
        index:play.currentListIndex
      }
      this.$store.dispatch('playSongs',info)
    }
  },
  watch:{
    play(curVal,oldVal){
      if(curVal){
        var _this = this;
        var timer =setInterval(function(){
          console.log(_this.$refs.play.readyState)
          if(_this.$refs.play.readyState > 2){
            _this.$store.dispatch('updataLoadProgress',0)
            _this.$refs.play.play();
            clearInterval(timer)
          }
        },500)
          
      }else{
        this.$refs.play.pause();
      }
    },
    signin(curVal,oldVal){
      if(curVal){
        this.$router.push('/profile')
      }
    },
    $route(to,form){
      this.path = to.name;
      this.hideNav = false;
      if(to.name === 'playlist' || to.name === 'player' || to.name === 'profile' || to.name === 'mymusic'){
        this.hideNav = true;
      }
      if(to.path === '/playlist'){
        // this.transitionName = "in";
      }
      else if(to.path === '/player'){
        this.transitionName = "moveup";
      }

    },
    changeSchedule(curVal){
      if(curVal){
        var time = ((parseInt(this.$store.state.percentage)/100) * this.$store.state.playSong.totalTime*60);
        this.$refs.play.currentTime = time;
        this.$store.dispatch('changeSchedule',false)
      }
    },
    'playSong.url':{

      // 监听 现在播放歌曲url（playSong.url）的变更
      handler(curVal,oldVal){
        // this.$store.dispatch('songPicLoad',false)
        // 检查 当前链接是否 为null undefind 等等

        
        // if(!curVal){
        //   // 当前url不可用  播放下一曲  判断下一曲是不是最后一曲 ，如果是就播放第一首
        //   var currentListIndex =this.playSong.currentListIndex;
        //   if(currentListIndex+1 ===  this.$store.state.playList.length){
        //     this.$store.dispatch('playSongs', this.$store.state.playList[0]);
        //   }
        //   else{
        //     this.$store.dispatch('playSongs', this.$store.state.playList[currentListIndex+1]);
        //   }
        // }
        var _this = this;
        this.$refs.play.addEventListener('playing',function(){
          if(parseInt((this.buffered.end(0)/this.duration)*100) === 100){
            _this.$store.dispatch('updataLoadProgress',100)
          }
        })
        
        this.$refs.play.addEventListener('progress',function(){
          if(this.readyState  >1){
            _this.$store.dispatch('updataLoadProgress',parseInt((this.buffered.end(0)/this.duration)*100)) 
          }
        })
        this.$refs.play.addEventListener('durationchange',function(){
          // alert(this.duration)
          // 设置歌曲总时间信息 添加到当前播放[playSong]歌曲中 
          let time =(this.duration/60).toFixed(2);
          _this.$store.dispatch('totalTime',time);
          // 检测 是否第一次加载数据  如果是把 fistloging的值设置为 false
          // 好让之后选择歌曲之后 自动播放
          if(!_this.firstLoading){
              _this.$store.dispatch('play', true);
            }
            else{
              _this.$store.state.firstLoading = false;
            }
            // 修改播放列表 时间
            _this.$store.state.playList[_this.playSong.currentListIndex].totalTime = time;
            // 缓存 当前播放音乐 数据
            window.localStorage.setItem('play',JSON.stringify(_this.playSong));
        })
        // 加载歌曲图片
          _this.$store.dispatch('songPicLoad',false);
          var oImg = new Image();
          oImg.src = this.playSong.picUrl;
          oImg.onload =function() {
            _this.$store.dispatch('songPicLoad',true);
            oImg = null;
          }
        },
        deep: true
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  #app{
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    overflow:hidden;
    background:url('./background.png') no-repeat;
    background-size:cover;
    .bg{
      width:100%;
    }
    .init-enter-active, .init-leave-active{
      transition: all 0.8s linear;
    }
    .init-enter,.init-leave-active{
      opacity: 0;
    }
    .moveup-enter-active, .moveup-leave-active{
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      }
      .moveup-enter,.moveup-leave-active{
          transform: translate3d(0,-100%,0)
      }
  }
</style>
