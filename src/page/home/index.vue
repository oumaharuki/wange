<template>
    <div class="home-page">
      <div class="home-head" :style="{background: bg}"><div></div>
        <div style="padding: 0 20px;color: #fff" @click="search"><Icon type="ios-search" size="24"/>
        </div>
      </div>
      <div class="home-main">
        <router-view/>
      </div>
      <home-bottom class="border-1px home-bottom">

      </home-bottom>
      <!--<div class="home-bottom">-->
        <!--bottom-->
      <!--</div>-->
    </div>
</template>

<script>
import HomeBottom from './components/homeBottom'
    export default {
      name: "home",
      data() {
        return {
          bg: ''
        }
      },
      created() {
        const user = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
        this.bg = user.skin || '#000108'
      },
      components:{
        HomeBottom
      },
      methods:{
        search(){
          this.$router.push("/search")
        }
      }
    }
</script>

<style lang="stylus" scoped>
  @import "../../assets/common.styl"
.home-page
  display flex
  flex 1
  flex-direction column
  .home-head
    flex  0 0  px2rem(150)
    display flex
    flex-direction row
    justify-content space-between
    align-content center
    line-height px2rem(150)
    z-index 1
  .home-main
    display  flex
    flex  1
    flex-direction column
    position relative
  .home-bottom
    flex  0 0  px2rem(150)
    z-index 1
</style>
