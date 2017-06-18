<template>
    <div class="navigation" :class="{active:show}">
        <transition name="fade">
            <div class="overlay" v-show="show" @click="toggle"></div>
        </transition>
        <div class="icon" @click="toggle" :class="{active:show}">
            <i :class="nowIcon"></i>
        </div>
        <div class="fan-menu" :class="{active:show}">
            <ul>
                <li v-for="item in initList">
                    <a href="javascript:;" @click="playlist" v-if="item==='playlist'">
                        <i class="icon-sound-mix"></i>
                    </a>
                    <a href="javascript:;" @click="profile" v-else-if="item==='profile'">
                        <i class="icon-profile"></i>
                    </a>
                    <a href="javascript:;" @click="player" v-else-if="item==='player'">
                        <i class="icon-song"></i>
                    </a>
                    <a href="javascript:;" @click="music" v-else-if="item==='mymusic'">
                        <i class="icon-listen"></i>
                    </a>
                </li>
            </ul>
        </div>
        </div>    
    </div>
  
</template>
<script>
export default {
    props: {
        nowpath:{
            type:String,
        }
    },
    data () {
        return {
            show:false,
            route:['playlist','player','profile','mymusic']
        }
    },
    computed: {
      initList(){
          var newRoute = []
          for(var i=0;i<this.route.length;i++){
              if(this.nowpath === this.route[i]){
                continue;
              }
              newRoute.push(this.route[i])
          }
          return newRoute;
      },
      nowIcon(){
            if(this.nowpath === 'playlist'){
                return 'icon-sound-mix';
            }
            else if(this.nowpath === 'player'){
                return 'icon-song';
            }
            else if(this.nowpath === 'profile'){
                return 'icon-profile';
            }
            else if(this.nowpath === 'mymusic'){
                return 'icon-listen';
            }
        },
    },
    methods: {
        toggle(){
            this.show = !this.show;
        },
        playlist(){
            this.toggle();
            this.$router.push('/playlist')
        },
        player(){
            this.toggle();
            this.$router.push('/player')
        },
        profile(){
            this.toggle();
            this.$router.push('/profile')
        },
        music(){
            this.toggle();
            this.$router.push('/mymusic')
        }
    }
}
</script>

<style lang="scss">
    .navigation{
        position: absolute;
        bottom: 0;
        right: 0;
        &.active{
            width: 100%;
            height: 100%;
        }
        .overlay{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: rgba(0,0,0,0.7);
            transition: all 0.3s;
            &.fade-enter-active,&.fade-leave-active{
                transition: all 0.3s;
            }
            &.fade-enter,&.fade-leave-active{
                opacity: 0;
            }
            &.active{
                display: block;
                opacity: 1;
                transition: all 0.3s;
            }
        }
        .icon{
            width: 50px;
            height: 50px;
            border-top-left-radius: 50px;
            position: absolute;
            right: 0;
            bottom: 0;
            background: #231433;
            color: #fff;
            line-height: 3.8;
            text-align: center;
            text-indent: 10px;
            z-index: 100;
            opacity: 0.5;
            transition: all 0.3s;
            &.active{
                opacity: 1;
                transition: all 0.3s;
            }
        }
        .fan-menu{
            position: absolute;
            right: 0;
            bottom: 0;
            width: 150px;
            height: 150px;
            overflow: hidden;
            transform: scale(0);
            transition: all 0.3s ease;
            transform-origin: 100% 100%;
            border-top-left-radius: 150px;
            transition: all 0.3s;
            &.active{
                width: 150px;
                height: 150px;
                overflow: hidden;
                border-top-left-radius: 150px;
                transform: scale(1);
                transition: all 0.3s;
            }
            ul{
                li{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 150px;
                    height: 150px;
                    transform-origin: 100% 100%;
                    overflow: hidden;
                    &:nth-child(1){
                        background-color: hsla(0, 88%, 63%, 1);
                        transform: rotate(0) skew(60deg);
                    }
                    &:nth-child(2){
                        background-color: hsla(0, 88%, 65%, 1);
                        transform: rotate(30deg) skew(60deg);
                    }
                    &:nth-child(3){
                        background-color: hsla(0, 88%, 63%, 1);
                        transform: rotate(60deg) skew(60deg);
                    }
                    a{
                        position: absolute;
                        top:0;
                        left:0;
                        display: block;
                        width: 300px;
                        height: 300px;
                        padding-top: 18px;
                        font-size: 20px;
                        transform: skew(-60deg) rotate(-73deg) scale(1);
                        text-align: center;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>

