<template>
    <div class="profile">
        <div class="profile-wrapper">
            <v-header :title="username"></v-header>
            <div class="user-info">
                <div class="photo">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495343089864&di=f2979d5c582cd4765f43ac8ec62d58da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20131121%2F21-074925_595.jpg" alt="">
                </div>
                <p class="msn">Lorem ipsum dolor sit amet</p>
                <input class="check" type="button" value="Check playlist" @click="palylist">
            </div>
            <div class="soogs">
                <h2 class="title">most player songs</h2>
                <ul class="list" v-if="myMusic.length!==0">
                    <li v-for="(song,index) in myMusic" :class="{playing:song.play}">
                        <span class="serial-number" v-text="index +1"></span>
                        <div class="song-info">
                            <div class="singer" v-text="song.singer"></div>
                            <div class="song-name" v-text="song.name"></div>
                        </div>
                        <div class="icon" @click="togglePlaySongs(song)">
                            <i :class="{'icon-pause':song.play,'icon-player':!song.play}"></i>
                        </div>
                    </li>
                </ul>
                <div class="txt-loading" v-else>
                    <p>Please add songs</p>
                </div>
            </div>
            <div class="more">
                <input type="button" value="View more" @click="mymusic">
            </div>
        </div>
        <!--<navigation nowpath="profile"></navigation>-->
    </div>
</template>
<script>
    import header from 'components/header/header';
    import navigation from 'components/navigation/navigation'
    export default {
        data(){
            return{
                username : 'Music'
            }
        },
        computed: {
            myMusic(){
                var _temp = [...this.$store.state.myMusic];
                var clice = _temp.slice(0,3)
                return clice;
            },
            play(){
                return this.$store.state.play;
            },
            playSong(){
                return this.$store.state.playSong;
            }
        },
        methods:{
            palylist(){
                this.$router.push('/playlist');
            },
            mymusic(){
                this.$router.push('/mymusic');
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
            }
            // 'playSong.id':{
            //     handler(curVal,oldVal){
            //          for(let i = 0;i<this.$store.state.myMusic.length;i++){
            //              if(curVal === this.$store.state.myMusic[i].id){
            //                  this.$store.state.myMusic[i].play = true;
            //              }
            //              else{
            //                  this.$store.state.myMusic[i].play = false;
            //              }
            //         }
            //     }
            // }
        },
        components: {
            'v-header':header,
            navigation
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .profile{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        .profile-wrapper{
            width:90%;
            height: 100%;
            margin:0 auto;
            .user-info{
                text-align:center;
                img{
                    width:45%;
                    margin:10px 0;
                    border:5px solid #fff;
                    border-radius:50%;
                }
                .msn{
                    margin:20px 0;
                    font-size:18px;
                    color:#193c6b;
                }
                .check{
                    width:80%;
                    height:50px;
                    margin:0 auto;
                    border-radius:30px;
                    font-size:20px;
                    color:#fff;
                    background:#ff3334;
                    outline:none;
                }
            }
            .soogs{
                margin-top:20px;
                height: 36%;
                padding-bottom: 50px;
                .title{
                    color:#0f2443;
                    font-size:20px;
                    text-align:center;
                    text-transform:uppercase;
                    padding-bottom:20px;
                    border-bottom:1px solid #12203e;
                }
                .txt-loading{
                    color: #ff4660;
                    font-size: 20px;
                    text-align: center;
                    margin-top: 50px;
                }
                .list{
                    li{
                        display:flex;
                        border-bottom:1px solid #12203e;
                        color:#ff3334;
                        align-items:center;
                        padding:12px 0;
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
                            overflow: hidden;
                            text-overflow: ellipsis;
                            word-break: normal;
                            .song-name{
                            color:#2a5ea4;
                            width:100%;
                            height:18px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            word-break: normal;
                            }
                            .singer{
                                color:#ffffff;
                                width:100%;
                                height:18px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                word-break: normal;
                            }
                        }
                        .icon{
                            flex:0 0 20px;
                            font-size:24px;
                        }
                    }
                }
            }
            .more{
                // position: fixed;
                // width: 100%;
                // bottom: 20px;
                // margin-top:20px;
                margin-top: -40px;
                height: 40px;
                text-align:center;
                input{
                    width:60%;
                    height:40px;
                    border:2px solid #183b69;
                    border-radius: 20px;
                    background:transparent;
                    color:#fff;
                    outline:none;
                }
            }
        }
    }
</style>
