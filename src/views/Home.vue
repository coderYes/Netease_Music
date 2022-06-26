<template>
  <div class="container">
    <el-container class="content" v-show="!showl">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="@/assets/img/musiclogo.png" alt="" />
          <span>Netease</span>
          <div>
            <span class="el-icon-arrow-left"></span>
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
        <!-- 搜索 -->
        <div class="search">
          <el-input
            @keyup.native.enter="search"
            v-model="searchs"
            placeholder="音乐/视频"
          >
            <el-button
              slot="prepend"
              size="mini"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </div>
      </el-header>

      <el-container>
        <!-- 左侧区域 -->
        <el-aside width="200px">
          <el-menu
            :default-active="path"
            background-color="#EDEDED"
            text-color="#939393"
            active-text-color="#DD6D60"
            :router="true"
          >
            <el-menu-item index="/discovery">
              <i class="iconfont icon-yinle1"></i>
              <span slot="title">发现音乐</span>
            </el-menu-item>
            <el-menu-item index="/playlists">
              <i class="iconfont icon-danlieliebiao"></i>
              <span slot="title">推荐歌单</span>
            </el-menu-item>
            <el-menu-item index="/songs">
              <i class="iconfont icon-yinle"></i>
              <span slot="title">最新音乐</span>
            </el-menu-item>
            <el-menu-item index="/mvs">
              <i class="iconfont icon-24gf-playSquare"></i>
              <span slot="title">最新MV</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 右侧区域 -->
        <el-main class="el-right">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- 歌词面板 -->
    <el-drawer
      :visible.sync="showl"
      direction="btt"
      size="90%"
      :show-close="false"
      :withHeader="false"
    >
      <!-- 动态背景 -->
      <div
        class="beijing"
        :style="{ backgroundImage: 'url(' + songX.url + ')' }"
      ></div>
      <!-- 歌词面板 -->
      <div class="showlyc">
        <!-- 左侧区域 -->
        <div class="left">
          <img
            :src="songX.url"
            :class="{ stopimgmove: !playState }"
            alt=""
          />
        </div>
        <!-- 右侧区域 -->
        <div class="right">
          <div class="title">
            <div class="title_sname">{{ songX.sname }}</div>
            <div class="title_name">{{ songX.name }}</div>
          </div>
          <!-- 歌词滚动 -->
          <div class="wrapper" ref="scrolls">
            <div class="contents">
              <div
                :class="['items', { item_actice: lycindex == index }]"
                v-for="(item, index) in lycs"
                :key="index"
              >
                {{ item[1] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>

    <!-- 播放 -->
    <div class="player">
      <!-- 歌曲图片 -->
      <div class="bg">
        <div v-if="this.songX.url" @click="showlyc">
          <span class="iconfont icon-xiangshang2 top"></span>
          <img :src="this.songX.url" alt="" />
        </div>
      </div>
      <!-- audio -->
      <audio
        id="music"
        ref="audio"
        @play="play"
        @pause="pause"
        @timeupdate="timeupdate"
        @ended="ended"
        :src="idd"
        controls
        autoplay
      ></audio>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getlyc } from "@/api/utils";
export default {
  name: "home",
  data() {
    return {
      // 搜索文本
      searchs: "",
      // 歌词面板显示
      showl: false,
      // 播放状态
      playState: "",
      // better-scroll
      scroll: null,
      // 当前歌词定位
      lycindex: 0,
    };
  },
  watch: {
    // 播放歌曲监听
    idd() {
      return this.getlyc();
    },
  },
  computed: {
    // 当前路由路径
    path() {
      return this.$route.path;
    },
    // 歌词面板信息
    songX() {
      return this.$store.state.songX;
    },
    // 播放url
    idd() {
      return this.$store.state.id;
    },
    //歌词
    lycs(){
      return this.$store.state.lyc
    }
  },
  methods: {
    // 搜索
    search() {
      if (!this.searchs) return this.$message.warning("请输入内容");
      this.$store.state.searchtext = this.searchs;
      this.$router.push("/search").catch((err) => {
        err;
      });
    },
    //当前播放时长
    timeupdate(e) {
      let currentTime = e.target.currentTime;
      let lyc = this.lycs;
      for (let i = 0; i < lyc.length; i++) {
        if (lyc[i][0] < currentTime && currentTime < lyc[i + 1][0]) {
          this.lycindex = i;
          if (this.scroll) {
            this.$refs.scrolls.scrollTo(0, (this.lycindex - 6) * 40);
          }
        }
      }
    },
    //歌词显示
    showlyc() {
      this.showl = !this.showl;
      setTimeout(() => {
        this.scroll = new BScroll(document.querySelector(".wrapper"));
        // console.log(this.scroll);
      }, 100);
    },
    //歌词
    getlyc() {
      getlyc(this.songX.id).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        let lycc = res.lrc.lyric; //获取歌词列表
        let lyclist = lycc.split("\n"); //以换行来分割
        let re = /\[\d{2}:\d{2}\.\d{2,3}\]/; //匹配时间
        let lyc=[]
        for (let i in lyclist) {
          if (lyclist[i]) {
            let date = lyclist[i].match(re); //匹配时间
            date = date[0].slice(1, -1); //去除【】
            let timelist = date.split(":"); //以:分割
            let m = timelist[0];
            let s = timelist[1];
            let time = parseFloat(m) * 60 + parseFloat(s); //计算时间
            let lrcitem = lyclist[i].replace(re, ""); //获取歌词
            lyc.push([time, lrcitem]);
            this.$store.state.lyc=lyc
          }
        }
        // console.log(this.lyc);
      });
    },
    //播放
    play() {
      this.playState = true;
    },
    //暂停
    pause() {
      this.playState = false;
    },
    //结束
    ended() {
      this.lycindex = 0;
      let audio=document.getElementById('music')
      audio.play()
      
    },
  },
};
</script>

<style lang="less" scoped>
.container,
.content {
  height: 100vh;
}
.el-header {
  background-color: #000;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    color: white;
    font-size: 25px;
    img {
      width: 45px;
      height: 45px;
    }
    > div {
      margin-left: 40px;
      > span {
        font-size: 2px;
        margin: 1px;
        border-radius: 50%;
        transition: all 0.5s ease;
      }
      > span:hover {
        background-color: #000000;
      }
    }
  }
}
.el-aside {
  width: 200px;
  background-color: #ededed;
  .el-menu {
    text-align: center;
    .el-menu-item {
      font-size: 20px;
      > i {
        margin-right: 15px;
        font-size: 19px;
      }
    }
  }
}
.player {
  display: flex;
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #f1f3f4;
  z-index: 999;
  .bg {
    background-color: #e4e4e4;
    width: 60px;
    height: 60px;
    position: relative;
    cursor: pointer;
    img {
      width: 60px;
      height: 60px;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      color: #fff;
      font-size: 35px;
      transition: all 1s ease;
    }
    span:hover {
      opacity: 1;
    }
  }
  audio {
    width: 100%;
    height: 100%;
  }
}
.el-right {
  margin: 0;
  padding: 0;
}
.beijing {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-position: top left;
  transform: scale(10);
  filter: blur(50px);
  z-index: 0;
}
.showlyc {
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
  .left {
    flex: 1;
    position: relative;
    img {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      position: absolute;
      top: 20%;
      right: 20%;
      border: 50px solid #333333;
      box-shadow: 5px 5px 30px black;
      animation: imgmove 20s infinite linear;
    }
    .stopimgmove {
      animation-play-state: paused;
    }
  }
  .right {
    flex: 1;
    z-index: 1;
    .title {
      text-align: center;
      margin-top: 10px;
      color: #fff;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      .title_sname {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 5px;
        letter-spacing: 3px;
      }
      .title_name {
        margin-bottom: 20px;
      }
    }
    .wrapper {
      width: 100%;
      height: 520px;
      text-align: center;
      overflow: hidden;
      cursor: default;
      user-select: none;
      font-size: 15px;
      .items {
        height: 40px;
        color: gray;
      }
      .item_actice {
        color: #fff;
        transition: all 0.5s ease;
        font-size: 18px;
      }
    }
  }
}
@keyframes imgmove {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>