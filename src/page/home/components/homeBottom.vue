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
      created() {
        const getSkin = window.localStorage.getItem('skin')
        const getActive = window.localStorage.getItem('active')
        this.bg = getSkin || '#000108'
        this.className = getActive || ''
        console.log(this.className)
      },
      methods: {
        to(link, index) {
          this.$router.push(link)
          this.active = index
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
