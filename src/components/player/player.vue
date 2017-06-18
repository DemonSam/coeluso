<template>
    <div class="player">
        <div class="player-wrapper">
            <div class="player-top">
                <v-header title='Player'></v-header>
                <div class="song">
                    <div class="song-pic">
                        <transition name="load">
                            <div v-if="!songPicLoad" class="loading">

                                <div class="icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </transition>
                        <transition name="song-pic">
                            <img v-if="songPicLoad" class="song-pic" :src="playSong.picUrl" :alt="playSong.songName">
                        </transition>
                    </div>
                    <div class="song-info">
                        <div class="stats">
                            <i class="icon-activity"></i>
                        </div>
                        <div class="song-and-band">
                            <h2 class="song-name" v-text="playSong.songName"></h2>
                            <p class="band" v-text="playSong.singer"></p>
                        </div>
                        <div class="like" @click="collection">
                            <i :class="{ 'icon-heart-o': !mark, 'icon-heart':mark}"></i>
                        </div>
                    </div>

                </div>
            </div>
            <div class="playback-progress">
                <div class="time">
                    <span class="now" v-text="playSong.currentTime"></span>
                    <span class="total" v-text="playSong.totalTime"></span>
                </div>
                <div class="player-bar" @touchstart="changePercentage" @touchend="PerTouchEnd" @touchcancel="PerTouchEnd">
                    <div class="loading" :style="{width:loadProgress}" ></div>
                    <div class="player-now" ref="curplay" :style="{width:percentage}"></div>
                </div>
            </div>
            <div class="player-bottom">
                <div class="play">
                    <div class="play-function">
                        <div class="function">
                            <div class="item cycle-mode">
                                <i class="icon icon-random"></i>
                            </div>
                            <div class="item prev" @click="previousSong">
                                <i class="icon icon-previous"></i>
                            </div>
                            <div class="item player-btn" @click="playfn">
                                <i class="icon" :class="{ 'icon-player': !play, 'icon-pause':play}"></i>
                            </div>
                            <div class="item next" @click="nextSong">
                                <i class="icon icon-next"></i>
                            </div>
                            <div class="item repeat">
                                <i class="icon icon-repeat"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="check">
                    <p>check night visions</p>
                </div>
            </div>
        </div>
        <!--<navigation nowpath="player"></navigation>-->
    </div>
</template>
<script>
import header from 'components/header/header';
import navigation from 'components/navigation/navigation'
    export default {
        data () {
            return {
                mark:false
            }
        },
        methods:{
            collection(){
                this.mark = !this.mark;
                var id =  this.playSong.id;
                if(this.mark){
                    // 调用收藏
                    this.$store.dispatch('collection',id);
                    console.log('收藏')
                    console.log(this.$store.state.myMusic)
                    window.localStorage.setItem(this.$store.state.userName,JSON.stringify(this.$store.state.myMusic))
                }
                else{
                    // 调用取消收藏
                    this.$store.dispatch('cancelCollection',id)
                    console.log('取消收藏')
                    console.log(this.$store.state.myMusic)
                    window.localStorage.setItem(this.$store.state.userName,JSON.stringify(this.$store.state.myMusic))
                }
            },
            previousSong(){
                //  由于开始那里设置了 链接没用的话播放下一曲 在APP页面 BUG
                var playlist = this.$store.state.playList;
                var currentListIndex =this.playSong.currentListIndex;
                if(currentListIndex-1 ===  -1){
                    this.$store.dispatch('playSongs', playlist[playlist.length-1]);
                }
                else{
                    this.$store.dispatch('playSongs', playlist[currentListIndex-1]);
                }
                   
            },
            nextSong(){
                var currentListIndex =this.playSong.currentListIndex;
                if(currentListIndex+1 ===  this.$store.state.playList.length){
                    this.$store.dispatch('playSongs', this.$store.state.playList[0]);
                }
                else{
                    this.$store.dispatch('playSongs', this.$store.state.playList[currentListIndex+1]);
                }
            },
            playfn(){
                var play = !this.play;
                this.$store.dispatch('play',play);
            },
            setPercentage(event){
                var _this = this;
                var iWidth = window.document.body.offsetWidth;
                var x = event.touches[0].pageX - event.target.offsetLeft;
                if(x > event.target.offsetWidth){
                    x = event.target.offsetWidth;
                }
                else if(x < 0){
                    x = 0;
                }
                 var percent = ((x / iWidth) * 100) + "%";
                 this.$refs.curplay.style.width= percent + "%"
                 this.$store.dispatch('percentage', percent);
                 this.$store.dispatch('changeSchedule', true);
            },
            PerTouchEnd(event){
                document.removeEventListener('touchmove',this.PerTouchMove)
                document.removeEventListener('touchcancel',this.PerTouchEnd)
                document.removeEventListener('touchend',this.PerTouchEnd)
            },
            PerTouchMove(event){
                this.setPercentage(event);
            },
            changePercentage(event){
                this.setPercentage(event);
                document.addEventListener('touchmove',this.PerTouchMove)
                document.removeEventListener('touchcancel',this.PerTouchEnd)
                document.removeEventListener('touchend',this.PerTouchEnd)
            }
        },
        computed:{
            playSong(){
                return this.$store.state.playSong;
            },
            percentage(){
                return this.$store.state.percentage;
            },
            play(){
                return this.$store.state.play;
            },
            songPicLoad(){
                return this.$store.state.songPicLoad;
            },
            myMusic(){
                return this.$store.state.myMusic;
            },
            loadProgress(){
                return this.$store.state.loadProgress + '%';
            }
        },
        watch: {
            'playSong.id':{
                 handler(curVal,oldVal){
                     this.mark = false;
                     for(let i =0;i<this.myMusic.length;i++){
                         if(curVal === this.myMusic[i].id){
                             this.mark = true;
                        }
                     }
                     
                 },
                 deep: true
            }
        },
        components: {
            'v-header':header,
            navigation
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .player{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: url(../../assets/Background.png) no-repeat;
        background-size: cover;
        .player-wrapper{
            width:100%;
            height:100%;
            .player-top{
                width:90%;
                margin:0 auto;
                .song{
                    .song-pic{
                        width:162px;
                        height:162px;
                        margin:0 auto;
                        line-height: 162px;
                        border-radius:50%;
                        overflow:hidden;
                        box-shadow:0 0 55px rgb(0,0,0);
                        .loading-enter-active, .loading-leave-active{
                            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        }
                        .loading-enter,.loading-leave-active{
                            opacity: 0;
                        }
                        
                        .loading{
                            display: flex;
                            width: 100%;
                            height: 100%;
                            font-size:50px;
                            color: #fff;
                            align-items: center;
                            text-align: center;
                            .icon{
                                width: 100px;
                                height: 100px;
                                position: relative;
                                margin: 0 auto;
                                span{
                                    display: inline-block;
                                    width: 16px;
                                    height: 16px;
                                    border-radius: 50%;
                                    background: lightgreen;
                                    position: absolute;
                                    animation: load 1.04s ease infinite;
                                    &:nth-child(1){
                                        left: 0;
                                        top: 50%;
                                        margin-top:-8px;
                                        animation-delay:0.13s;
                                    }
                                    &:nth-child(2){
                                        left: 14px;
                                        top: 14px;
                                        animation-delay:0.26s;
                                    }
                                    &:nth-child(3){
                                        left: 50%;
                                         top: 0;
                                        margin-left: -8px;
                                        animation-delay:0.39s;
                                    }
                                    &:nth-child(4){
                                        top: 14px;
                                        right:14px;
                                        animation-delay:0.52s;
                                    }
                                    &:nth-child(5){
                                        right: 0;
                                        top: 50%;
                                        margin-top:-8px;
                                        animation-delay:0.65s;
                                    }
                                    &:nth-child(6){
                                        right: 14px;
                                        bottom:14px;
                                        animation-delay:0.78s;
                                    }
                                    &:nth-child(7){
                                        bottom: 0;
                                        left: 50%;
                                        margin-left: -8px;
                                        animation-delay:0.91s;
                                    }
                                    &:nth-child(8){
                                        bottom: 14px;
                                        left: 14px;
                                        animation-delay:1.04s;
                                    }
                                }
                                
                            }
                        }
                        .song-pic{
                            width:100%;
                            height:100%;
                        }
                        .song-pic-enter-active, .song-pic-leave-active{
                            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        }
                        .song-pic-enter,.song-pic-leave-active{
                            transform: scale(0);
                        }
                    }
                    .song-info{
                        display:flex;
                        padding:50px 0;
                        justify-content: center;
                        text-align:center;
                        align-items:center;
                        font-size:22px;
                        .stats{
                            flex: 0 0 40px;
                            color:#1b3f70;
                        }
                        .song-and-band{
                            flex:1;
                            padding:0 16px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            .song-name{
                                padding-bottom:10px;
                                font-size:18px;
                                color:#fff;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            .band{
                                font-size:16px;
                                font-weight:bold;
                                color:#183965;
                                text-transform:uppercase;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                        .like{
                            flex: 0 0 40px;
                            
                            color:#ff3334;
                        }

                    }
                }
            }
            .playback-progress{
                width:100%;
                .time{
                    display:flex;
                    width:90%;
                    margin:0 auto;
                    margin-bottom:10px;
                    color:#fff;
                    font-size:16px;
                    .now{
                        flex:1;
                        text-align:left;
                    }
                    .total{
                        flex:1;
                        text-align:right;
                    }
                }
                .player-bar{
                    position:relative;
                    width:100%;
                    height:5px;
                    background:#031a3a;
                    .loading{
                        background-color: #a78888;
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        opacity: 0.2;
                    }
                    .player-now{
                        position:absolute;
                        top:0;
                        left:0;
                        height:5px;
                        background:#ff3334;
                    }
                }
            }
            .player-bottom{
                width:90%;
                margin:0 auto;
                .play {
                    width: 100%;
                    padding:50px 0;
                    .play-function {
                        display: flex;
                        width: 98%;
                        padding: 30px 0;
                        margin: 0 auto;
                        align-items: center;
                        .function {
                            flex: 1;
                            display: flex;
                            padding: 0 5px;
                            align-items: center;
                            .item {
                                flex: 1;
                                text-align: center;
                                color: #0d3f84;
                            }
                            .player-btn {
                                flex:2;
                                color: #ff3334;
                                .icon{
                                    font-size:70px;
                                }
                            }
                        }
                        .icon {
                            font-size: 40px;
                        }
                        .cycle-mode .icon,
                        .repeat .icon {
                            font-size: 22px;
                        }
                    }
                }
                .check{
                    font-size:18px;
                    letter-spacing:3px;
                    text-transform:uppercase;
                    text-align:center;
                    color:#162f53;
                    padding:10px 0;
                }
            }
        }
    }
    @keyframes loading{
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
    @keyframes load{
            0%{
                opacity: 1;
            }
            100%{
                opacity: 0.2;
            }
        }
</style>
