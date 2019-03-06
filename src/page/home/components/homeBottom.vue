<template>
    <div class="box">
      <div
        :class="active === index ? className + ' box-item' : 'box-item'"
        @click="to(item.link, index)"
        :key=item.icon
        v-for="(item, index) in navList"
        :style="{color: bg}">
        <Icon :type="item.icon" class="box-item-icon" size="25" />
        {{item.name}}
      </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
    export default {
      name: "homeBottom",
      data() {
        return {
          bg: '',
          className: '',
          active: 1,
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
      activated() {
        this.active = this.pageIndex
      },
      computed: {
        ...mapGetters(['pageIndex'])
      },
      created() {
        const user = JSON.parse(window.localStorage.getItem('userInfo') || '{}')
        this.bg = user.skin || '#000108'
        this.className = user.active || ''
        let reg = new RegExp('/find')
        reg.test(this.$router.history.current.path) && this.setPageIndex(2)
        reg = new RegExp('/bookcase')
        reg.test(this.$router.history.current.path) && this.setPageIndex(0)
      },
      methods: {
        to(link, index) {
          this.$router.push(link)
          this.setPageIndex(index)
        },
        ...mapMutations({
          setPageIndex: 'PAGEINDEX'
        })
      },
      watch: {
        pageIndex(val) {
          this.active = val
        }
      }
    }
</script>

<style lang="stylus" scoped>
@import "../../../assets/link-active.styl"
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
