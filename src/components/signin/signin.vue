<template>
<div class="signin">
    <div class="logo-bg">
        <img src="./Coeluso.png" alt="coeluso">
    </div>
    <div class="sign">
        <div class="input input-text">
            <p>username</p>
            <input type="text" v-model="username">
        </div>
        <div class="input input-text">
            <p>password</p>
            <input type="password" v-model="password">
        </div>
        <div class="input input-btn">
            <input type="button" value="Sign In" @click="signin">
        </div>
        <div class="forgot">
        <div class="line"></div>
            <a href="#">forgot password</a>
        <div class="line"></div>
        </div>
    </div>
    
</div>
</template>
<script>
    export default{
        data(){
            return {
                username:'',
                password:''
            }
        },
        methods:{
            signin(){
                var userInfo = {
                    username:this.username,
                    password:this.password
                }
                this.$store.dispatch('signIn',userInfo);
                var local = JSON.parse(window.localStorage.getItem(this.$store.state.userName));
                if(local){
                    console.log(local)
                    // var a = [];
                    for(let i = 0;i<local.length;i++){
                        local[i].play = false;
                        // a.push(local[i])
                    }
                    // console.log(a)
                    this.$store.state.myMusic = local
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .signin{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:url('signin-bg.png') no-repeat;
        background-size:cover;
        .logo-bg{
            width:100%;
            text-align:center;
            img{
                width:300px;
                height:300px;
            }
        }
        .sign{
            width:100%;
            .input{
                width:90%;
                margin:0 auto;
                text-align:left;
                input{
                    width:100%;
                    height:50px;
                    line-height:50px;
                    color:#fff;
                    border-radius:25px;
                    text-indent:20px;
                    font-size:20px;
                    outline:none;
                }
            }
            .input-text{
                margin-bottom:15px;
                p{
                    margin-left: 20px;
                    margin-bottom:10px;
                    font-size:16px;
                    text-transform:uppercase;
                    color:#17355e;
                }
                input{
                    background:rgba(0,109,255,.15);
                }
            }
            .input-btn{
                margin-top:40px;
               input{
                    background:#ff3334;
                } 
            }
            .forgot{
                width:90%;
                font-size:0;
                margin:0 auto;
                display:flex;
                align-items:center;
                .line{
                    position:relative;
                    flex:1;
                    width:100%;
                    height:1px;
                    display:inline-block;
                    background:#203364;
                }
                margin-top:50px;
                text-transform:uppercase;
                text-align:center;
                a{
                    position:relative;
                    
                    z-index:3;
                    padding:0 20px;
                    font-size:18px;
                    color:#183b69;
                    
                }
            }
        }
    }
</style>
