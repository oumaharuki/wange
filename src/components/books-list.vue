<template>
<div>
  <div class="book" v-for="item in books" :key="item.lateleFollower" @click="getBook(item._id)">
    <img :src="statics + item.cover">
    <div>
      <p class="title">{{item.title}}</p>
      <p class="shortIntro">{{item.shortIntro}}</p>
      <p class="author" v-show=item.author>
        <Icon type="md-contact"/>
        {{item.author}}
      </p>
      <p class="lateleFollower" v-show=item.latelyFollower>{{item.latelyFollower}}人在追</p>
    </div>
  </div>
</div>
</template>
<script>
import { statics } from "api";
export default {
  name: "books-list",
  props: {
    books: {
      type: Array,
      default:[]
    }
  },
  data() {
    return {
      statics
    };
  },
  methods: {
    getBook(id) {
      this.$router.push(`/bookDes/${id}`)
    }
  }
};
</script>
<style lang="stylus" scoped>
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
</style>
