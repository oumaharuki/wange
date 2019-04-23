<template>
	<div>
		<div class="book-des">
          <div class="des">
            <img :src="statics + des.cover" alt>
            <div>
              <p class="title">{{des.title}}</p>
              <p>
                <Icon type="md-contact"/>
                {{des.author}}
              </p>
              <p v-if='des.rating'>
                {{des.rating && des.rating.score.toFixed(2)}}分</p>
              <p>{{des.minorCateV2 || des.cat}}</p>
            </div>
          </div>
          <div class="btn">
            <p>
              <Button type="primary" @click='beginReady'>开始阅读</Button>
            </p>
            <p>
              <Button @click='addBookCase'>加入书架</Button>
            </p>
          </div>
          <p>{{des.shortIntro || des.longIntro}}</p>
        </div>
        <Divider/>
        <p class="last-chapter">{{des.lastChapter}}</p>
        <slot></slot>
	</div>
</template>
<script>
import { cats } from "api/cats"
import { statics } from "api"
import { openDB, addData, closeDB } from 'api/indexedDB.js'
export default {
  name: 'book-detail',
  data() {
  	return {
  	  statics,
  	  chapters: []
  	}
  },
  props: {
  	des:{
  	  type: Object,
  	  default: {}
  	}
  },
  methods: {
  	beginReady() {
      this.$router.push({path: `/ready/${this.des._id}/${this.des.title}`})
  	},
  	addBookCase() {
  	  // this.getChapters().then(() => {
  	  // 	this.dbHandle()
  	  // }, () => {
  	  // 	this.$Message.error('Data acquisition failed!')
  	  // })
      this.dbHandle()
    },
    dbHandle() {    
      let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB

      if (!indexedDB) {
        window.alert('您的设备不支持该功能')
        return
      }

      openDB(2.0).then((db) => {
        this.db = db
        addData({
          db: this.db,
          table: 'bookcase',
          tableSon: { '_id': this.des._id, cover: this.des.cover, title: this.des.title },
          keyPath: '_id'
        })
        
        // this.chapters.map((item, index) => {
        //   this.getContent(item.link).then(res => {
        //     addData({
        //       db: this.db,
        //       table: 'bookcontent',
        //       tableSon: { link: item.link, bookId: this.des._id, title: item.title, content: res.body },
        //       keyPath: 'link'
        //     }).then(() => {
        //       if (index === this.chapters.length - 1) {
        //       	closeDB(db)
        //       }
        //     })
        //   })
        // })
      })
    }
  }
}
</script>
<style lang='stylus'>
.book-des {
  .des {
    position: relative;
    padding: 0 0.5rem;

    img {
      width: 4rem;
    }

    div {
      position: absolute;
      top: 0;
      left: 5rem;
      right: 0.5rem;
      bottom: 0;
      p{
        margin .2rem 0;
      }
    }
    .title{
      font-size 1rem;
      margin 0;
    }
  }

  .btn {
    text-align: center;
    display: flex;

    p {
      flex: 1;
    }
  }

  > p {
    // text-indent: 1.4rem;
    padding: 0.5rem;
  }
}

.last-chapter{
  padding: 0 .5rem;
}
</style>