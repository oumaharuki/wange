<template>
    <div>
      <top>
        <slot>搜索</slot>
      </top>
      <div class="search">
        <Input v-model="searchStr" :on-change="onChange" style="flex: 1"></Input>
        <Button text="搜索"
         @click="search" style="margin-left: 10px"></Button>
      </div>
      <book-detail class='search-data' v-for='item in searchData' :des='item' :key='item.wordCount'>
        <p class="search-item-bottom"></p>
      </book-detail>
    </div>
</template>

<script>
  import Top from "components/top-return";
  import Input from "components/input";
  import Button from "components/button";
  import BookDetail from 'components/book-detail'
  import { searchApi} from "api";
  import { get } from "api/cats";
    export default {
        name: "search",
      components: {
        Top,
        Input,
        Button,
        BookDetail
      },
      data(){
          return {
            searchStr:"",
            searchData: []
          }
      },
      methods:{
        search(){
          console.log(this.searchStr);
          get(searchApi,{query:this.searchStr}).then(res=>{
            this.searchData = res.books
          })
        },
        onChange(){

        }
      }
    }
</script>

<style scoped lang="stylus">
.search
  display flex
  flex-direction row
  justify-content space-around
  padding 20px

.search-item-bottom {
  margin: 24px 0;
  height: .8rem;
  background: #f1f2f7;
}
</style>
