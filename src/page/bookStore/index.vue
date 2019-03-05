<template>
    <div class="store-head">
      <head-banner class="store-banner"></head-banner>
      <recommend :hotRecommend="male|hotRecommend" v-if="male.length>0"></recommend>
      书城
    </div>
</template>

<script>
  import HeadBanner from "./components/headBanner"
  import Recommend from "./components/recommend"
  import {GetRanking,GetHot} from "api/bookStore"
  import {mapGetters,mapActions} from "vuex"
  const ok=true
    export default {
        name: "bookStore",
      components:{
        HeadBanner,
        Recommend
      },
      data(){
        return {
          male:[]
        }
      },
      created() {
        this.init()
      },
      filters:{
        hotRecommend(data){
          return data[4]
        }
      },
      methods:{
        ...mapActions({
          setRankingList:"setRankingList"
        }),
        init(){
          this.getRanking()
        },
        //排行列表，先默认获取男的
        getRanking(){
          GetRanking().then((res)=>{
            if(res.ok==ok){
              this.setRankingList(res)
              this.male=res.male
            }
          })
        },
      }
    }
</script>

<style lang="stylus" scoped>
  @import "../../assets/common.styl"
.store-head
  .store-banner
    margin-bottom px2rem(60)

</style>
