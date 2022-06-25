<template>
  <div class="container">
    <!-- 最新音乐 -->
    <div class="newSongs">
      <div class="newSongs_width">
        <div
          :class="['newSongs_item', { active_item: item === active }]"
          @click="chooseCategory(item)"
          v-for="item in category"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <songtable :activeType="activeType" />

    <div class="footer"></div>
  </div>
</template>

<script>
// import { getNewSong,getSongUrl } from "@/api/utils";
import Songtable from '@/components/Songtable.vue'
export default {
  name: "songs",
  data() {
    return {
      // 分类
      category: ["全部", "欧美", "华语", "日本", "韩国"],
      // 选中标签
      active: "全部",
      // 选中类型
      activeType: 0,
    };
  },
  components: {
    Songtable
  },
  methods: {
    //分类选择
    chooseCategory(item) {
      this.active = item;
      if (this.active == "全部") this.activeType = 0;
      if (this.active == "欧美") this.activeType = 96;
      if (this.active == "华语") this.activeType = 7;
      if (this.active == "日本") this.activeType = 8;
      if (this.active == "韩国") this.activeType = 16;
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
  height: 60px;
}
.newSongs {
  width: 25%;
  padding-top: 40px;
  .newSongs_width {
    width: 100%;
    display: flex;
    .newSongs_item {
      flex: 1;
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-size: 13px;
      color: gray;
      cursor: default;
    }
    .newSongs_item:hover {
      color: #000;
    }
    .active_item {
      background-color: #fdf5f5;
      color: #ec4141 !important;
      border-radius: 20px;
      transition: all 1s ease;
    }
  }
}
</style>