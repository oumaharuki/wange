<template>
  <div class="list-page">
    <top>
      <slot>{{title}}</slot>
    </top>
    <div class="scroll">
      <Scroll class="scroll-ui" :on-reach-bottom="getList">
        <p class="not-book" v-if="books.length === 0">暂无数据……</p>
        <books-list :books=books></books-list>
      </Scroll>
    </div>
  </div>
</template>
<script>
import Top from "components/top-return";
import { booksByCategories, ranking } from "api";
import { cats } from "api/cats";
import BooksList from "components/books-list"

export default {
  name: "bookClassifyList",
  components: {
    Top,
    BooksList
  },
  data() {
    return {
      title: "",
      books: [],
      start: 0
    };
  },
  activated() {
    this.title = this.$route.params.major;
    this.books = [];
    this.getList();
  },
  methods: {
    getList() {
      const gender = this.$route.params.gender
      if (gender !== 'female' && gender !== 'male') {
        return new Promise((resolve) => {
          this.start === 0 && this.getRank()
          resolve()
        })
      } else {
        return new Promise((resolve) => {
          this.getClassify()
          resolve()
        })
      }
    },
    getClassify() {
      return new Promise(resolve => {
        const params = `?gender=${this.$route.params.gender}&type=&major=${this.$route.params.major}&minor=&start=${this.start}&limit=20`;
        cats(booksByCategories + params).then(res => {
          if (res.ok) {
            this.books.push(...res.books);
            res.books.length && this.start++;
          } else {
            this.$Message.error("数据异常！！！");
          }
        });
        resolve();
      });
    },
    getRank() {
      return new Promise(resolve => {
        const param = `${ranking}/${this.$route.params.gender}`
        cats(param).then(rankList => {
          // console.log(rankList, 'list')
          if (rankList.ok) {
            this.books.push(...rankList.ranking.books)
          } else {
            this.$Message.error('数据异常！！！')
          }
        })
      })
    }
  }
};
</script>
<style lang="stylus">
.list-page {
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

.not-book {
  color: #99989b;
  text-align: center;
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
