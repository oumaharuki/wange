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
              <Button type="primary">开始阅读</Button>
            </p>
            <p>
              <Button>加入书架</Button>
            </p>
          </div>
          <p>{{des.longIntro}}</p>
        </div>
        <div class="chapters">
          <Divider dashed />
          <p v-for="(item, index) in chapter" :key="index" @click="getChapter(item)">{{item.title}}</p>
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
export default {
  name: "bookDes",
  components: {
    Top
  },
  data() {
    return {
      statics: statics,
      des: {},
      chapters: [],
      total: 0,
      chapter: [],
      page: 15,
      current: 1
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
    getChapter(item) {
      console.log(chapterApi + item.link)
      cats(chapterApi + item.link).then(chapterDes => {
        console.log(chapterDes)
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
    padding: 0.5rem;
  }
}

.page-ui{
  input{
    width 3.5rem !important;
  }
}

.chapters{
  padding 0 .5rem;
  p{
    margin .5rem 0;
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
