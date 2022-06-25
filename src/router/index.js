import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import('@/views/Home.vue')
const Discovery=()=>import('@/views/discovery/Discovery.vue')
const Mvs=()=>import('@/views/mvs/Mvs.vue')
const MvPlay=()=>import('@/views/mvs/MvPlay.vue')
const Playlists=()=>import('@/views/playlists/Playlists.vue')
const Songs=()=>import('@/views/songs/Songs.vue')
const Search=()=>import('@/views/search/Search.vue')
const Playlist=()=>import('@/views/playlist/Playlist.vue')



Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/discovery'
  },
  {
    path:'/home',
    component:Home,
    children:[
      {
        path:'/discovery',
        component:Discovery
      },
      {
        path:'/mvs',
        component:Mvs
      },
      {
        path:'/playlists',
        component:Playlists
      },
      {
        path:'/songs',
        component:Songs
      },
      {
        path:'/search',
        component:Search
      },
      {
        path:'/playlist',
        component:Playlist
      },
      {
        path:'/mvplay',
        component:MvPlay
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
