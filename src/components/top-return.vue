<template>
  <div class="back-nav" :style="{background: bg}">
    <!-- 顶部返回栏 -->
    <Icon type="ios-arrow-back" @click="back" size='18'/>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "top",
  data() {
    return {
      bg: '#000108'
    }
  },
  created() {
    const user = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
    this.bg = user.skin || this.bg
  },
  methods: {
    back() {
      window.history.go(-1);
    }
  }
};
</script>
<style lang='stylus'>
.back-nav {
  padding: 0.6rem 0.5rem;
  color: #fff;
  font-weight: bolder
}
</style>
