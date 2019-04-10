<template>
  <div class="book-box" @click="routerPush(data._id)">
    <img :src="statics+data.cover" alt="">
    <p>{{data.title}}</p>
    <p>{{data.author}}</p>
  </div>
</template>

<script>
  import {statics} from "api"
    export default {
        name: "bookItem",
      props:["data"],
      data(){
        return {
          statics:statics
        }
      },
      methods:{
        routerPush(id){
          console.log(id);
          this.$router.push("/book-des/"+id)
        }
      }
    }
</script>

<style lang="stylus" scoped>
  @import "../assets/common.styl"
.book-box
  display flex
  flex-direction column
  align-items center
  img
    width 100%
    height px2rem(300)
  p
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
