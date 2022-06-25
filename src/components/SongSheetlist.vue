<template>
  <div>
    <div class="recommend">
      <div class="item">
        <div class="items" v-for="(item, index) in playlists" :key="index">
          <div class="header_title">
            <span class="iconfont icon-24gl-play"></span>{{item.playCount }}
          </div>
          <img v-lazy="item.coverImgUrl || item.picUrl" alt="" @click="go(item.id)" />
          <div class="header_name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getplayList, getRemmendList } from "@/api/utils";
export default {
  name: "SongSheetlist",
  props: {
    active: {
      type: String,
    },
    page: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  watch: {
    active() {
      return this.getplayList();
    },
    page() {
      return this.getplayList();
    },
  },
  data() {
    return {
      playlists: [],
      total: 0,
    };
  },
  created() {
    this.getplayList();
  },
  methods: {
    getplayList() {
      if (this.type === "2") {
        getplayList(this.active, this.page).then((res) => {
          // console.log(res);
          if (res.code != 200) return;
          this.playlists = res.playlists;
          this.total = res.total;
          this.$emit("SongsheetTotal", this.total);
        });
      } else if (this.type === "1") {
        getRemmendList().then((res) => {
          // console.log(res);
          if (res.code != 200) return;
          this.playlists = res.result;
        });
      }
      setTimeout(() => {
        this.playlists.forEach((item) => {
          if (item.playCount > 100000) {
            item.playCount = ' '+(item.playCount / 10000) + "万";
          }
        });
      }, 100);
    },
    go(songSheetid) {
      // console.log(songSheetid); 
      this.$router.push({
        path: "/playlist",
        query: {
          songSheetid,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
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
        text-align: right;
        margin: 5px 10px 0 0;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: #fff;
      }
    }
  }
}
</style>