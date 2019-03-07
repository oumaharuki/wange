<template>
  <div class="list-page">
    <top>
      <slot>{{title}}</slot>
    </top>
    <div class="scroll">
      <Scroll class="scroll-ui" :on-reach-bottom="getList">
        <p class="not-book" v-if="books.length === 0">暂无数据……</p>
        <div v-for="item in books" :key="item.lateleFollower" class="book" @click="getBook(item._id)">
          <img :src="statics + item.cover" alt>
          <div>
            <p class="title">{{item.title}}</p>
            <p class="shortIntro">{{item.shortIntro}}</p>
            <p class="author">
              <Icon type="md-contact"/>
              {{item.author}}
            </p>
            <p class="lateleFollower">{{item.latelyFollower}}人在追</p>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
import Top from "components/top-return";
import { booksByCategories, statics, ranking } from "api";
import { cats } from "api/cats";

export default {
  name: "bookClassifyList",
  components: {
    Top
  },
  data() {
    return {
      title: "",
      books: [],
      start: 0,
      statics: statics
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
        const params = `?gender=${this.$route.params.gender}&type=hot&major=${this.$route.params.major}&minor=&start=${this.start}&limit=20`;
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
    },
    getBook(id) {
      this.$router.push(`/bookDes/${id}`)
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

.book {
  // display: flex;
  padding: 0 0.5rem;
  margin: 1rem 0;
  position relative;
  min-height 5.5rem;
  img {
    width: 4rem;
  }

  div {
    position absolute;
    top: 0;
    left 5rem;
    right .5rem;
    bottom 0;
    // flex: 1;s
    // padding-left: 0.5rem;
    // color: #99989b;
    border-bottom: 1px solid #f1f2f7;
  }

  .title {
    font-size: 1rem;
    color: #737373;
    overflow: hidden;
  }

  .shortIntro {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .author {
    margin: 0.15rem 0;
  }
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
