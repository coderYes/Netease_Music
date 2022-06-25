<template>
  <div class="container">
    <!-- 精品歌单 -->
    <div
      class="bgc"
      :style="{ backgroundImage: 'url(' + boutiqueList.coverImgUrl + ')' }"
    ></div>
    <div class="boutique">
      <div class="boutiqueImg">
        <img :src="boutiqueList.coverImgUrl" alt="" />
      </div>
      <div class="boutique_info">
        <div class="boutique_title" @click="goboutique(boutiqueList.id)">精品歌单</div>
        <div class="boutique_name">{{ boutiqueList.name }}</div>
        <div class="boutique_desc">{{ boutiqueList.description }}</div>
      </div>
    </div>

    <!-- 推荐歌单 -->
    <div class="category">
      <div class="category_width">
        <div
          :class="['category_item', { active_item: item === active }]"
          @click="chooseCategory(item)"
          v-for="item in category"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
      <song-sheetlist type="2" :active="active" :page="page" @SongsheetTotal="SongsheetTotal" />
    </div>

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
import SongSheetlist from '@/components/SongSheetlist.vue'
import { getBoutiqueList, } from "@/api/utils";
export default {
  name: "playlists",
  components: {
    SongSheetlist
  },
  data() {
    return {
      // 精品歌单列表
      boutiqueList: [],
      // 分类
      category: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行",
      ],
      // 选中分类
      active: "全部",
      // 页数
      page:1,
      // 选中分类歌单条数
      total:0
    };
  },
  created() {
    this.getBoutiqueList();
  },
  methods: {
    //精品歌单
    getBoutiqueList() {
      getBoutiqueList().then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        this.boutiqueList = res.playlists[0];
      });
    },
    // 分类选择
    chooseCategory(item) {
      if(this.page!=1){
        this.page=1
      }
      this.active = item;
    },
    // 选中分类歌单条数
    SongsheetTotal(total){
      this.total=total
    },
    // 页码发生改变
    handleCurrentChange(val){
      this.page=val
    },
    // 刷新歌单
    goboutique(songSheetid){
      this.$router.push({
        path: "/playlist",
        query: {
          songSheetid,
        },
      });
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
  position: relative;
}
.footer {
  height: 60px;
}
.bgc {
  background-size: cover;
  background-position: center center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  z-index: -1;
  filter: blur(4px);
}
.boutique {
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px;
  border-radius: 5px;

  .boutiqueImg {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 170px;
      height: 170px;
      border-radius: 5px;
      box-shadow: 0 0 10px #fff;
    }
  }
  .boutique_info {
    width: 60%;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .boutique_title {
      cursor: pointer;
      user-select: none;
      border: 1px solid rgb(209, 188, 3);
      box-shadow: 0 0 5px #fff;
      color: #fcd337;
      width: 100px;
      text-align: center;
      border-radius: 3px;
      font-size: 15px;
      padding: 2px;
    }
    .boutique_name {
      color: rgb(255, 255, 255);
      font-size: 18px;
      letter-spacing: 0.4px;
    }
    .boutique_desc {
      color: #e3e3e3;
      font-size: 14px;
      letter-spacing: 0.4px;
    }
  }
}
.category {
  width: 100%;
  padding-top: 40px;
  .category_width {
    width: 850px;
    display: flex;
    .category_item {
      flex: 1;
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-size: 13px;
      color: gray;
      cursor: default;
    }
    .category_item:hover {
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