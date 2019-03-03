<template>
    <div class="home-page">
      <div class="home-head">head</div>
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
      components:{
        HomeBottom
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
    background red
  .home-main
    display  flex
    flex  1
  .home-bottom
    flex  0 0  px2rem(150)
</style>
