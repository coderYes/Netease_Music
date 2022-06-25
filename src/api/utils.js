import { request } from "./request";

//获取轮播图
export function getBanner(){
  return request({
    url:'/banner',
    params:{
      type:2
    }
  })
}

//获取推荐歌单
export function getRemmendList(){
  return request({
    url:'/personalized',
    params:{
      limit:10
    }
  })
}

//最新音乐
export function getNewMusic(){
  return request({
    url:'/personalized/newsong',
  })
}

//获取音乐url
export function getSongUrl(id){
  return request({
    url:'/song/url',
    params:{
      id
    }
  })
}

//推荐mv
export function getRmdMv(){
  return request({
    url:'/personalized/mv',
  })
}

//获取精品歌单
export function getBoutiqueList(){
  return request({
    url:'/top/playlist/highquality',
    params:{
      limit:1,
      cat:'全部'
    }
  })
}

//获取推荐歌单
export function getplayList(cat,page){
  return request({
    url:'/top/playlist',
    params:{
      limit:10,
      offset:(page-1)*10,
      cat
    }
  })
}

//新歌速递
export function getNewSong(type){
  return request({
    url:'/top/song',
    params:{
      type
    }
  })
}

//最新mv
export function getNewMv(active,page){
  return request({
    url:'/mv/all',
    params:{
      area:active[0].active1,
      type:active[1].active2,
      order:active[2].active3,
      limit:10,
      offset:(page-1)*10
    }
  })
}

//搜索
export function searchSong(keywords,page,type){
  return request({
    url:'/search',
    params:{
      keywords,
      offset:(page-1)*30,
      type
    }
  })
}

//获取歌单信息
export function getSonglistDetail(id){
  return request({
    url:'/playlist/detail',
    params:{
      id
    }
  })
}

//热门评论
export function getHotcomments(id){
  return request({
    url:'/comment/hot',
    params:{
      id,
      type:2
    }
  })
}

//最新评论
export function getNewcomments(id,page){
  return request({
    url:'/comment/playlist',
    params:{
      id,
      limit:20,
      offset:(page-1)*20
    }
  })
}

//mv地址
export function getmvUrl(id){
  return request({
    url:'/mv/url',
    params:{
      id
    }
  })
}

//mv信息
export function getmvInfo(mvid){
  return request({
    url:'/mv/detail',
    params:{
      mvid
    }
  })
}

//mv评论
export function getmvRemment(id){
  return request({
    url:'/comment/mv',
    params:{
      id
    }
  })
}

//相似mv
export function getmvSimilar(mvid){
  return request({
    url:'/simi/mv',
    params:{
      mvid
    }
  })
}

//相似mv
export function getlyc(id){
  return request({
    url:'/lyric',
    params:{
      id
    }
  })
}

//获取歌词信息
export function getsongInfo(ids){
  return request({
    url:'/song/detail',
    params:{
      ids
    }
  })
}

