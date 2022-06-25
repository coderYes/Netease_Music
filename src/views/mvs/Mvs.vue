<template>
  <div class="container">
    <!-- 地区 -->
    <div class="newSongs">
      <div class="newSongs_width">
        <div class="header">地区:</div>
        <div
          :class="['newSongs_item', { active_item: item === active[0].active1 }]"
          @click="chooseCategory1(item)"
          v-for="item in category1"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 类型 -->
    <div class="newSongs">
      <div class="newSongs_width">
        <div class="header">类型:</div>
        <div
          :class="['newSongs_item', { active_item: item === active[1].active2 }]"
          @click="chooseCategory2(item)"
          v-for="item in category2"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 排序 -->
    <div class="newSongs">
      <div class="newSongs_width">
        <div class="header">排序:</div>
        <div
          :class="['newSongs_item', { active_item: item === active[2].active3 }]"
          @click="chooseCategory3(item)"
          v-for="item in category3"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 最新mv -->
    <mvlist type="2" :active="active" :page="page" @mvpage="mvpage" />
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="10"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <div class="footer"></div>
  </div>
</template>

<script>
import Mvlist from "../../components/Mvlist.vue";
export default {
  name: "mvs",
  components: {
    Mvlist,
  },
  data() {
    return {
      // 选中
      active: [
        {
          active1: "全部",
        },
        {
          active2: "全部",
        },
        {
          active3: "上升最快",
        },
      ],
      category1: ["全部", "欧美", "华语", "日本", "韩国"],
      category2: ["全部", "官方版", "原生", "现场版", "网易出品"],
      category3: ["上升最快", "最热", "最新"],
      // 页数
      page: 0,
      // mv列表
      mvlists: [],
      // mv数量
      total: 0,
    };
  },
  methods: {
    // 选择地区
    chooseCategory1(item) {
      this.active[0].active1 = item;
      this.page = 1;
    },
    // 选择类型
    chooseCategory2(item) {
      this.active[1].active2 = item;
      this.page = 1;
    },
    // 选择排序
    chooseCategory3(item) {
      this.active[2].active3 = item;
      this.page = 1;
    },
    // 页码发生变化
    handleCurrentChange(val) {
      this.page = val;
    },
    //mv条数
    mvpage(total){
      this.total=total
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
.newSongs {
  width: 40%;
  padding-top: 10px;
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
    .header {
      font-size: 15px;
      margin-right: 20px;
    }
  }
}
</style>