<template>
  <Carousel loop class="banner-box"
            autoplay dots="outside"
            arrow="never" radius-dot
  >
    <CarouselItem>
      <div class="demo-carousel"><img src="../../../assets/img/1551425794661.jpg" alt=""></div>
      <!--<div class="demo-carousel">2</div>-->
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel"><img src="../../../assets/img/1551426024217.jpg" alt=""></div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel"><img src="../../../assets/img/1551426048611.jpg" alt=""></div>
    </CarouselItem>
  </Carousel>
</template>

<script>
  import {Carousel,CarouselItem} from "iview"
    export default {
        name: "headBanner",
      components:{
        Carousel,
        CarouselItem
      }
    }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/common.styl"
.banner-box
  height px2rem(280)
  .demo-carousel
    display flex
    flex 1
    height 100%
    img
      display flex
      flex 1
      height px2rem(280)
</style>
