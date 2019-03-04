<template>
    <div class="store-head">
      <head-banner class="store-banner"></head-banner>
      <recommend></recommend>
      书城
    </div>
</template>

<script>
  import HeadBanner from "./components/headBanner"
  import Recommend from "./components/recommend"

    export default {
        name: "bookStore",
      components:{
        HeadBanner,
        Recommend
      }
    }
</script>

<style lang="stylus" scoped>
  @import "../../assets/common.styl"
.store-head
  .store-banner
    margin-bottom px2rem(60)

</style>
