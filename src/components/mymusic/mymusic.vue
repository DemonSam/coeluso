<template>
    <div class="my-music">
        <div class="my-music-wrapper">
            <v-header title='My Music'></v-header>
            <div class="songs">
                <div class="songs-wrapper" ref="music" >
                    <ul class="list" v-if="myMusic.length!==0">
                        <li v-for="(song,index) in myMusic">
                            <!--<router-link to="/player">-->
                            <div class="song-item" :class="{playing:song.play}">
                                <span class="serial-number" v-text="index +1"></span>
                                <div class="song-info">
                                    <div class="singer" v-text="song.singer"></div>
                                    <div class="song-name" v-text="song.name"></div>
                                </div>
                                <div class="icon" @click="togglePlaySongs(song)">
                                    <i :class="{'icon-pause':song.play,'icon-player':!song.play}"></i>
                                </div>
                            </div>
                            <!--</router-link>-->
                        </li>
                    </ul>
                    <div class="txt-loading" v-else>
                        <p>The list of songs is empty. </p>
                        <br>
                        <p>Please add songs</p>
                    </div>
                </div>
                
            </div>
            
        </div>
        <div class="music-control">
                <div class="pic-control">
                    <div class="pic-control-wrapper">
                    <img :src="playSong.picUrl" alt="playSong.name">
                    </div>
                </div>
                <div class="info">
                    <router-link to="/player">
                        <div class="song-info">
                            <div class="name" v-text="playSong.songName"></div>
                            <div class="singer" v-text="playSong.singer"></div>
                        </div>
                    </router-link>  
                </div>
                <div class="obstacle"></div>
        </div>
        <!--<navigation nowpath="mymusic"></navigation>-->
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import header from 'components/header/header';
import navigation from 'components/navigation/navigation'
export default {
    computed: {
        myMusic(){
            return this.$store.state.myMusic;
        },
        play(){
            return this.$store.state.play;
        },
        playSong(){
            return this.$store.state.playSong;
        }
    },
    methods:{
        _initScroll(){
            this.$nextTick(() =>{
                if(!this.listScroll){
                    console.log('创建事件...')
                    this.listScroll = new BScroll(this.$refs.music,{
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
        togglePlaySongs(song){
            var currentIndex = null;
            var playing = song.play;
            if(song.id === this.$store.state.playSong.id){
                for(let i = 0;i<this.$store.state.myMusic.length;i++){
                    if(this.$store.state.myMusic[i].id === song.id){
                        this.$store.state.myMusic[i].play = !this.$store.state.myMusic[i].play;
                        this.$store.dispatch('play', this.$store.state.myMusic[i].play);
                    }
                }
            }
            else{
                for(let i = 0;i<this.$store.state.myMusic.length;i++){
                    this.$store.state.myMusic[i].play = false;
                }
                for(let i = 0;i<this.$store.state.myMusic.length;i++){
                    if(this.$store.state.myMusic[i].id === song.id){
                        this.$store.state.myMusic[i].play = true;
                    }
                }
                this.$store.dispatch('playSongs', song);
            }
        }
    },
    created () {
        this._initScroll()
    },
    watch: {
        play(cur){
            if(cur){
                for(let i = 0;i<this.$store.state.myMusic.length;i++){
                    if(this.$store.state.myMusic[i].id === this.playSong.id){
                        this.$store.state.myMusic[i].play = true;
                    }
                }
            }
            else{
                for(let i = 0;i<this.$store.state.myMusic.length;i++){
                    this.$store.state.myMusic[i].play = false;
                }
            }
        },
        myMusic(){
            this.$nextTick(() =>{
                this.listScroll.refresh();
            })
        },
        $route(to,form){
            if(to.path === '/mymusic'){
                if(this.listScroll){
                    this.listScroll.refresh();
                }
            }
        }
    },
    components:{
        'v-header':header,
        navigation
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    .my-music{
        width: 100%;
        height: 100%;
        position: relative;
        .my-music-wrapper{
            width: 90%;
            height: 100%;
            margin: 0 auto;
            .songs{
                height:85%;
                width:90%;
                position:relative;
                overflow:hidden;
                margin: 0 auto;
                .songs-wrapper{
                    position:absolute;
                    left:0;
                    bottom:0;
                    width:100%;
                    height:100%;
                    overflow:hidden;
                    .list{
                        li{
                            &:last-child .song-item{
                                border: 0;
                            }
                            .song-item{
                                display:flex;
                                border-bottom:1px solid #314671;
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
                                    color:#49618e;
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
                                .icon{
                                    font-size: 24px;
                                    color:#ff3334;
                                }
                            }
                        }
                    }
                    .txt-loading{
                        font-size: 22px;
                        text-align: center;
                        margin-top: 100px;
                        color: #ff3334;
                    }
                    
                }
            }
        }
        .music-control{
            display: flex;
            position: absolute;
            width: 100%;
            height: 50px;
            bottom: 0;
            .pic-control{
                flex: 0 0 66px;
                .pic-control-wrapper{
                        width: 60px;
                        height: 60px;
                        border: 5px solid rgba(255,255,255,.2);
                        overflow: hidden;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        border-top-left-radius: 50px;
                        border-top-right-radius: 50px;
                        img{
                        width: 100%;
                        height: 100%;
                    }
                }
                
            }
            .info{
                flex: 1;
                padding-left: 20px;
                padding-right: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .song-info{
                    padding-top: 5px;
                    .name{
                        padding-bottom: 5px;
                        font-size:18px;
                        // line-height: 24px;                        
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #fff;
                    }
                    .singer{
                        padding-bottom: 5px;
                        font-size:16px;
                        // line-height: 24px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #4f9aff;
                    }
                    
                }
                border-top: 1px solid rgba(255,255,255,.3);
            }
            .obstacle{
                flex: 0 0 70px;
                border-top: 1px solid rgba(255,255,255,.3);
            }
        }
    }
</style>

