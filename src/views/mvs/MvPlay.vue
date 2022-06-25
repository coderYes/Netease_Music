<template>
  <div class="container">
    <div class="body_left">
      <!-- mv详情 -->
      <div>
        <div class="title">mv详情</div>
        <div class="video">
          <video autoplay controls :src="url"></video>
        </div>
        <div class="mvinfo">
          <img :src="mvinfo.cover" alt="" />
          <span>{{ mvinfo.artistName }}</span>
        </div>
        <div class="mv_title">
          <span>{{ mvinfo.name }}</span>
        </div>
        <div class="mv_dt">
          <span>发布:{{ " " + mvinfo.publishTime }}</span>
          <span>播放:{{ " " + mvinfo.playCount }}次</span>
        </div>
        <div class="mv_dc">
          <span>{{ mvinfo.desc }}</span>
        </div>
      </div>
      <!-- mv评论 -->
      <remment
        :hotcomment="hotcomment"
        :newcomment="newcomment"
        :hotTotal="hotTotal"
        :newtotal="newtotal"
      />
      <div class="footer"></div>
    </div>
    <!-- 右侧相似mv -->
    <div class="body_right">
      <div class="smv" v-for="(item, index) in similarMv" :key="index">
        <div class="smv_img">
          <span class="iconfont icon-bofang playcount">{{
            item.playCount
          }}</span>
          <span class="iconfont icon-bofang mv_time">{{
            item.duration | dataFormat
          }}</span>
          <img @click="uodateMv(item.id)" :src="item.cover" alt="" />
        </div>
        <div class="mvinfo">
          <div class="mvinfobox">
            <div class="name">{{ item.name }}</div>
            <div class="author">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getmvUrl, getmvInfo, getmvRemment, getmvSimilar } from "@/api/utils";
import Remment from "../../components/Remment.vue";
export default {
  name: "MvPlay",
  components: {
    Remment,
  },
  data() {
    return {
      // mv播放地址
      url: "",
      //mvID
      mvid:'',
      //mv信息
      mvinfo: {},
      //热评
      hotcomment: [],
      //最新评论
      newcomment: [],
      //相似mv列表
      similarMv: [],
      //热评数量
      hotTotal: 0,
      //新评数量
      newtotal: 0,
    };
  },
  created() {
    this.getmvUrl();
  },
  computed: {
    id() {
      return this.$route.query.mvid;
    },
  },
  watch:{
    //监听mvID变化
    id(){
      return this.getmvUrl()
    }
  },
  methods: {
    // 获取mv信息
    getmvUrl() {
      //获取mv地址
      getmvUrl(this.id).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        this.url = res.data.url;
      });
      //获取mv信息
      getmvInfo(this.id).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        this.mvinfo = res.data;
      });
      //获取mv评论
      getmvRemment(this.id).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        this.hotcomment = res.hotComments;
        this.newcomment = res.comments;
        this.hotTotal = res.hotComments.length;
        this.newtotal = res.total;
      });
      //获取相似mv
      getmvSimilar(this.id).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        this.similarMv = res.mvs;
        this.similarMv.forEach(item=>{
          if(item.playCount>100000){
            item.playCount= parseInt(item.playCount/10000) +'万'
          }
        })
      });
    },
    //刷新
    uodateMv(mvid) {
      this.$router.push({
        path: "/mvplay",
        query: {
          mvid,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;
  display: flex;
}
.footer{
  height: 60px;
}
.body_left {
  width: 70%;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .video video {
    width: 100%;
    height: auto;
  }
  .mvinfo {
    display: flex;
    align-items: center;
    margin-top: 15px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .mv_title {
    font-weight: bold;
    font-size: 22px;
    margin-top: 15px;
  }
  .mv_dt {
    padding-top: 15px;
    font-size: 12px;
    color: gray;
    span {
      margin-right: 10px;
    }
  }
  .mv_dc {
    font-size: 12px;
    padding-top: 5px;
  }
}
.body_right {
  flex: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  .smv {
    display: flex;
    margin-bottom: 10px;
    .smv_img {
      flex: 2;
      height: 150px;
      position: relative;
      img {
        width: 90%;
        height: 90%;
        border-radius: 5px;
        margin: 5% 5%;
        cursor: pointer;
      }
      span {
        color: #fff;
        font-size: 12px;
      }
      .playcount {
        position: absolute;
        top: 7%;
        right: 7%;
      }
      .mv_time {
        position: absolute;
        bottom: 7%;
        right: 7%;
      }
    }
    .mvinfo {
      flex: 1;
      .mvinfobox {
        height: 90%;
        margin-top: 10%;
        font-size: 13px;
        .author {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>