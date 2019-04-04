<template>
  <div class="ready-box">
    <turn-hgz ref='turn' v-if="content!=''" :content=content :txtWidth=txtWidth :lineHeight=lineHeight></turn-hgz>
  </div>
</template>
<script>
import { chapterApi } from "api";
import { cats } from "api/cats";
import TurnHgz from 'components/turn-hgz'
export default {
  name: 'readyDes',
  data() {
    return {
      txtWidth: 14,
      lineHeight: 21,
      readyDes: {},
      content:""
    }
  },
  components: {
    TurnHgz
  },
  mounted() {
    // this.txtWidth = 14
  },
  activated() {
    let link = window.localStorage.getItem('ready-link')
    if (/(\.txt)$/.test(link)) {
      link = link.replace(/http:\//, 'http:%2F').replace(/\?/, '%3F')
    }
    cats(chapterApi + link).then(chapterDes => {
      if (chapterDes.ok) {
        this.content = chapterDes.chapter.body
        // this.$refs['turn'].initPage(this.readyDes.body)
      }
    })
  },
  deactivated() {
    // window.sessionStorage.removeItem('ready-link')
  }
}
</script>
<style lang="stylus">
</style>
