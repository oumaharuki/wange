<template>
    <div class="bookcase-box">
      <Scroll class="scroll-ui">
        <div class="bookcase-list">
          <div v-for="item in bookcase" :key="item._id" @click='getReady(item)'>
            <img :src= "statics + item.cover">
            <p>{{item.title}}</p>
          </div>
        	<p v-if='bookcase.length === 0' class="empty">书架空空如也~</p>
        </div>
      </Scroll>
    </div>
</template>
<script>
import {statics} from "api"
import {getDataAll, openDB, closeDB} from 'api/indexedDB'
export default {
  name: 'bookcase',
  data() {
  	return {
  	  bookcase: [],
  	  statics
  	}
  },
  created() {
  	openDB(2.0).then(db => {
  	  getDataAll(db, 'bookcase').then(res => {
  	  	this.bookcase = res
  	  	closeDB(db)
  	  })
  	})
  },
  methods: {
    getReady(item) {
      this.$router.push({path: `/ready/${item._id}/${item.title}`})
    }
  }
}
</script>
<style lang="stylus">
@import "../../assets/common.styl"
.bookcase-box {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
}

.ivu-scroll-container
  height: 100% !important;
  
.bookcase-list
  div {
    width: 33.33%;
    display: inline-block;
    text-align: center;
    padding: 0 0 .8rem 0;
    img{
      width: 5rem;
    }
  }

.scroll-ui {
  position: absolute;
  top: 0;
  left: .8rem;
  right: .8rem;
  bottom: 0;
  z-index: 1;
}
.empty{
  color: #99989b;
  text-align: center;
}
</style>
