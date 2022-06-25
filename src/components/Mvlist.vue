<template>
  <div>
    <div class="mv">
      <div class="mvs" v-for="(item, index) in mvlists" :key="index">
        <div>
          <span class="iconfont icon-bofang">{{ item.playCount }}</span>
          <img @click="goMvPlay(item.id)" v-lazy="item.cover ||item.picUrl" alt="" />
        </div>
        <div class="mvinfo">
          <div class="mvName">{{ item.name }}</div>
          <div class="mvSinger">{{ item.artists[0].name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewMv, getRmdMv } from "@/api/utils";
export default {
  name: "Mvlist",
  watch: {
    // 监听选中分类
    newArr() {
      return this.getNewMv();
    },
    // 监听页数
    page() {
      return this.getNewMv();
    },
  },
  computed: {
    // 选中分类
    newArr() {
      return JSON.stringify(this.active);
    },
  },
  props: {
    active: {
      type: Array,
    },
    page: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  created() {
    this.getNewMv();
  },
  data() {
    return {
      // mv列表
      mvlists: [],
    };
  },
  methods: {
    // 获取mv
    getNewMv() {
      if (this.type === "2") {
        getNewMv(this.active, this.page).then((res) => {
          // console.log(res);
          if (res.code != 200) return;
          this.mvlists = res.data;
          if (res.count != 0) {
            this.total = res.count;
          }
          this.$emit("mvpage", res.count);
        });
      } else if (this.type === "1") {
        getRmdMv().then((res) => {
          // console.log(res);
          if (res.code != 200) return;
          this.mvlists = res.result;
        });
      }
      setTimeout(() => {
        this.mvlists.forEach((item) => {
          if (item.playCount > 100000) {
            item.playCount = parseInt(item.playCount / 10000) + "万";
          }
        });
      }, 100);
    },
    //跳转
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