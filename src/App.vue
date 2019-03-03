<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" @click="hanldClick"> -->
    <router-view/>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import {catsApi} from "api"
import {cats} from "api/cats"
export default {
  name: 'App',
  computed:{
    /*
    * vuex get data
    * */
    ...mapGetters(["data"])
  },
  created(){
    this.set("aaa")
    this.init()
  },
  mounted(){
    console.log("mounted",this.data);
  },
  methods:{
    /*
   * vuex get async method
   * */
    ...mapActions({
      set:"set"
    }),
    hanldClick(){
      this.set("aaa")
    },
    async init(){
      await cats(catsApi).then((res)=>{
        console.log(res);
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.demo
  color aqua
</style>
