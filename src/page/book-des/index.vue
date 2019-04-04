<template>
  <div class="des-page">
    <top>
      <slot>{{des.title || '详情'}}</slot>
    </top>
    <div class="scroll">
      <Scroll class="scroll-ui">
        <div class="book-des">
          <div class="des">
            <img :src="statics + des.cover" alt>
            <div>
              <p class="title">{{des.title}}</p>
              <p>
                <Icon type="md-contact"/>
                {{des.author}}
              </p>
              <p>
                {{des.rating && des.rating.score.toFixed(2)}}分</p>
              <p>{{des.minorCateV2}}</p>
            </div>
          </div>
          <div class="btn">
            <p>
              <Button type="primary" @click='beginReady'>开始阅读</Button>
            </p>
            <p>
              <Button @click='addBookCase'>加入书架</Button>
            </p>
          </div>
          <p>{{des.longIntro}}</p>
        </div>
        <div class="chapters">
          <Divider dashed />
          <chapters :chapter=chapter></chapters>
          <Page :current.sync="current" :total="total" simple @on-change="changePage" :page-size="page" class="page-ui"/>
          <!-- <Divider dashed /> -->
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
import Top from "components/top-return";
import { bookDes, statics, atoc, chapterApi } from "api";
import { cats } from "api/cats";
import Chapters from "components/chapters"
import { openDB, addData } from 'api/indexedDB.js'
export default {
  name: "bookDes",
  components: {
    Top,
    Chapters
  },
  data() {
    return {
      statics: statics,
      des: {},
      chapters: [],
      total: 0,
      chapter: [],
      page: 15,
      current: 1,
      db: null
    };
  },
  activated() {
    this.getDes();
  },
  methods: {
    getDes() {
      const param = `${bookDes}/${this.$route.params.id}`;
      cats(param).then(des => {
        this.des = des;
      });
      cats(`${atoc}/${this.$route.params.id}?view=chapters`).then(res => {
        this.chapters = res.mixToc.chapters
        this.total = this.chapters.length
        const end = this.page < this.total ? this.page : this.total
        this.getChapters(0, end)
      })
    },
    getChapters(start, end) {
      let index = 0
      this.chapter = []
      Array.from({length: (end - start)}).map(() => { this.chapter.push(this.chapters[start + index++]) })
    },
    changePage() {
      const start = this.current - 1
      const end = (start + 1) * this.page > this.chapters.length ? this.chapters.length : (start + 1) * this.page
      this.getChapters(start * this.page, end)
    },
    beginReady() {
    },
    addBookCase() {
      let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB

      if (!indexedDB) {
        window.alert('您的设备不支持该功能')
        return
      }

      openDB(2.0).then((db) => {
        this.db = db
        addData({
          db: this.db,
          table: 'bookcase',
          tableSon: { 'id': this.des._id, cover: this.des.cover, title: this.des.title },
          keyPath: 'id'
        })
        
        // this.chapters.map(item => {
        //   this.getContent(item.link).then(res => {
        //     addData({
        //       db: this.db,
        //       table: 'bookcontent',
        //       tableSon: { link: item.link, bookId: this.des._id, title: item.title, content: res.body },
        //       keyPath: 'link'
        //     })
        //   })
        // })
      })
    },
    addBookCases() {
      if (window.openDatabase) {
        let db = window.openDatabase('zssq', '1.0', '书架', null)
        db.transaction((tx) => {
          tx.executeSql(`create table if not exists bookcase(bookId,cover,title)`)
          tx.executeSql(`create table if not exists bookcontent(bookId,title,link,content)`)
        })

        db.transaction((tx) => {
          tx.executeSql(`select * from bookcase`, [], (tx1, res) => {
            const list = res.rows
            let filterItem = []
            for (let i = 0; i < list.length; i++) {
              if (list.item(i).bookId === this.des._id) {
                filterItem.push(list.item(i))
              }
            }
            if (filterItem.length === 0) {
              tx.executeSql(`insert into bookcase(bookId,cover,title) values(?,?,?)`,[this.des._id, this.des.cover, this.des.title])
            }
          })
        })

        db.transaction((tx) => {
          // tx.executeSql(`insert into bookcontent(bookId,title,link,content) values(?,?,?,?)`,['this.des._id', 'item.title', 'item.link', 'res.body'], (ctx,result) => {
          //       console.log("插入成功");
          //   }, (tx, error) => {
          //       window.alert('插入失败: ' + error.message);
          //   })
          this.chapters.map(item => {
            tx.executeSql(`select * from bookcontent`, [], (tx2, res) => {
              const list = res.rows
              let filters = []
              for (let i = 0; i < list.length; i++) {
                if (list.item(i).link === item.link) {
                  filters.push(list.item(i))
                }
              }

              if (filters.length === 0) {

                db.transaction((ctx) => {
                  this.getContent(item.link).then((res) => {
                    console.log(res, 'res')
                    console.log(ctx, 'ctx')
                    ctx.executeSql(`insert into bookcontent(bookId,title,link,content) values(?,?,?,?)`, [this.des._id, item.title, item.link, res.body], (tx4, result) => {
                      console.log('插入成功')
                    }, (tx3, error) => {
                      window.alert(error.message)
                    })
                  })
                })
                
              }
            })
          })
        })
      } else {
        this.$Message.error('dataBase error')
      }
    },
    getContent (link) {
      return new Promise((resolve, reject) => {
        if (/(\.txt)$/.test(link)) {
          link = link.replace(/http:\//, 'http:%2F').replace(/\?/, '%3F')
        }
        cats(chapterApi + link).then(chapterDes => {
          if (chapterDes.ok) {
            resolve(chapterDes.chapter)
          } else {
            reject()
          }
        })
      })
    }
  }
};
</script>
<style lang="stylus">
.des-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.scroll {
  flex: 1;
  position: relative;
}

.ivu-scroll-wrapper {
  height: 100%;
}

.ivu-scroll-container {
  height: 100% !important;
}

.scroll-ui {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.book-des {
  .des {
    position: relative;
    padding: 0 0.5rem;

    img {
      width: 4rem;
    }

    div {
      position: absolute;
      top: 0;
      left: 5rem;
      right: 0.5rem;
      bottom: 0;
      p{
        margin .2rem 0;
      }
    }
    .title{
      font-size 1rem;
      margin 0;
    }
  }

  .btn {
    text-align: center;
    display: flex;

    p {
      flex: 1;
    }
  }

  > p {
    // text-indent: 1.4rem;
    padding: 0.5rem;
  }
}

.page-ui{
  input{
    width 3.5rem !important;
  }
}

.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>
