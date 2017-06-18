import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
Vue.use(Vuex)
const state = {
    loadName:'playlist734058968',
    firstLoading:true,
    loadProgress:0,
    playSong: {
        id: '',
        url: '',
        songName: 'loading...',
        singer: 'loading...',
        picUrl: '',
        currentListIndex:'',
        currentTime: '0.00',
        totalTime: '0.00'
    },
    myMusic:[],
    songPicLoad:false,
    play: false,
    percentage: '0%',
    changeSchedule: false,
    signin: false,
    userName: '',
    playList: [],
    playerSoogId: ''
}
export default new Vuex.Store({
    state,
    actions,
    mutations
})
