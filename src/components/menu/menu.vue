<template>
    <div class="menu">
        <div class="menu-bg"></div>
        <div class="menu-container">
            <div class="menu-container-wrapper">
                <div class="user">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495343089864&di=f2979d5c582cd4765f43ac8ec62d58da&imgtype=0&src=http%3A%2F%2Fimg1.touxiang.cn%2Fuploads%2F20131121%2F21-074925_595.jpg" alt="avtar" class="photo">
                    <span class="name" v-text='username'></span>
                </div>
                <div class="menu-categories">
                    <ul>
                        <li class="activity">
                            <i class="icon-activity"></i><span>Activity</span>
                        </li>
                        <li class="browse">
                            <i class="icon-repo-forked"></i><span>Browse</span>
                        </li>
                        <li class="radio">
                            <i class="icon-volume-medium"></i><span>Radio</span>
                        </li>
                        <li class="music">
                            <i class="icon-headphones"></i><span>Your Music</span>
                        </li>
                        <li class="settings">
                            <i class="icon-settings"></i><span>Settings</span>
                        </li>

                    </ul>
                    <div class="out" @click="canshow">
                        <i class="icon-arrow_forward"></i>
                    </div>
                </div>
                <div class="sign-out">
                    <i class="icon-signout"></i><span>Sign out</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods: {
          canshow(){
               this.$emit('canshow')
          }
        },
        computed: {
            username(){
                return this.$store.state.userName;
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .menu{
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        width:100%;
        height:100%;
        overflow:hidden;
        z-index:110;
        .menu-bg{
            width:100%;
            height:100%;
            background:url('./menu-bg.png') no-repeat;
            background-size:cover;
            opacity: 0.98;
        }
        .menu-container{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:102;
            .menu-container-wrapper{
                display:flex;
                flex-direction:column;
                width:82%;
                height:100%;
                margin:0 auto;
                .user{
                    display:flex;
                    align-items:center;
                    margin-top: 20px;
                    font-size:0;
                    .photo{
                        width:10%;
                        margin-right:10px;
                        border:2px solid #fff;
                        border-radius:25px;
                    }
                    .name{
                        line-height: 10%;
                        font-size:18px;
                        color:#fff;
                        text-transform:Capitalize;
                    }
                }
                .menu-categories{
                    flex:1;
                    display:flex;
                    align-items:center;
                    font-size:18px;
                    ul{
                        flex:1;
                        li{
                            margin-bottom:50px;
                            color:#fff;
                            i{
                                margin-right:30px;
                            }
                        }
                    }
                    .out{
                        flex: 0 05 50px;
                        font-size: 35px;
                        flex: 0 0 50px;
                        text-align: center;
                        color: rgba(255,255,255,0.5);
                    }
                }
                .sign-out{
                    flex:0 0 60px;
                    display:flex;
                    align-items:center;
                    font-size:16px;
                    color:#fff;
                     i{
                         color:#ffb9b9;
                        margin-right:30px;
                    }
                }
            }
            
        }
    }
</style>
