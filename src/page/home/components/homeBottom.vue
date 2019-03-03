<template>
    <div class="box">
      <router-link class="box-item" to="/">
        <Icon type="ios-bookmarks" class="box-item-icon" size="25"/>
        书架
      </router-link>
      <router-link class="box-item" to="/home/bookStore">
        <Icon type="ios-bookmarks" class="box-item-icon" size="25"/>
        书城
      </router-link>
      <router-link class="box-item" to="/">
        <Icon type="ios-bookmarks" class="box-item-icon" size="25"/>
        发现
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "homeBottom"
    }
</script>

<style lang="stylus" scoped>
.box
  display flex
  flex-direction row
  .box-item
    display flex
    flex 1
    justify-content center
    align-items center
    flex-direction column





</style>
