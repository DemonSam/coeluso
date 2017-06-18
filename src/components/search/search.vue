<template>
  <div class="search">
      <div class="search-wrapper">
          <div class="search-operation">
            <div class="search-options">
                <input type="button" value="Song" @click="displayOptions=!displayOptions">
                <ul v-show="displayOptions">
                    <li>Song</li>
                    <li>Singer</li>
                    <li>Album</li>
                    <li>MV</li>
                </ul>
            </div>
            <div class="search-input">
                <input type="text" class="search-input" placeholder="Please enter search content" v-model="searchInput">
                <input v-if="searchInput" type="button" value="Search" class="search-btn" @click='search'>
                <input v-else type="button" value="Cancel" class="cancel-btn" @click='cancel'>
            </div>
        </div>
        <div class="search-result-list" ref="result">
            <ul v-if="searchResultList.length !== 0">
                <li v-for="(song,index) in searchResultList" @click="addPlaySong(song,index)">
                    <div class="song-item">
                        <span class="serial-number" v-text="index +1"></span>
                        <div class="song-info">
                            <div class="singer" v-text="song.singer"></div>
                            <div class="song-name" v-text="song.name"></div>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else class="tip">There is no display content</div>
        </div>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
  data () {
      return {
          displayOptions:false,
          inSearch:false,
          searchResultList:[],
          searchInput:''
      }
  },
  methods: {
      _initScroll(){
        //   if(this.searchResultList.length === 0){return}
          if(this.$refs.result){
                console.log('有')
            }
            else{
                console.log('没有')
            }
            this.$nextTick(() =>{
                
                if(!this.listScroll ){
                    console.log('创建事件...')
                    this.listScroll = new BScroll(this.$refs.result,{
                        click:true
                    })
                    console.log(this.listScroll)
                }
                else{
                    console.log('刷新事件...')
                    this.listScroll.refresh();
                }
            })
        },
      addPlaySong(song,Index){
          var playlistLen = this.$store.state.playList.length
          this.searchResultList[Index].index = playlistLen;
          this.$store.state.playList.push(this.searchResultList[Index])
          this.$store.dispatch('playSongs', this.searchResultList[Index]);
      },
      cancel(){
          this.$router.go(-1)
      },
      search(){
          this.searchResultList = [];
          var res = this.promiseGetSong(this.searchInput);
          res.then(res=>{
              var res = JSON.parse(res).result.songs;
              var song= {}
              for(var  i = 0;i<res.length;i++){
                  song.id = res[i].id;;
                  song.index = '';
                  song.name =  res[i].name;
                  song.picUrl = res[i].al.picUrl;
                  song.singers = [];
                  song.play = false;
                  song.totalTime = '0.00';
                  song.url = '';
                  var arr_singers = [];
                  for(var  j = 0;j<res[i].ar.length;j++){
                      console.log(1)
                       var singerInfo = {
                            id: res[i].ar[j].id,
                            name: res[i].ar[j].name
                        }
                        arr_singers.push(res[i].ar[j].name)
                        song.singers.push(singerInfo)
                  }
                  song.singer = arr_singers.join(' / ');
                  this.searchResultList.push(song);
                  song = {};
              }
          })
      },
      promiseGetSong(content){
          var _this = this;
          return new Promise(function(resolve, reject) {
              _this.$http.get('https://api.imjad.cn/cloudmusic/?type=search&s='+content+'&limit=10').then(res=>{
                  resolve(res.request.response)
              })
          })
      }
  },
  created () {
      this._initScroll()
  },
  watch: {
      searchResultList(){
          console.log('数据变动')
          this._initScroll()
      },
      $route(to,form){
        if(to.path === '/search'){
            if(this.listScroll){
                this.listScroll.refresh();
            }
        }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    .search{
        width: 100%;
        height: 100%;
        .search-wrapper{
            position: relative;
            width: 100%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction:column;
            .search-operation{
                flex:0 0 50px;
                width: 100%;
                display: flex;
                padding-left: 5%;
                box-sizing: border-box;
                align-items: center;
                color:#fff;
                text-align: center;
                display: flex;
                background: #ff3334;
                .search-options{
                    flex: 0 0 70px;
                    width: 70px;
                    height: 35px;
                    line-height: 35px;
                    background: #fff;
                    color: #231;
                    position: relative;
                    input{
                        background: transparent;
                        outline: none;
                    }
                    ul{
                        position: absolute;
                        top: 35px;
                        width: 70px;
                        background: #fff;
                        z-index: 100;
                        li{
                            border-bottom: 1px solid rgba(0,0,0,0.2)
                        }
                    }
                }
                .search-input{
                    flex: 1;
                    display: flex;
                    .search-input{
                        flex: 1;
                        height: 35px;
                        text-indent: 10px;
                        outline: none;
                    }
                    .search-btn,.cancel-btn{
                        flex: 0 0 70px;
                        height: 35px;
                        background: #ff3334;
                        color: #fff;
                        outline: none;
                    }
                }
            }
            .search-result-list{
                position: absolute;
                top: 50px;
                bottom: 0;
                left: 5%;
                flex: 1;
                width: 90%;
                margin: 0 auto;
                overflow: hidden;
                ul{
                    li{
                        
                        .song-item{
                            width: 100%;
                            display: flex;
                            align-items: center;
                            padding: 15px 0;
                            // border-bottom:1px solid #12203e;
                            border-bottom: 1px solid rgba(255,255,255,.1);
                            font-size:18px;
                            .serial-number{
                                flex: 0 0 20px;
                                padding-right: 15px;
                                color: #336dbb;
                            }
                            .song-info{
                                flex: 1;
                                padding-right: 20px;
                                color: #fff;
                                .singer{
                                    height: 18px;
                                    color: #2a5ea4;
                                    font-size: 16px;
                                }
                                .song-name{
                                    height: 18px;
                                    font-size: 18px;
                                }
                            }
                        }
                    }
                }
                .tip{
                    text-align: center;
                    font-size: 20px;
                    margin-top: 50px;
                    color: #fff;
                }
            }
        }
    }
</style>


