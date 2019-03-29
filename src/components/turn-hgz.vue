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
      console.log(this.data, 'turn data')
      const txtIndex = `<p></p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
      this.screenHeight = window.screen.height
      this.screemWidth = window.screen.width
      const col = Math.floor((this.screemWidth - 40) / this.txtWidth)
      const row = Math.floor(this.screenHeight / this.lineHeight)
      const pageTxtNum = col * row
      const page = Math.ceil(this.data.length / pageTxtNum)
      const arr = this.data.split('↵')
      console.log(arr, 'arr')

      this.page = []

      let pageLine = 0
      let pageTxt = ''
      arr.length > 0 && arr.map((item, index) => {
        const currentLine = Math.ceil((item.length + 3) / col)
        pageLine += currentLine
        if (pageLine <= row) {
          pageTxt += txtIndex + item
        }

        if (pageLine === row) {
          this.page.push(pageTxt)
          pageTxt = ''
          pageLine = 0
        } else if (pageLine > row) {
          const redundant = pageLine - row          
          const txtIndexNum = item.slice(0, 1) === `"` ? 3 : 4
          let end = (currentLine - redundant) * col - txtIndexNum
          
          const str = end < item.length ? item.slice(0, end) : item.slice(0)
          let temporaryStr = str.length === item.length ? '' : item.slice(str.length)

          const txt = txtIndex + str
          pageTxt += txt
          pageTxt += temporaryStr.length === 1 ? txt.slice(0, -1) : ''
          this.page.push(pageTxt)
          pageLine = redundant
          pageTxt = temporaryStr.length === 1 ? txt.slice(-1) + temporaryStr : temporaryStr
        }
      })

      pageTxt && this.page.push(pageTxt)
      console.log(this.page)
    },
    mounted() {
      this.data && this.page.length > 1 && $('#turn-hgz').turn({
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
  height  100vh !important
  position relative
  background #fff
  .content
    padding 0 20px
    background #fff
    br {
      height 0px !important;
    }
</style>