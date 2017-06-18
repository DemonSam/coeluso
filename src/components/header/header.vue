<template>
    <div class="header">
        <div class="header-wrapper">
            <div class="menu-btn" @click="showMenu=true">
                <i class="icon-menu"></i>
            </div>
            <h2 class="title" :class="size">{{title}}</h2>
            <div class="search" @click="search">
                <i class="icon-search"></i>
            </div>
        </div>
        <slot></slot>
        
            <div class="menu-wrapper" >
                <transition name="left">
                     <v-menu v-show="showMenu" @canshow="showMe"></v-menu>
                </transition>
            </div>
        
    </div>
</template>
<script>
    import menu from 'components/menu/menu'
    
    export default {
        props: {
            title: {
                type: String
            },
            fontSize: {
                type: Number,
                default: 18
            }
        },
        data() {
            return {
                showMenu: false
            }
        },
        computed: {
            size() {
                return 'size' + this.fontSize;
            }
        },
        methods: {
          showMe(){
              console.log(1)
              this.showMenu = !this.showMenu;
          },
          search(){
              this.$router.push('/search')
          }
        },
        components: {
            'v-menu': menu
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .header {
        width: 100%;
        .header-wrapper {
            display: flex;
            width: 100%;
            height: 50px;
            align-items: center;
            .title {
                flex: 1;
                padding: 0 20px;
                line-height: 30px;
                text-align: center;
                color: #ffffff;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-transform:Capitalize;
                &.size18 {
                    font-size: 18px;
                }
                &.size20 {
                    font-size: 20px;
                }
            }
            .menu-btn {
                flex: 0 0 27px;
                font-size: 28px;
                color: #2a5ea4;
            }
            .search {
                display: flex;
                align-items: center;
                flex: 0 0 27px;
                font-size: 28px;
                color: #2a5ea4;
            }
        }
        .menu-wrapper{
            .left-enter-active, .left-leave-active{
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            }
            .left-enter,.left-leave-active{
                transform: translate3d(-100%,0,0)
            }
        }
        
    }
</style>
