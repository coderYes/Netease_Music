<template>
  <div>
    <el-table :data="newSongs" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <div class="centerSpan" @click="play(scope.row.id,scope.row)">
            <span class="iconfont icon-bofang"></span>
            <img v-lazy="scope.row.album.picUrl" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="音乐标题"
        width="250"
      ></el-table-column>
      <el-table-column prop="album.artists[0].name" label="歌手" width="150">
      </el-table-column>
      <el-table-column prop="album.name" label="专辑" > </el-table-column>
      <el-table-column label="时长" width="80">
        <template slot-scope="scope">
          <div>
            {{ scope.row.duration | dataFormat }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNewSong,getSongUrl } from "@/api/utils";
export default {
  name:'Songtable',
  props:{
    activeType:{
      type:Number
    }
  },
  data() {
    return {
      newSongs:[],
    }
  },
  watch:{
    activeType(){
      return this.getNewSong(this.activeType)
    }
  },
  created() {
    this.getNewSong(this.activeType)
  },
  methods: {
    getNewSong(type) {
      getNewSong(type).then((res) => {
        // console.log(res);
        this.newSongs = res.data;
      });
    },
    play(id,item){
      this.$store.state.songX.id=item.id
      this.$store.state.songX.url=item.album.picUrl
      this.$store.state.songX.sname=item.name
      this.$store.state.songX.name=item.artists[0].name
      // console.log( this.$store.state.songX);
      getSongUrl(id).then((res) => {
        // console.log(res);
        if (res.code != 200) return 
        let url=res.data[0].url
        this.$store.state.id=url
      });
    }
  },
};
</script>

<style lang="less" scoped>
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
</style>