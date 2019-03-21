<template>
  <div class="rank-page">
    <top>
      <slot>排行榜</slot>
    </top>
    <div class="scroll">
      <Scroll class="scroll-ui">
        <p class="not-book" v-if="rankData.length === 0">暂无数据……</p>
        <div v-for="item in rankData" :key="item.monthRank" class="rank-list" @click="getRank(item)">
          <img :src="statics + item.cover" alt>
          <div>
            <p class="shortIntro">{{item.shortTitle}}</p>
          </div>
        </div>
        <p class="bottom-line" v-if="rankData.length">我也有底线的~</p>
      </Scroll>
    </div>
  </div>
</template>
<script>
import Top from "components/top-return";
import { rankingApi, statics } from "api";
import { cats } from "api/cats";
export default {
  name: "rank",
  data() {
    return {
      rankData: [],
      statics
    };
  },
  components: {
    Top
  },
  created() {
    const user = JSON.parse(window.localStorage.getItem("userInfo") || "{}");
    cats(rankingApi).then(res => {
      // console.log(res, "rank");
      if (res.ok) {
        this.rankData = user.gender ? res[user.gender] : res["male"];
      }
    });
  },
  methods: {
    getRank(param) {
      const id = param.totalRank || param._id || param.monthRank
      id && this.$router.push({path: `/bookClassifyList/${id}/${param.shortTitle}`})
    }
  }
};
</script>
<style lang="stylus">
.rank-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.scroll {
  flex: 1;
  position: relative;
}

.ivu-scroll-wrapper {
  height: 100%;
}

.ivu-scroll-container {
  height: 100% !important;
}

.scroll-ui {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.rank-list{
  display flex;
  margin .5rem;
  border-bottom 1px solid #f1f2f7;
  padding-bottom .5rem;
  img{
    width 1.4rem;
    height 1.4rem;
  }
  div{
    flex 1;
    line-height 1rem;
    margin-left .5rem;
  }
}

.not-book {
  color: #99989b;
  text-align: center;
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.bottom-line{
  text-align center;
  color #99989b;
}
</style>
