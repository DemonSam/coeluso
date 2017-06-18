import * as types from './mutation-types'
import axios from 'axios';
export default {
    signIn({ commit }, info) {
        commit(types.SIGN_IN, info)
    },
    init({ commit }, info) {
        commit(types.INIT, info)
    },
    inittalizeHistory({commit},info){
        commit(types.INITTALIZE_HISTORY,info)
    },
    play({ commit }, info) {
        commit(types.PLAY, info)
    },
    pause({ commit }, info) {
        commit(types.PAUSE, info)
    },
    playSongs({ commit ,state}, info) {
        var playlist = state.playList;
        if(state.playSong.id === info.id){
            return;
        }
        if(!state.playSong.id){
            playlist[info.index].play = true;
        }
        else{
            playlist[state.playSong.currentListIndex].play = false;
            playlist[info.index].play = true;
        }
        commit(types.PERCENTAGE, '0%')
        commit(types.PLAY, false)
        // 判断播放列表是否已有 url
        var haveUrl = playlist[info.index].url ? true : false;
        // 如果播放裂变项里有了url 就反对当前对象 ，如果没有发送请求获取url 返回一个 url
        var result = haveUrl ? playlist[info.index] : ajax(playlist[info.index].id);
        var song = {};
        if(haveUrl){
           song = {
                id: playlist[info.index].id,
                index:info.index,
                url: playlist[info.index].url,
                songName: playlist[info.index].name,
                singer: playlist[info.index].singer,
                picUrl: playlist[info.index].picUrl
            }
            commit(types.PLAY_SONGS, song)
        }
        else{
            result.then(url=>{
                song = {
                    id: playlist[info.index].id,
                    index:info.index,
                    url: url,
                    songName: playlist[info.index].name,
                    singer: playlist[info.index].singer,
                    picUrl: playlist[info.index].picUrl
                }
                playlist[info.index].url = url;
                commit(types.PLAY_SONGS, song)
            }) 
        }
        // 获取播放信息 获取成功 返回一个Promise对象
        function ajax(id){
            return new Promise((resolve,reject)=>{
                axios.get('https://api.imjad.cn/cloudmusic/?id='+id).then(res=>{
                    var url = JSON.parse(res.request.response).data[0].url;
                    resolve(url)
                })
            })
        }
        
    },
    percentage({ commit }, info){
        commit(types.PERCENTAGE, info)
    },
    totalTime({ commit }, info){
        commit(types.TOTAL_TIME,info)
    },
    currentTime({ commit }, info){
        commit(types.CURRENT_TIME,info)
    },
    changeSchedule({commit},info){
        commit(types.CHANGE_SCHEDULE,info)
    },
    previousSong({commit},info){
        commit(types.PREVIOUS_SONG,info)
    },
    nextSong({commit},info){
        commit(types.NEXT_SONG,info)
    },
    songPicLoad({commit},info){
        commit(types.SONG_PIC_LOAD,info)
    },
    collection({commit},id){
        commit(types.COLLECTION,id)
        
    },
    cancelCollection({commit},id){
        commit(types.CANCEL_COLLECTION,id)
    },
    updataLoadProgress({commit},progress){
        commit(types.UPDATA_LOAD_PROGRESS,progress)
    }
    
}
