<template>
  <div class="ready-box">
    <turn ref='turn' v-if="content !== ''" :content=content :txtWidth=txtWidth :lineHeight=lineHeight></turn>
  </div>
</template>
<script>
import { cats } from "api/cats"
import { chapterApi, atoc } from "api"
import Turn from 'components/turn'
import { openDB, addData, closeDB, getDataBySome } from 'api/indexedDB.js'
export default {
  name: 'readyDes',
  data() {
    return {
      txtWidth: 14,
      lineHeight: 21,
      readyDes: {},
      content:"",
      link: '',
      bookId: '',
      chapter: []
    }
  },
  components: {
    Turn
  },
  mounted() {
    // this.txtWidth = 14
  },
  activated() {
    this.txtWidth = window.localStorage.getItem('font-zise') || 14
    this.txtWidth = +this.txtWidth
    this.lineHeight = this.txtWidth + 7
    let link = window.localStorage.getItem('ready-link')
    this.bookId = this.$route.params.id
    this.link = link
    this.getPageData()
  },
  methods: {
    init() {
      return new Promise((resolve, reject) => {
        openDB(2.0).then(db => {
          this.getDataByDB(db, 'readyrecord').then(() => {
            this.getDataByDB(db, 'cache').then(() => {
              resolve()
              closeDB()
            }, () => {
              resolve()
              closeDB()
            })
          }, () => {
            this.getDataByDB(db, 'cache').then(() => {
              resolve()
              closeDB()
            }, () => {
              resolve()
              closeDB()
            })
          })
        })
      })
    },
    getDataByDB(db, table) {
      return new Promise((resolve, reject) => {
        getDataBySome(db, table, this.link).then(getData => {
          if (getData && getData.body && getData.bookId === this.bookId) {
            this.content = getData.body
            closeDB()
          } else {
            this.content = ''
            resolve()
          }
        }, () => {
          this.content = ''
          resolve()
        })
      })
    },
    getPageData() {
      this.init().then(() => {
        this.getChapters().then(() => {
          let link = this.link
          if (/(\.txt)$/.test(link)) {
            link = link.replace(/http:\//, 'http:%2F').replace(/\?/, '%3F')
          }
          cats(chapterApi + link).then(chapterDes => {
            if (chapterDes.ok) {
              this.content = chapterDes.chapter.body
              openDB(2.0).then((db) => {
                addData({
                  db: db,
                  table: 'readyrecord',
                  tableSon: { 'id': this.link, 'body': this.content, 'bookId': this.bookId },
                  keyPath: 'id'
                })
              })
            }
          })
        })
      })
    },
    getChapters() {
        // 获取章节
        return new Promise((resolve, reject) => {
          cats(`${atoc}/${this.bookId}?view=chapters`).then(res => {
            // console.log(res, 'res')
            if (res.ok) {
              const chapter = res.mixToc.chapters
              const arr = chapter.filter(item => item.link === this.link)
              if (!arr.length) {
                this.link = chapter[0].link
                window.localStorage.setItem('ready-link', chapter[0].link)
              }
              resolve()
            } else {
              reject()
            }
          })
        })
      }
  }
}
</script>
<style lang="stylus">
</style>
