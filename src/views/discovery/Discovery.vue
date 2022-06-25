<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img class="img" :src="item.pic" alt="" />
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div>
      <h3>推荐歌单</h3>
      <song-sheetlist type="1" />
    </div>

    <!-- 最新音乐 -->
    <div>
      <h3>最新音乐</h3>
      <div class="singles">
        <div class="single" v-for="(item, index) in newMusiclist" :key="index">
          <div class="singleImg">
            <img v-lazy="item.picUrl" alt="" />
            <span
              class="iconfont icon-bofang show"
              @click="playSong(item.id,item)"
            ></span>
          </div>
          <div class="info">
            <div>{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐mv -->
    <div>
      <h3>推荐MV</h3>
      <mvlist type="1"/>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
import SongSheetlist from '@/components/SongSheetlist'
import Mvlist from '../../components/Mvlist.vue';
import {
  getBanner,
  getNewMusic,
  getSongUrl,
} from "@/api/utils";

export default {
  name: "discovery",
  components: {
    SongSheetlist,
    Mvlist
  },
  data() {
    return {
      // 轮播图
      banners: [],
      // 最新音乐
      newMusiclist: [],
      // 推荐mv
      mvList:[]
    };
  },
  created() {
    this.getBanner();
    this.getNewMusic();
  },
  methods: {
    // 轮播图
    getBanner() {
      getBanner().then((res) => {
        // console.log(res);
        if (res.code != 200) return 
        this.banners = res.banners;
      });
    },
    //最新音乐
    getNewMusic() {
      getNewMusic().then((res) => {
        // console.log(res);
        if (res.code != 200) return 
        this.newMusiclist = res.result;
      });
    },
    // 播放url
    playSong(id,item) {
      this.$store.state.songX.id=item.id
      this.$store.state.songX.url=item.picUrl
      this.$store.state.songX.sname=item.name
      this.$store.state.songX.name=item.song.artists[0].name
      // console.log(this.$store.state.songX);
      getSongUrl(id).then((res) => {
        // console.log(res);
        if (res.code != 200) return 
        let url=res.data[0].url
        this.$store.state.id=url
      });
    },

  },
};
</script>

<style lang="less" scoped>
.container {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
.footer {
  width: 100%;
  height: 60px;
}
.img {
  display: inline-block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
.singles {
  display: flex;
  flex-wrap: wrap;
  .single {
    width: 50%;
    height: 80px;
    display: flex;
    margin-top: 20px;
    position: relative;
    transition: all 0.5s ease;
    .singleImg {
      width: 80px;
      height: 80px;
      cursor: pointer;
      text-align: center;
      img {
        width: 80px;
        height: 80px;
      }
      span {
        position: absolute;
        top: 0;
        left: 0;
        margin-left: 32px;
        margin-top: 30px;
        font-size: 25px;
        color: #fff;
        opacity: 0;
        transition: all 0.5s ease;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-left: 20px;
      .singer {
        font-size: 12px;
        color: gray;
      }
    }
  }
  .single:hover {
    background-color: #ededed;
  }
  .single:hover .show {
    opacity: 1;
  }
}
</style>