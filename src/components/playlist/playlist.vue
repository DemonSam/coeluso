<template>
    <div class="playlist">
        <div class="playlist-wrapper">
            <div class="playlist-header-wrapper" ref="playheader">
                <div class="playlist-header">
                    <v-header :title="playSong.songName" :fontSize="20">
                        <p class="play-singer" v-text="playSong.singer"></p>
                    </v-header>
                </div>
                <div class="play">
                    <div class="play-function">
                        <span class="time time-start" v-text="playSong.currentTime"></span>
                        <div class="function">
                            <div class="item cycle-mode">
                                <i class="icon icon-random"></i>
                            </div>
                            <div class="item prev">
                                <i class="icon icon-previous" @click="previousSong"></i>
                            </div>
                            <div class="item player-btn" @click="playfn">
                                <i class="icon " :class="{ 'icon-player': !play, 'icon-pause':play}"></i>
                            </div>
                            <div class="item next" @click="nextSong">
                                <i class="icon icon-next"></i>
                            </div>
                            <div class="item repeat">
                                <i class="icon icon-repeat"></i>
                            </div>
                        </div>
                        <span class="time time-total" v-text="playSong.totalTime"></span>
                    </div>
                    <div class="play-bar">
                        <div class="play-now" ref="curplay" :style="{width:percentage}"></div>
                    </div>
                </div>
            </div>
            <div class="songs">
                <div class="songs-wrapper" ref="playlist" >
                    <ul class="list" v-if="initList.length!==0">
                        <li v-for="(song,index) in initList" @click="selectPlaySongs(song)">
                            <router-link to="/player">
                            <div class="song-item" :class="{playing:song.play}">
                                <span class="serial-number" v-text="index+1"></span>
                                <div class="song-info">
                                    <div class="singer" v-text="song.singer"></div>
                                    <div class="song-name" v-text="song.name"></div>
                                </div>
                                <!--<span class="time-total" v-text="song.totalTime"></span>-->
                            </div>
                            </router-link>
                        </li>
                    </ul>
                    <div class="txt-loading" v-else>loading...</div>
                </div>
            </div>
        </div>
        <!--<navigation nowpath="playlist"></navigation>-->
    </div>
</template>
<script>
    import BScroll from 'better-scroll';
    import header from 'components/header/header';
    import navigation from 'components/navigation/navigation'
    export default {
        data () {
            return {
                listIndex:0
            }
        },
        computed:{
            initList(){
                return this.$store.state.playList;
            },
            playSong(){
                return this.$store.state.playSong;
            },
            percentage(){
                return this.$store.state.percentage;
            },
            play(){
                return this.$store.state.play;
            }
        },
        methods:{
            previousSong(){
                var playlist = this.$store.state.playList;
                var currentListIndex =this.playSong.currentListIndex;
                if(currentListIndex-1 ===  -1){
                    this.$store.state.playList.length
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
            getInfo(_this,id){
                var _this =this;
                return new Promise(function(resolve, reject){
                    _this.$http.get('https://api.imjad.cn/cloudmusic/?id='+id).then(res=>{
                        var url = JSON.parse(res.request.response).data[0].url;
                        var audio = new Audio();
                        audio.src = url;
                        var timer = setInterval(function(){
                            if(audio.duration){
                                var info = {
                                    id:id,
                                    url:url,
                                    time:audio.duration
                                }
                                resolve(info);
                                clearInterval(timer);
                                audio = null;
                            }
                        },1000)
                    })
                })
            },
            _initData(){
                var _this =this;
                this.getInfo(this,this.initList[this.listIndex].id).then(function(res){
                        _this.listIndex+=1;
                        _this.$store.state.playList.forEach(function(item) {
                        if(item.id === res.id){
                            item.url = res.url;
                            item.totalTime = (res.time / 60).toFixed(2);
                        }
                    }, this);
                    if(_this.listIndex<_this.initList.length){
                        // 循环调用 到列表下载完 （耗费流量 拖网络） 待改善
                        // _this._initData();
                    }
                })
            },
            _initScroll(){
                this.$nextTick(() =>{
                    this.$refs.playlist.getElementsByClassName('list')[0].style.paddingBottom = this.$refs.playheader.offsetHeight + "px";
                    if(!this.listScroll){
                        console.log('创建事件...')
                        this.listScroll = new BScroll(this.$refs.playlist,{
                            click:true
                        })
                    }
                    else{
                        console.log('刷新事件...')
                        this.listScroll.refresh();
                    }
                })
            },
            playfn(){
                var play = !this.play;
                this.$store.dispatch('play',play);
            },
            selectPlaySongs(song){
                this.$store.dispatch('playSongs',song)
            }
        },
        created(){
            this._initScroll();
        },
         watch:{
             initList(){
                 console.log('列表数据变动调用函数')
                 this._initScroll();
                 var _this = this;
                 var timer = setTimeout(function(){
                     _this._initData();
                     clearTimeout(timer)
                 },1000)
             },
             $route(to,form){
                 if(to.path === '/playlist'){
                     if(this.listScroll){
                         this._initScroll();
                     }
                 }
             }
         },
        components: {
            'v-header': header,
            navigation
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .playlist {
        position: absolute;
        top: 0;
        left: 0;
        bottom:0;
        width: 100%;
        height:100%;
        background: url(../../assets/Background.png) no-repeat;
        background-size: cover;
        overflow:hidden;
        .playlist-wrapper {
            width: 100%;
            height:100%;
            .playlist-header-wrapper {
                width: 100%;
                background: #061326;
                .playlist-header {
                    width: 90%;
                    margin: 0 auto;
                    .play-singer {
                        padding:0 35px;
                        font-size: 16px;
                        font-weight: bold;
                        text-align: center;
                        text-transform: uppercase;
                        color: #183965;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .play {
                    width: 100%;
                    .play-function {
                        display: flex;
                        width: 90%;
                        padding: 30px 0;
                        margin: 0 auto;
                        align-items: center;
                        .time {
                            flex: 0 0 30px;
                            color: #fff;
                        }
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
                                color: #ff3334;
                            }
                        }
                        .icon {
                            font-size: 36px;
                        }
                        .cycle-mode .icon,
                        .repeat .icon {
                            font-size: 22px;
                        }
                    }
                    .play-bar {
                        position: relative;
                        width: 100%;
                        height: 5px;
                        background: #052045;
                        .play-now {
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 5px;        
                            background: #ff3334;                    
                            transition: all 0.5s
                        }
                    }
                }
            }
            .songs{
                height:100%;
                width:90%;
                position:relative;
                overflow:hidden;
                margin: 0 auto;
                .songs-wrapper{
                    position:absolute;
                    top:0;
                    left:0;
                    bottom:0;
                    width:100%;
                    height:100%;
                    overflow:hidden;
                    .list{
                        padding-bottom:150px;
                        li{
                            .song-item{
                                display:flex;
                                border-bottom:1px solid #12203e;
                                align-items:center;
                                padding:15px 0;
                                &.playing{
                                    .serial-number{
                                       color: #05c3ff;
                                    }
                                    .song-info{
                                        .singer{
                                            color: #4f9aff;
                                        }
                                        .song-name{
                                            color: #00ffc6;
                                        }
                                    }
                                    .time-total{
                                        color: #3cfb00;
                                    }
                                }
                                .serial-number{
                                    flex:0 0 20px;
                                    padding-right:10px;
                                    color:#17345b;
                                    font-size:18px;
                                }
                                .song-info{
                                    flex:1;
                                    padding-right: 20px;
                                    display:flex;
                                    flex-direction:column;
                                    overflow: hidden;
                                    .singer{
                                        flex:1 1 auto;
                                        width:100%;
                                        height:18px;
                                        color:#2a5ea4;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                    }
                                    .song-name{
                                        flex:1 1 auto;
                                        height:18px;
                                        color:#ffffff;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                    }
                                    
                                }
                                .time-total{
                                    color:#fff;
                                }
                            }
                        }
                    }
                    .txt-loading{
                        font-size: 30px;
                        text-align: center;
                        margin-top: 100px;
                        color: #ff3334;
                    }
                }
            }
        }
        
    }
</style>
