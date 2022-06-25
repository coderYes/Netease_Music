<template>
  <div class="container">
    <!-- 歌单详细信息 -->
    <div class="header">
      <!-- 歌单图片 -->
      <div class="header_img">
        <img :src="songSheetInfo.coverImgUrl" alt="" />
      </div>
      <!-- 歌单信息 -->
      <div class="header_info">
        <div class="info_name">{{ songSheetInfo.name }}</div>
        <!-- 作者信息 -->
        <div class="info_avatar">
          <img :src="userinfo.avatarUrl" alt="" />
          <span class="info_nickname">{{
            userinfo.nickname
          }}</span>
          <span class="info_createtime"
            >{{ songSheetInfo.createTime | timeConversion }} 创建</span
          >
        </div>
        <div class="info_button">
          <el-button type="danger" size="mini"
            ><span class="iconfont icon-bofang"></span>播放全部</el-button
          >
        </div>
        <div class="info_tags">
          <span class="tag1">标签:</span>
          <span v-for="(item, index) in songSheetInfo.tags" :key="index">{{
            item + " "
          }}</span>
        </div>
        <div class="info_desc">{{ songSheetInfo.description }}</div>
      </div>
    </div>
    <!-- 标签 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 歌曲列表 -->
      <el-tab-pane label="歌曲列表" name="first">
        <div>
          <el-table :data="songSheetList" style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column width="100">
              <template slot-scope="scope">
                <div class="centerSpan" @click="play(scope.row.id,scope.row)">
                  <span class="iconfont icon-bofang"></span>
                  <img v-lazy="scope.row.al.picUrl" alt="" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="音乐标题"
              width="250"
            ></el-table-column>
            <el-table-column prop="ar[0].name" label="歌手"> </el-table-column>
            <el-table-column prop="al.name" label="专辑"> </el-table-column>
            <el-table-column label="时长">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.dt | dataFormat }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 评论 -->
      <el-tab-pane label="评论" name="second">
        <remment :hotcomment="hotcomment" :newcomment="newcomment" :hotTotal="hotTotal" :newtotal="newtotal"  />
      </el-tab-pane>
    </el-tabs>

    <div class="footer"></div>
  </div>
</template>

<script>
import { getSonglistDetail, getHotcomments, getSongUrl,getNewcomments } from "@/api/utils";
import Remment from '../../components/Remment.vue';
export default {
  name: "Playlist",
  components: {
    Remment
  },
  data() {
    return {
      //歌单信息
      songSheetInfo: {},
      // 歌曲列表
      songSheetList: [],
      // 热评
      hotcomment: [],
      // 新评
      newcomment:[],
      // 热评数量
      hotTotal: 0,
      // 新评数量
      newtotal:0,
      // tabs
      activeName: "first",
      //作者信息
      userinfo:{},
      // 页数
      page:1
    };
  },
  computed: {
    //歌单id
    id(){
      return this.$route.query.songSheetid;
    }
  },
  created() {
    this.getSonglistDetail();
    this.getNewcomments()
  },
  methods: {
    // 获取歌单详情
    getSonglistDetail() {
      getSonglistDetail(this.id).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        this.songSheetInfo = res.playlist;
        this.userinfo=res.playlist.creator
        this.songSheetList = res.playlist.tracks;
      });
      //热门评论
      getHotcomments(this.id).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        this.hotcomment = res.hotComments;
        this.hotTotal = res.total;
      });
    },
    //最新评论
    getNewcomments(){
      getNewcomments(this.id,this.page).then(res=>{
        // console.log(res);
        if(res.code!=200) return  
        this.newcomment=res.comments
        this.newtotal=res.total
      })
    },
    //tabs切换
    handleClick(val) {
      this.activeName = val.name;
    },
    //播放
    play(id,item) {
      this.$store.state.songX.id=item.id
      this.$store.state.songX.url=item.al.picUrl
      this.$store.state.songX.sname=item.al.name
      this.$store.state.songX.name=item.ar[0].name
      // console.log(this.$store.state.songX);
      getSongUrl(id).then((res) => {
        // console.log(res);
        if (res.code != 200) return;
        let url = res.data[0].url;
        this.$store.state.id = url;
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
.header {
  display: flex;
  width: 100%;
  align-items: center;
  .header_img {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 210px;
      width: 210px;
      border-radius: 5px;
    }
  }
  .header_info {
    flex: 1;
    margin-left: 20px;
    div{
      margin-bottom: 5px;
    }
    .info_name {
      font-size: 18px;
    }
    .info_avatar {
      display: flex;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 5px;
      }
      .info_nickname {
        margin-right: 10px;
      }
      .info_createtime {
        font-size: 13px;
      }
    }
    .info_tags {
      font-size: 13px;
      .tag1 {
        font-size: 16px;
        margin-right: 10px;
      }
    }
    .info_desc {
      font-size: 13px;
      color: gray;
    }
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
.footer {
  height: 60px;
}
</style>