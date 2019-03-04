<template>
    <div class="box">
      <router-link class="box-item" :to="item.link" :key=item.icon v-for="item in navList" :style="{color: bg}">
        <Icon :type="item.icon" class="box-item-icon" size="25" />
        {{item.name}}
      </router-link>
    </div>
</template>

<script>
    export default {
      name: "homeBottom",
      data() {
        return {
          bg: '',
          navList: [
            {
              name: '书架',
              icon: 'md-bookmarks',
              link: '/home/bookcase'
            },
            {
              name: '书城',
              icon: 'ios-archive',
              link: '/home/bookStore'
            },
            {
              name: '发现',
              icon: 'md-compass',
              link: '/home/find'
            }
          ]
        }
      },
      created() {
        const getSkin = window.localStorage.getItem('skin')
        this.bg = getSkin || '#000108'
      }
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
