<template>
  <div class="classify-page" ref="box">
    <top ref='top'>
      <slot>分类</slot>
    </top>
    <div class="scroll">
      <Scroll class="scroll-ui">
        <div v-for="list in classifys" :key="list.title" class="classify-box">
          <div class="classify-title">{{list.title}}</div>
          <div :class="list.class">
            <p v-for="item in list.list" :key="item.name" @click="getBookList({gender: list.class, item})">{{item.name}}</p>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
import Top from "components/top-return";
import { catsApi } from "api";
import { cats } from "api/cats";
export default {
  name: "bookClassify",
  data() {
    return {
      classifys: [
        {
          title: "男生",
          class: "male",
          list: []
        },
        {
          title: "女生",
          class: "female",
          list: []
        },
        {
          title: "其他",
          class: "press",
          list: []
        }
      ]
    };
  },
  components: {
    Top
  },
  created() {
    cats(catsApi).then(res => {
      if (res.ok) {
        this.classifys[0].list = res.male;
        this.classifys[1].list = res.male;
        this.classifys[2].list = res.press
      } else {
        this.$Message.error('数据异常！！！')
      }
    });
  },
  methods: {
    getBookList(param) {
      this.$router.push({path: `/bookClassifyList/${param.gender}/${param.item.name}`})
    }
  }
};
</script>
<style lang="stylus">
.classify-page{
  display flex;
  flex-direction column;
  height 100vh;
}
.male, .female{
  border-bottom: 1px solid #f1f2f7;
}
.scroll{
  flex 1;
  position relative;
}
.ivu-scroll-wrapper {
  height 100%;
}
.ivu-scroll-container{
  height 100% !important;
}
.classify-box{
  padding 0 .5rem;
}
.classify-title{
  padding .6rem 0;
}
.scroll-ui{
  position absolute;
  top: 0;
  left 0;
  right 0;
  bottom 0;
}
.male, .female, .press {
  p {
    margin 0 .6rem .6rem .6rem;
    display inline-block;
    padding .6rem 1.2rem;
    background-color #96c2fc;
    color #746d75;
    border-radius .2rem;
  }
}
.female{
  p{
    background-color #ffb6ca;
  }
}
.press {
  p{
    background-color #bdc6ac;
  }
}
</style>
