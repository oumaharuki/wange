<template>
  <Carousel loop class="banner-box"
            autoplay dots="outside"
            arrow="never" radius-dot
  >
    <CarouselItem v-for="item in bannerList" :key="item._id">
      <div class="demo-carousel"><img :src="item.img" alt=""></div>
      <!--<div class="demo-carousel">2</div>-->
    </CarouselItem>
  </Carousel>
</template>

<script>
  import {Carousel,CarouselItem} from "iview"
  import banner from "assets/banner.json"
  const ok=true
    export default {
        name: "headBanner",
      data(){
        return {
          bannerList:[]
        }
      },
      components:{
        Carousel,
        CarouselItem
      },
      created() {
        this.init()
      },
      methods:{
          init(){
            this.getBannerData()
          },
        getBannerData(){
            if(banner.ok==ok){
              this.bannerList=banner.data
            }
        }
      }
   }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/common.styl"
.banner-box
  height px2rem(320)
  .demo-carousel
    display flex
    flex 1
    height 100%
    img
      display flex
      flex 1
      height px2rem(320)
</style>
