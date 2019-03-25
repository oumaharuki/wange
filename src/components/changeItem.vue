<template>
    <div class="changeItem" @click="handleClick">
      换一批
    </div>
</template>

<script>
    export default {
        name: "changeItem",
      methods:{
        handleClick(){
          this.$emit("handleClick")
        }
      }
    }
</script>

<style scoped lang="stylus">
  @import "../assets/common.styl"
.changeItem
  text-align center
  padding px2rem(60) 0
</style>
