<template>
  <div class="find-page">
    <router-link :to="item.link" :key='item.link' class="find-item" v-for="item in findList">
      <Icon :type=item.icon size="18" :color='bg'/>
      <p :style="{color: bg}">{{item.name}}</p>
      <Icon type="ios-arrow-forward" size="18" :color='bg'/>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "find",
  data() {
    return {
      findList: [{
        name: '公告',
        link: '/notice',
        icon: 'ios-notifications'
      }, {
        name: '分类',
        link: '/bookClassify',
        icon: 'ios-menu'
      }, {
        name: '排行榜',
        link: '/rank',
        icon: 'ios-stats'
      }, {
        name: '设置',
        link: '/seting',
        icon: 'md-settings'
      }, {
        name: '更多详情',
        link: '/home/find',
        icon: 'logo-octocat'
      }],
      bg: ''
    };
  },
  created() {
    const user = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
    this.bg = user.skin || '#000108'
  }
};
</script>
<style lang="stylus">
.find-page {
  background-color: #fafafa;
  width: 100%;
  flex 1;
}

.find-item {
  background-color: #fff;
  margin-bottom: 0.5rem;
  padding: 0.7rem 0.5rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  line-height: 0.4rem;
  p {
    flex: 1;
    line-height: 18px;
    margin-left: 0.2rem;
  }
}
</style>
