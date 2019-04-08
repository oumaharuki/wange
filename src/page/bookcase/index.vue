<template>
    <div class="bookcase-box">
      <Scroll class="scroll-ui">
        <div class="bookcase-list">
        	<book-item v-for="(item, index) in bookcase" :key="index"
                   :data="item" class="recommend-book" :class="(index+1)%4==0?'no-margin':''">
        	</book-item>
        	<p v-if='bookcase.length === 0' class="empty">书架空空如也~</p>
        </div>
      </Scroll>
    </div>
</template>
<script>
import {statics} from "api"
import {getDataAll, openDB, closeDB} from 'api/indexedDB'
import BookItem from "components/bookItem"
export default {
  name: 'bookcase',
  data() {
  	return {
  	  bookcase: [],
  	  statics
  	}
  },
  components: {
  	BookItem
  },
  created() {
  	openDB(2.0).then(db => {
  	  getDataAll(db, 'bookcase').then(res => {
  	  	this.bookcase = res
  	  	closeDB(db)
  	  })
  	})
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
  display flex
  flex-direction row
  flex-wrap wrap
  margin-top px2rem(60)
  justify-content space-around
  .recommend-book
    width px2rem(230)

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
