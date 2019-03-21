<template>
  <div class="ready-box">
    {{readyDes.body}}
  </div>
</template>
<script>
import { chapterApi } from "api";
import { cats } from "api/cats";
export default {
  name: 'readyDes',
  data() {
    return {
      readyDes: {}
    }
  },
  activated() {
    let link = window.sessionStorage.getItem('ready-link')
    if (/(\.txt)$/.test(link)) {
      link = link.replace(/http:\//, 'http:%2F').replace(/\?/, '%3F')
    }
    cats(chapterApi + link).then(chapterDes => {
      if (chapterDes.ok) {
        this.readyDes = chapterDes.chapter
      }
    })
  },
  deactivated() {
    window.sessionStorage.removeItem('ready-link')
  }
}
</script>
<style lang="stylus">
</style>
