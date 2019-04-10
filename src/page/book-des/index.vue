<template>
  <div class="des-page">
    <top>
      <slot>{{des.title || '详情'}}</slot>
    </top>
    <div class="scroll">
      <Scroll class="scroll-ui">
        <book-detail :des=des></book-detail>
        <!-- <Divider dashed /> -->
        <!-- <div class="chapters">
          <chapters :chapter=chapter></chapters>
          <Page :current.sync="current" :total="total" simple @on-change="changePage" :page-size="page" class="page-ui"/>
          <Divider dashed />
        </div> -->
      </Scroll>
    </div>
  </div>
</template>
<script>
import Top from "components/top-return";
import { bookDes, atoc, chapterApi } from "api";
import { cats } from "api/cats";
import Chapters from "components/chapters"
import BookDetail from 'components/book-detail'
export default {
  name: "bookDes",
  components: {
    Top,
    Chapters,
    BookDetail
  },
  data() {
    return {
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
    },
    // getChapters(start, end) {
    //   let index = 0
    //   this.chapter = []
    //   Array.from({length: (end - start)}).map(() => { this.chapter.push(this.chapters[start + index++]) })
    // },
    // changePage() {
    //   const start = this.current - 1
    //   const end = (start + 1) * this.page > this.chapters.length ? this.chapters.length : (start + 1) * this.page
    //   this.getChapters(start * this.page, end)
    // }
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
