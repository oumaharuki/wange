<template>
  <div style="">
    <div id='turn-hgz' :style="{'font-size': txtWidth + 'px', 'line-height': lineHeight + 'px',height: '100%'}">
      <div class="content" v-for="(item, index) in page" style="padding: 0;height: 100%" :style="{background: 'url('+img+')'}">
        <div :style="{'line-height': lineHeight + 'px', 'padding': '30px 20px', 'height': '100%'}" v-html="item">
        </div>
      </div>
    </div>
    <div class="touchPage" @click="pageTouch">

    </div>
    <transition name="menu-top">
      <div class="menu-top menu" v-if="menuFlag">
        <div class="menu-title">
          <Icon type="ios-arrow-back" @click="back" size='18'/>
          <span>{{title}}</span>
        </div>
      </div>
    </transition>
    <transition name="menu-bottom">
      <div class="menu-bottom menu" v-if="menuFlag">
        <div @click='showMenu'>
          目录
        </div>
        <div @click='seeProgress'>
          进度
        </div>
        <div @click="setClick">
          设置
        </div>
        <div @click='setCache'>
          缓存
        </div>
        <div>
          夜间
        </div>
      </div>
    </transition>
    <!-- 设置 -->
    <transition name="set-font">
      <div class="set-font menu" v-if="setFontFlag">
        <h1>字体大小</h1>
        <div class="font-slider">
          <span style="width: 50px;font-size: 16px" @click="fontSliderMinus">A-</span>
          <Slider v-model="fontSlider" :step="1" :max="40" :min="12" style="flex: 1;" @on-change="fontSliderChange"></Slider>
          <span style="width: 50px;font-size: 16px" @click="fontSliderAdd">A+</span>
        </div>
        <div class="set-img">
          <span v-for="item in imgs" :key="item.id" style="position: relative" @click="backgroundClick(item)">
            <img :src="item.url" alt="" :class="{'active':item.url==img}">
            <Icon type="ios-checkmark" :class="['checkmark',{'active':item.url==img}]"/>
          </span>
        </div>
      </div>
    </transition>
    <!-- 目录 -->
    <transition name='set-font' v-if='menuShow'>
      <div class="set-menu">
        <chapters :chapter=chapter></chapters>
      </div>
    </transition>
    <!-- 进度 -->
    <transition name='set-font' v-if='progressShow'>
      <div class="set-font menu" style="height: 80px;">
        <p class="cover-progress"></p>
        <h1>{{chapter[current].title}}</h1>
        <Slider v-model="current" :step="1" :max="chapter.length" :min="0" style="padding: 0 10px;"></Slider>
      </div>
    </transition>
    <!-- 缓存 -->
    <transition name='set-font' v-if='cacheShow'>
      <div class="set-cache">
        <div>
          <p>共{{chapter.length}}章，已缓存{{alreadyCache}}章</p>
          <p @click='cacheAfterSome'>缓存后面一百五十章</p>
          <p @click='cacheAfterAll'>缓存后面全部</p>
          <p @click='cacheAll'>缓存全部</p>
          <p @click='cacheCancel'>取消</p>
        </div>
      </div>
    </transition>
    <!-- 上下章跳转 -->
    <transition name='set-font' v-if="showLinkBtn && !menuFlag">
      <div class="last-page">
        <p class="pre" v-if='current !== 0'>
          <span @click='preChapter'>上一章</span>
        </p>
        <p class="next" v-if='current !== chapter.length'>
          <span @click='nextChapter'>下一章</span>
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
  import 'assets/js/turn.min'
  import {Slider} from "iview"
  import img1 from "../assets/img/ready1.jpg";
  import img2 from "../assets/img/ready2.jpg"
  import img3 from "../assets/img/ready3.jpg"
  import img4 from "../assets/img/ready4.jpg"
  import { cats } from "api/cats"
  import { bookDes, atoc, chapterApi } from "api"
  import Chapters from "components/chapters"
  import { openDB, addData, closeDB, getDataAll } from 'api/indexedDB.js'
  const imgs=[
    {id:1,url:img1},
    {id:2,url:img2},
    {id:3,url:img3},
    {id:4,url:img4},
  ]
  export default {
    name: 'turn-hgz',
    data() {
      return {
        screenHeight: 0,
        screemWidth: 0,
        page: [],
        menuFlag: false,//菜单flag
        fontSlider:this.txtWidth,
        img:img1,
        imgs:imgs,
        setFontFlag:false,
        bookId: '',
        chapter: [],
        menuShow: false,
        title: '',
        showLinkBtn: false,
        current: -1,
        progressShow: false,
        cacheShow: false,
        alreadyCache: 0
      }
    },
    props: {
      txtWidth: {
        type: Number,
        default: 12
      },
      lineHeight: {
        type: Number,
        default: 18
      },
      content:{
        type: String,
        default:''
      }
    },
    deactivated() {
      window.history.go(0)
    },
    components:{
      Slider,
      Chapters
    },
    computed:{
      turnPage:()=>$('#turn-hgz'),
    },
    created(){
      this.init()
    },
    mounted() {
      this.title = this.$route.params.title
      this.bookId = this.$route.params.id
      this.getChapters()
      this.initTurn()
    },
    methods:{
      initPage(detail) {
        // this.data = detail
        (async () => {
          await this.init()
          this.$nextTick(() => {
            this.initTurn()
          })
        })()
      },
      initTurn() {
        // console.log(this.data, 'turn data')
        // console.log(this.page, 'turn page')
         $('#turn-hgz').turn({
          width: this.turnPage.width(),
          height: this.turnPage.height(),
          autoCenter: false,
          display: 'single',
          gradients: true
        })
      },
     init(){
       this.pages()
       this.initBackground()
     },
      initBackground(){
       let url=localStorage.getItem("readBackground");
       if(url){
        this.img=url;
       }
      },
      pages(){
        this.screenHeight = document.body.scrollHeight;
        this.screemWidth =document.body.scrollWidth;
        const col = Math.floor((this.screemWidth - 40) / this.txtWidth)
        const row = Math.floor((this.screenHeight-60)/ this.lineHeight)
        let data=this.content;
        let page=this.makePageAry(data,col);
        let pageNum=Math.ceil(page.length/row);
        let pageStrs=[];
        for(let i=1;i<=pageNum;i++){
          pageStrs.push(page.slice((i-1)*row,i*row).join(""))
        }
        console.log(pageStrs);
        this.page=pageStrs;
      },
      makePageAry(data,col){
        data=data.replace(/ /g,"");
        data="  "+data;
        data=data.replace(/\n/g,`\n  `);
        console.log(/\n/.test(data));
        let page=[];
        let start=0;
        for(let i=0;;i++){
          let w=0;
          let num=0;
          if(start>=data.length){
            break;
          }
          for(let j=0;j<=col;j++){
            if(/\n/.test(data[start+num])){
              let str=data.slice(start,start+num)+`</br>`;
              start+=num+1;
              page.push(str);
              break;
            }
            w+=this.txtWidth;
            if(w<this.screemWidth - 40){
              num++;
            }else {
              let str=data.slice(start,start+num);
              start+=num;
              page.push(str);
              break;
            }
          }
        }
        return page.map(item=>{
          return item.replace(/ /g,`&nbsp;&nbsp;`);
        });
      },
      pageTouch(e){
        const wcenter=this.screemWidth/2;
        const wleft=wcenter/3;
        const wright=wcenter+wcenter/3;
        if(e.clientX<=wleft){
          if(this.setFontFlag || this.menuFlag || this.menuShow || this.progressShow || this.cacheShow){
            this.setFontFlag=false;
            this.menuFlag=false;
            this.menuShow = false
            this.progressShow = false
            this.cacheShow = false
            return
          }
          this.pagePre();
        }
        if(e.clientX>=wright){
          if(this.setFontFlag||this.menuFlag || this.menuShow || this.progressShow || this.cacheShow){
            this.setFontFlag=false;
            this.menuFlag=false;
            this.menuShow = false
            this.progressShow = false
            this.cacheShow = false
            return
          }
          this.pageNext();
        }
        const ycenter=this.screenHeight/2;
        const ytop=ycenter/3;
        const ybottom=ycenter+ycenter/3;
        if(e.clientY<=ytop&&e.clientX>wleft&&e.clientX<wright){
          if(this.setFontFlag||this.menuFlag || this.menuShow || this.progressShow || this.cacheShow){
            this.setFontFlag=false;
            this.menuFlag=false;
            this.menuShow = false
            this.progressShow = false
            this.cacheShow = false
            return
          }
          this.pagePre();
        }
        if(e.clientY>=ybottom&&e.clientX>wleft&&e.clientX<wright){
          if(this.setFontFlag||this.menuFlag || this.menuShow || this.progressShow || this.cacheShow){
            this.setFontFlag=false;
            this.menuFlag=false;
            this.menuShow = false
            this.progressShow = false
            this.cacheShow = false
            return
          }
          this.pageNext();
        }
        if(e.clientY<ybottom&&e.clientY>ytop&&e.clientX>wleft&&e.clientX<wright){
          if(this.setFontFlag){
            this.setFontFlag=false;
          }else if (this.menuShow) {
            this.menuShow = false;
          } else if (this.progressShow) {
            this.progressShow = false
          } else if (this.cacheShow) {
            this.cacheShow = false
          } else {
            this.menuFlag=!this.menuFlag;
          }

        }
      },
      pageNext(){
        let curNum=this.turnPage.turn('page');
        if(curNum==this.turnPage.turn('pages')){
          this.$Message.info('已经是最后一页')
          this.showLinkBtn = true
        }
        this.turnPage.turn('next');
      },
      pagePre(){
        this.showLinkBtn = false
        let curNum=this.turnPage.turn('page');
        if(curNum==1){
          this.$Message.info('已经是第一页')
        }
        this.turnPage.turn('previous');
      },
      fontSliderChange(data){
        window.localStorage.setItem('font-zise', data)
        window.history.go(0)
      },
      fontSliderMinus(){
       this.fontSlider--;
      },
      fontSliderAdd(){
        this.fontSlider++;
      },
      backgroundClick(item){
        localStorage.setItem("readBackground",item.url);
        this.img=item.url;
      },
      setClick(){
       this.setFontFlag=true;
       this.progressShow = false
       this.menuShow = false
       this.cacheShow = false
      },
      showMenu() {
        this.setFontFlag = false
        this.progressShow = false
        this.menuShow = true
        this.cacheShow = false
      },
      seeProgress() {
        this.progressShow = true
        this.setFontFlag = false
        this.menuShow = false
        this.cacheShow = false
      },
      setCache() {
        this.cacheShow = true
        this.progressShow = false
        this.setFontFlag = false
        this.menuShow = false
        openDB(2.0).then(db => {
          getDataAll(db, 'cache').then((data) => {
            data.map(item => {
              if (item.bookId === this.bookId) {
                this.alreadyCache++
              }
            })
          })
          closeDB(db)
        })
      },
      cacheAfterSome() {
        // 缓存后面一百五十章
        if (this.alreadyCache === this.chapter.length) {
          return
        }
        openDB(2.0).then(db => {
          for (let i = this.current + 1; i <= this.current + 150; i++) {
            this.cacheDB(this.chapter[i], db)
          }
        })
      },
      cacheAfterAll() {
        // 缓存后面全部
        if (this.alreadyCache === this.chapter.length) {
          return
        }
        openDB(2.0).then(db => {
          for (let i = this.current + 1; i < this.chapter.length; i++) {
            this.cacheDB(this.chapter[i], db)
          }
        })
      },
      cacheAll() {
        // 缓存全部
        if (this.alreadyCache === this.chapter.length) {
          return
        }
        openDB(2.0).then(db => {
          this.chapter.map(item => {
            this.cacheDB(item, db)
          })
        })
      },
      cacheDB(item, db) {
        // 缓存
        let link = item.link
        if (/(\.txt)$/.test(link)) {
          link = link.replace(/http:\//, 'http:%2F').replace(/\?/, '%3F')
        }
        cats(chapterApi + link).then(chapterDes => {
          if (chapterDes.ok) {
            addData({
              db: db,
              table: 'cache',
              tableSon: { 'id': item.link, 'body': chapterDes.chapter.body, 'bookId': this.bookId },
              keyPath: 'id'
            }).then(() => {
            }, () => {
              this.$Message.error(`${item.title}缓存失败`)
            })
          }
        })
      },
      cacheCancel() {
        this.cacheShow = false
      },
      getChapters() {
        // 获取章节
        return new Promise((resolve, reject) => {
          cats(`${atoc}/${this.bookId}?view=chapters`).then(res => {
            if (res.ok) {
              this.chapter = res.mixToc.chapters
              this.getCurrentChapter()
              resolve()
            } else {
              reject()
            }
          })
        })
      },
      back() {
        window.history.go(-1);
      },
      preChapter() {
        if (this.current !== -1) {
          window.localStorage.setItem('ready-link', this.chapter[this.current - 1].link)
          window.history.go(0)
        } else {
          this.$Message.error('对方不想说话，并且向你抛出了一个异常')
        }
      },
      nextChapter() {
        if (this.current !== -1) {
          window.localStorage.setItem('ready-link', this.chapter[this.current + 1].link)
          window.history.go(0)
        } else {
          this.$Message.error('对方不想说话，并且向你抛出了一个异常')
        }
      },
      getCurrentChapter() {
        const link = window.localStorage.getItem('ready-link')
        this.chapter.filter((item, index) => {
          if (item.link === link) {
            this.current = index
          }
          return item.link === link
        })
      }
    }
  }
</script>
<style lang='stylus'>
#turn-hgz
  width  100vw
  height  100vh !important
  position relative
  .content
    padding 0 20px
    br {
      height 0px !important;
    }
.touchPage
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 100
.menu-top
  top 0
  .menu-title {
    line-height: 50px;
    color: #fff;
  }
.menu
  position fixed
  left 0
  width 100%
  height 50px
  background #000
  z-index 101
.menu-bottom
  bottom 0
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  align-content center
  color #fff
  div
    text-align center
    flex 1
.set-menu
  position absolute
  width 50%
  left 0
  top: 50px
  bottom: 50px;
  overflow-x: hidden
  overflow-y: auto
  background #000
  z-index 200
.set-cache
  position fixed
  top 0;
  height 100%;
  left 0;
  width 100%;
  z-index 200
  background rgba(0, 0, 0, 0.5)
  div
    background #fff
    position absolute;
    top 50%;
    left 20px;
    right 20px;
    transform: translateY(-50%);
    p
      padding 10px;
      border-bottom 0.001rem solid #f1f2f7
      &:first-of-type
        font-weight: bolder
        font-size .9rem

.set-font
  bottom 50px
  height 200px
  display flex
  flex-direction column
  justify-content space-around
  h1
    text-align center
    font-size 18px
    color #fff
    line-height 30px
  .font-slider
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    span
      text-align center
  .set-img
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    padding 0 10px
    overflow-x auto
    img
      width 90px
      height 50px
      border-radius 3px
      &.active
        border 1px solid red
        box-sizing border-box
    .checkmark
      text-align center
      color red
      font-size 24px
      position absolute
      top 50%
      left 50%
      margin-left -12px
      margin-top -12px
      display none
      &.active
        display inline

.menu-bottom-enter-active,.menu-top-enter-active,.set-font-enter-active {
  transition: all .3s ease;
}
.menu-bottom-leave-active,.menu-top-leave-active {
  transition: all .3s ease;
}
.set-font-leave-active {
  transition: all .01s ease;
}
.menu-bottom-enter-to{
    bottom 0;
}
.menu-bottom-enter {
  bottom -50px;
}
.menu-bottom-leave{
  bottom 0;
}
.menu-bottom-leave-to{
  bottom -50px;
}
.menu-top-enter-to{
  top 0;
}
.menu-top-enter {
  top -50px;
}
.menu-top-leave{
  top 0;
}
.menu-top-leave-to{
  top -50px;
}
.set-font-enter-to{
  /*bottom 50px;*/
  opacity 1
}
.set-font-enter {
  /*bottom 0;*/
  opacity 0
}
.set-font-leave{
  /*bottom 50px;*/
  opacity 1
}
.set-font-leave-to{
  /*bottom 0;*/
  opacity 0
}

.last-page{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  z-index: 2000;
  p {
    flex: 1;
    line-height: 3rem;
    span{
      text-decoration: underline;
      padding: 1rem;
    }
  }
  .next {
    text-align: right;
  }
}
.cover-progress{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1111;
}
</style>
