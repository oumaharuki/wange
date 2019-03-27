<template>
  <div id='turn-hgz' :style="{'font-size': txtWidth + 'px', 'line-height': lineHeight + 'px'}">
    <div class="content" v-for='item in page' v-html=item>
    </div>
  </div>
</template>
<script>
  import 'assets/js/turn.min'
  export default {
    name: 'turn-hgz',
    data() {
      return {
        screenHeight: 0,
        screemWidth: 0,
        page: []
      }
    },
    props: {
      data: {
        type: String,
        default: ''
      },
      txtWidth: {
        type: Number,
        default: 12
      },
      lineHeight: {
        type: Number,
        default: 18
      }
    },
    created() {
      const txtIndex = `</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
      this.screenHeight = window.screen.height
      this.screemWidth = window.screen.width
      const col = Math.floor((this.screemWidth - 40) / this.txtWidth)
      const row = Math.floor(this.screenHeight / this.lineHeight) - 1
      const pageTxtNum = col * row
      const page = Math.ceil(this.data.length / pageTxtNum)
      const arr = this.data.split('↵')

      this.page = []

      let pageLine = 0
      let pageTxt = ''
      arr.map((item, index) => {
        const currentLine = Math.ceil((item.length + 2) / col)
        pageLine += currentLine
        if (pageLine <= row) {
          console.log(pageLine, 'llll')
          pageTxt += txtIndex + item
        }

        if (pageLine === row) {
          console.log(pageLine, '===')
          this.page.push(pageTxt)
          pageTxt = ''
          pageLine = 0
        } else if (pageLine > row) {
          console.log(pageLine, '>>>')
          const redundant = pageLine - row          
          const str = item
          let end = (currentLine - redundant) * col - 2
          end = end > item.length ? end : -1
          item = item.slice(0, end)
          let temporaryStr = str.slice(item.length)

          pageTxt += txtIndex + item
          pageTxt += temporaryStr.length === 1 ? temporaryStr : ''
          this.page.push(pageTxt)
          pageLine = temporaryStr.length === 1 ? 0 : redundant
          pageTxt = temporaryStr.length === 1 ? '' : temporaryStr
        }
      })
      pageTxt && this.page.push(pageTxt)
      console.log(this.page)
    },
    mounted() {
      $('#turn-hgz').turn({
        width: $('#turn-hgz').width(),
        height: $('#turn-hgz').height(),
        autoCenter: false,
        display: 'single',
        gradients: true
      })
    },
    activated() {

    }
  }
</script>
<style lang='stylus'>
#turn-hgz
  width  100vw
  max-height  100vh
  font-size 16px
  position relative
  background #fff
  .content
    padding 0 20px
    background #fff
</style>