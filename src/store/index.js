import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id:'',
    searchtext:'',
    songX:{
      id:'',
      url:'',
      sname:'',
      name:''
    },
    lyc:[]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
