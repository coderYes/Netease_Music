<template>
  <div class="container">
    <div class="title">
      {{ searchtext }}<span>找到{{ total }}个结果</span>
    </div>

    <!-- 标签 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲" name="1">
        <div class="searchlist">
          <el-table :data="songlist" style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="音乐标题" width="250">
              <template slot-scope="scope">
                <div @dblclick="playsong(scope.row.id, scope.row)">
                  {{ scope.row.name
                  }}<span
                    v-show="scope.row.mvid"
                    class="iconfont icon-bofang1 showicon"
                  ></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="歌手" width="260">
              <template slot-scope="scope">
                <div>
                  <span class="pointe">{{ scope.row.artists[0].name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="专辑">
              <template slot-scope="scope">
                <div>
                  <span class="pointe">{{ scope.row.album.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="时长" width="100">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.duration | dataFormat }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 歌单 -->
      <el-tab-pane label="歌单" name="1000">
        <div class="recommend">
          <div class="item">
            <div
              class="items"
              v-for="(item, index) in songsheetlist"
              :key="index"
            >
              <div class="header_title">
                <span class="iconfont icon-24gl-play"></span
                >{{ item.playCount }}
              </div>
              <img v-lazy="item.coverImgUrl" @click="goRemmend(item.id)" alt="" />
              <div class="header_name">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- MV -->
      <el-tab-pane label="MV" name="1004">
        <div class="mv">
          <div class="mvs" v-for="(item, index) in mvlist" :key="index">
            <div>
              <span class="iconfont icon-bofang">{{ item.playCount }}</span>
              <img v-lazy="item.cover" @click="goMvPlay(item.id)" alt="" />
            </div>
            <div class="mvinfo">
              <div class="mvName">{{ item.name }}</div>
              <div class="mvSinger">{{ item.artists[0].name }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="footer"></div>
  </div>
</template>

<script>
import { searchSong, getSongUrl, getsongInfo } from "@/api/utils";
export default {
  name: "search",
  data() {
    return {
      // 歌曲列表
      songlist: [],
      // 歌单列表
      songsheetlist: [],
      // mv列表
      mvlist: [],
      // 条数
      total: 0,
      // tabs
      activeName: "1",
      // 页数
      page: 1,
    };
  },
  computed: {
    // 搜索内容
    searchtext() {
      return this.$store.state.searchtext;
    },
  },
  watch: {
    // 监听搜索内容
    searchtext() {
      return this.searchSong();
    },
  },
  created() {
    this.searchSong();
  },
  methods: {
    // 搜索
    searchSong() {
      searchSong(this.searchtext, this.page, this.activeName).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        if (this.activeName === "1") {
          this.songlist = res.result.songs;
          this.total = res.result.songCount;
        } else if (this.activeName === "1000") {
          this.songsheetlist = res.result.playlists;
          this.total = res.result.playlistCount;
          this.songsheetlist.forEach((item) => {
            if (item.playCount > 100000) {
              item.playCount = parseInt(item.playCount / 10000) + "万";
            }
          });
        } else if (this.activeName === "1004") {
          this.mvlist = res.result.mvs;
          this.total = res.result.mvCount;
          this.mvlist.forEach((item) => {
            if (item.playCount > 100000) {
              item.playCount = parseInt(item.playCount / 10000) + "万";
            }
          });
        }
      });
    },
    // el-tabs
    handleClick(val) {
      this.activeName = val.name;
      this.page = 1;
      this.searchSong();
    },
    // 播放歌曲
    playsong(id, item) {
      // console.log(item);
      this.$store.state.songX.id = item.id;
      this.$store.state.songX.url = item.album.picUrl;
      this.$store.state.songX.sname = item.name;
      this.$store.state.songX.name = item.artists[0].name;
      getSongUrl(id).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        let url = res.data[0].url;
        this.$store.state.id = url;
      });
      getsongInfo(id).then((res) => {
        console.log(res);
        if (res.code != 200) return;
        this.$store.state.songX.url = res.songs[0].al.picUrl;
      });
    },
    //跳转
    goRemmend(songSheetid) {
      this.$router.push({
        path: "/playlist",
        query: {
          songSheetid,
        },
      });
    },
    // 跳转
    goMvPlay(mvid){
      this.$router.push({
        path:'/mvplay',
        query: {
          mvid
        },
      })
    }
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
  height: 60px;
}
.title {
  font-size: 35px;
  font-weight: bold;
  span {
    margin-left: 10px;
    color: gray;
    font-size: 16px;
  }
}
.centerSpan {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    font-size: 18px;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    width: 60px;
    height: 60px;
  }
}
.el-tabs {
  margin-top: 10px;
}
.searchlist {
  margin-top: 10px;
  user-select: none;
  .showicon {
    color: red;
    margin-left: 5px;
    font-size: 14px;
    cursor: default;
  }
  .pointe {
    cursor: pointer;
  }
}
.recommend {
  padding-top: 30px;
  .item {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .items {
      width: 200px;
      margin-bottom: 20px;
      position: relative;
      cursor: pointer;
      img {
        width: 200px;
        border-radius: 8px;
      }
      .header_name {
        font-size: 14px;
      }
      .header_title {
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        transform: translateY(30%);
        text-align: right;
        margin-right: 10px;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: #fff;
      }
    }
  }
}
.mv {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
  .mvs {
    position: relative;
    width: 22%;
    margin-right: 3%;
    img {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      cursor: pointer;
    }
    span {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #fff;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 13px;
    }
    .mvinfo {
      width: 100;
      .mvName {
        font-size: 15px;
      }
      .mvSinger {
        font-size: 12px;
        color: gray;
        margin-top: 10px;
      }
    }
  }
}
</style>