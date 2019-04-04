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
    </div>
</template>

<script>
  import Top from "components/top-return";
  import Input from "components/input";
  import Button from "components/button";
  import { searchApi} from "api";
  import { get } from "api/cats";
    export default {
        name: "search",
      components: {
        Top,
        Input,
        Button
      },
      data(){
          return {
            searchStr:""
          }
      },
      methods:{
        search(){
          console.log(this.searchStr);
          get(searchApi,{query:this.searchStr}).then(res=>{
            console.log(res);
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
</style>
