<template>
  <div>
    <!-- 精彩评论 -->
    <div class="remment">
      <div class="title">精彩评论({{ hotTotal }})</div>
      <div
        class="remment_list"
        v-for="(item, index) in hotcomment"
        :key="index"
      >
        <div class="remment_img">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <div class="remment_right">
          <div class="remment_tator">
            <span class="tator">{{ item.user.nickname }}</span>
            <span>{{ item.content }}</span>
          </div>
          <div class="append" v-if="item.beReplied != 0">
            <div class="append_1">
              <span class="append_2">{{
                item.beReplied[0].user.nickname
              }}</span>
              <span>{{ item.beReplied[0].content }}</span>
            </div>
          </div>
          <div class="remment_dt">{{ item.time | dataFormat1 }}</div>
        </div>
      </div>
    </div>
    <!-- 最新评论 -->
    <div class="remment">
      <div class="title">最新评论({{ newtotal }})</div>
      <div
        class="remment_list"
        v-for="(item, index) in newcomment"
        :key="index"
      >
        <div class="remment_img">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <div class="remment_right">
          <div class="remment_tator">
            <span class="tator">{{ item.user.nickname }}</span>
            <span>{{ item.content }}</span>
          </div>
          <div class="append" v-if="item.beReplied != 0">
            <div class="append_1">
              <span class="append_2">{{
                item.beReplied[0].user.nickname
              }}</span>
              <span>{{ item.beReplied[0].content }}</span>
            </div>
          </div>
          <div class="remment_dt">{{ item.time | dataFormat1 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Remment",
  props: {
    hotcomment:{
      type:Array
    },
    newcomment:{
      type:Array
    },
    hotTotal:{
      type:Number
    },
    newtotal:{
      type:Number
    },
  },
};
</script>

<style lang="less" scoped>
.remment {
  width: 100%;
  margin-top: 20px;
  .title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .remment_list {
    display: flex;
    margin-bottom: 40px;
  }
  .remment_img {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
  .remment_right {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e4e4e4;
    .remment_tator {
      font-size: 14px;
      margin-bottom: 10px;
      .tator {
        color: #1e38a1;
        margin-right: 5px;
      }
    }
    .append {
      background-color: #e4e4e4;
      font-size: 14px;
      border-radius: 5px;
      margin-bottom: 10px;
      .append_1 {
        line-height: 30px;
        margin-left: 10px;
        .append_2 {
          color: #1e38a1;
          margin-right: 5px;
        }
      }
    }
    .remment_dt {
      font-size: 12px;
      color: gray;
      margin-bottom: 5px;
    }
  }
}
</style>