<template>
    <div class="recommend-box">
      <div class="recommend-title"><i></i>热门推荐</div>
      <div class="recommend-main"  v-if="recommendList.length>0">
        <book-item v-for="(item,index) in recommendList" :key="index"
                   :data="item" class="recommend-book" :class="(index+1)%4==0?'no-margin':''">
        </book-item>
        <!--<div v-for="item in recommendList" v-if="recommendList.length>0">-->
          <!--<img :src="statics+item.cover" alt="">-->
          <!--<p>{{item.title}}</p>-->
          <!--<p>{{item.author}}</p>-->
        <!--</div>-->
      </div>
      <change-item @handleClick="handleClick"></change-item>
    </div>
</template>

<script>
  import {statics} from "api"
  import {GetRanking,GetHot} from "api/bookStore"
  import BookItem from "components/bookItem"
  import ChangeItem from "components/changeItem"
  import {mapGetters,mapActions} from "vuex"
  const ok=true
    export default {
        name: "recommend",
      props:["hotRecommend"],
      components:{
        BookItem,
        ChangeItem
      },
      data(){
       return {
         recommend:[],
         recommendList:[],
         statics:statics
       }
      },
      beforeCreate(){

      },
      created() {
          this.init()
      },
      computed:{
        ...mapGetters(["hotRecommendListLimit"])
      },
      methods:{
        ...mapActions({
          sethotRecommendListLimit:"sethotRecommendListLimit"
        }),
          init(){
            this.getHotList()
          },
        getHotList(){
          let recommendList=null;
          if(this.hotRecommend){
            GetHot(this.hotRecommend.totalRank).then((res)=>{
              if(res.ok==ok){
                this.recommend=res.ranking.books;
                recommendList=res.ranking.books;
                let limit=this.hotRecommendListLimit
                if(limit!=null&&recommendList!=null){
                  recommendList.slice(limit.start,limit.end)
                  this.recommendList=recommendList
                  return
                }
                this.sethotRecommendListLimit({start:0,end:8})
                this.recommendList=recommendList.slice(0,8)
              }
            })
          }
        },
        handleClick(){
          let limit=this.hotRecommendListLimit;
          limit.start=limit.start+8;
          limit.end=limit.end+8;
          this.sethotRecommendListLimit({start:limit.start,end:limit.end})
          this.recommendList=this.recommend.slice(limit.start,limit.end)
        },
      },
      watch:{
        recommendList:{
          handler(){

          },
          immediate: true,
          deep: true
        }
      }
    }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/common.styl"
.recommend-box
  padding px2rem(40)
  .recommend-title
    display flex
    flex-direction row
    justify-content flex-start
    align-items center
    i
      display inline-block
      height px2rem(35)
      width px2rem(5)
      background red
      margin-right px2rem(10)
  .recommend-main
    display flex
    flex-direction row
    flex-wrap wrap
    margin-top px2rem(60)
    .recommend-book
      width px2rem(200)
      margin-right px2rem(70)
      &.no-margin
        margin-right 0
</style>
