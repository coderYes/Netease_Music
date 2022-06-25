import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'
import VueLazyLoad from 'vue-lazyload'

Vue.use(ElementUI)
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/loading.png')
})

Vue.config.productionTip = false

// filter过滤 时:分
Vue.filter('dataFormat',function(time){
  let m=parseInt(time/1000/60)
  if(m<10) m='0'+m
  let s=parseInt(time/1000%60)
  if(s<10) s='0'+s
  return m+':'+s
})
// filter过滤 年-月-日
Vue.filter('timeConversion',function(time){
  const dt=new Date(time)
  const y=dt.getFullYear()
  const m=(dt.getMonth()+1+'').padStart(2,'0')
  const d=(dt.getDay()+'').padStart(2,'0')
  return `${y}-${m}-${d}`
})
// filter过滤 年-月-日 时:分:秒
Vue.filter('dataFormat1',function(time){
  const dt=new Date(time)
  const y=dt.getFullYear()
  const m=(dt.getMonth()+1+'').padStart(2,'0')
  const d=(dt.getDay()+'').padStart(2,'0')
  const hh=(dt.getHours()+'').padStart(2,'0')
  const mm=(dt.getMinutes()+'').padStart(2,'0')
  const ss=(dt.getSeconds()+'').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
