<template>
    <div class="recommend-box">
      <div class="recommend-title"><i></i>热门推荐</div>
      <div class="recommend-main">
        <div v-for="item in recommendList">

        </div>
      </div>
    </div>
</template>

<script>
  import {Get} from "api/bookStore"
  import {hotRecommendApi} from "api"
  const ok=true
    export default {
        name: "recommend",
      data:{
        recommendList:[]
      },
      created() {
          this.init()
      },
      methods:{
          init(){
            this.getHotRecommend()
          },
          getHotRecommend(){
            Get(hotRecommendApi).then((res)=>{
              if(res.ok==ok){
                this.recommendList=res.ranking.books
              }
            })
          }
      }
    }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/common.styl"
.recommend-box
  .recommend-title
    padding px2rem(40)
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
    padding padding px2rem(40)
</style>
