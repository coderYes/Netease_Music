import axios from 'axios'
export function request(config){
    const instance=axios.create({
      baseURL:'http://localhost:3000',
      timeout:5000
    })
    //请求拦截器
    instance.interceptors.request.use(config=>{
      return config
    },err=>{
      // console.log(err);
    })

    //响应拦截
    instance.interceptors.response.use(res=>{
      // console.log(res);
      return res.data
    },err=>{
      console.log(err);
    })
    //发送真正的网络请求
    return instance(config)
}