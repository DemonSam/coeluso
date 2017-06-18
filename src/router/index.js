import Vue from 'vue'
import Router from 'vue-router'
import signin from 'components/signin/signin';
import menu from 'components/menu/menu';
import profile from 'components/profile/profile';
import playlist from 'components/playlist/playlist';
import player from 'components/player/player';
import mymusic from 'components/mymusic/mymusic';
import search from 'components/search/search';
Vue.use(Router)
export default new Router({
    mode:'history',
    routes: [{
        path: '/',
        name: 'signin',
        // component: signin
        component:resolve => require(['components/signin/signin'], resolve)
    }, {
        path: '/profile',
        name: 'profile',
        // component: profile
        component:resolve => require(['components/profile/profile'], resolve)        
    }, {
        path: '/playlist',
        name: 'playlist',
        // component: playlist
        component:resolve => require(['components/playlist/playlist'], resolve)   
    }, {
        path: '/player',
        name: 'player',
        // component: player
        component:resolve => require(['components/player/player'], resolve)   
    }, {
        path: '/mymusic',
        name: 'mymusic',
        // component: mymusic
        component:resolve => require(['components/mymusic/mymusic'], resolve)   
    }, {
        path: '/search',
        name: 'search',
        // component: search
        component:resolve => require(['components/search/search'], resolve)   
    }]
})
