import * as types from './mutation-types'
export default {
    [types.SIGN_IN](state, info) {
        if (info.username === 'music' && info.password === '123456') {
            state.signin = true;
            state.userName = info.username;
        } else {
            console.log('User name or password error, please re-enter!')
        }
    },
    [types.INIT](state, info) {
        for(let i = 0;i<info.length;i++){
            var songInfo = {
                id: info[i].id,
                index:i,
                name: info[i].al.name,
                picUrl: info[i].al.picUrl,
                singers: [],
                singer: '',
                totalTime:'0.00',
                url:'',
                play:false
            }
            var arr_singers = []
            info[i].ar.forEach(function(singer) {
                var singerInfo = {
                    id: singer.id,
                    name: singer.name
                }
                arr_singers.push(singer.name)
                songInfo.singers.push(singerInfo)
            })
            songInfo.singer = arr_singers.join(' / ')
            state.playList.push(songInfo)
        }
    },
    [types.INITTALIZE_HISTORY](state,info){
        for(var i in info ){
            state[i] = info[i];
        }
        console.log(state)
    },
    [types.PLAY](state, info) {
        state.play = info
    },
    [types.PAUSE](state, info) {
        state.play = info;
    },
    [types.PERCENTAGE](state, info){
        state.percentage = info;
    },
    [types.TOTAL_TIME](state, info){
        state.playSong.totalTime = info;
    },
    [types.CURRENT_TIME](state, info){
        state.playSong.currentTime = info;
    },
    [types.PLAY_SONGS](state, info) {
        state.playSong.id = info.id;
        state.playSong.url = info.url;
        state.playSong.songName = info.songName;
        state.playSong.singer = info.singer;
        state.playSong.picUrl = info.picUrl;
        state.playSong.currentListIndex = info.index;
    },
    [types.CHANGE_SCHEDULE](state, info){
        state.changeSchedule = info;
    },
    [types.PREVIOUS_SONG](state, info){
        
    },
    [types.NEXT_SONG](state, info){
        
    },
    // 是否加载歌曲图片
    [types.SONG_PIC_LOAD](state,info){
        state.songPicLoad = info;
    },
    // 收藏
    [types.COLLECTION](state,id){
        for(let i = 0;i< state.playList.length;i++){
            if(id === state.playList[i].id){
                state.myMusic.push(state.playList[i]);
                break;
            }
        }
    },
    // 取消收藏
    [types.CANCEL_COLLECTION](state,id){
        for(let i = 0;i< state.myMusic.length;i++){
            if(id === state.myMusic[i].id){
                state.myMusic.splice(i,1);
                break;
            }
        }
    },
    // 更新加载进度
    [types.UPDATA_LOAD_PROGRESS](state,progress){
        state.loadProgress = progress;
    }
}
