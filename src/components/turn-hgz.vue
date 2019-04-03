<template>
  <div style="">
    <div id='turn-hgz' :style="{'font-size': txtWidth + 'px', 'line-height': lineHeight + 'px',}"
    >
      <div class="content" v-for="item in page" style="padding: 0" :style="{background: 'url('+img+')'}">
        <div style="line-height: 21px;padding: 30px 20px;height: 100%" v-html="item">

        </div>
      </div>
    </div>
    <div class="touchPage" @click="pageTouch">

    </div>
    <transition name="menu-top">
    <div class="menu-top menu" v-if="menuFlag">


    </div>
    </transition>
    <transition name="menu-bottom">
    <div class="menu-bottom menu" v-if="menuFlag">
        <div>
          目录
        </div>
      <div>
          进度
        </div>
      <div @click="setClick">
          设置
        </div>
      <div>
        缓存
      </div>
      <div>
        夜间
      </div>
    </div>
    </transition>
    <transition name="set-font">
    <div class="set-font menu" v-if="setFontFlag">
      <h1>字体大小</h1>
      <div class="font-slider"><span style="width: 50px;font-size: 16px" @click="fontSliderMinus">A-</span>
        <Slider v-model="fontSlider" :step="1" :max="40" :min="12" style="flex: 1;" @on-change="fontSliderChange"></Slider>
        <span style="width: 50px;font-size: 16px" @click="fontSliderAdd">A+</span></div>
      <div class="set-img">
        <span v-for="item in imgs" :key="item.id" style="position: relative" @click="backgroundClick(item)">
          <img :src="item.url" alt="" :class="{'active':item.url==img}">
          <Icon type="ios-checkmark" :class="['checkmark',{'active':item.url==img}]"/>
        </span>
      </div>
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
        menuFlag:false,//菜单flag
        fontSlider:this.txtWidth,
        img:img1,
        imgs:imgs,
        setFontFlag:false
      }
    },
    props: {
      data: {
        type: String,
        default: ''
      },
      txtWidth: {
        type: Number,
        default: 12
      },
      lineHeight: {
        type: Number,
        default: 18
      }
    },
    created() {
     this.init()

    },
    components:{
      Slider
    },
    computed:{
      turnPage:()=>$('#turn-hgz'),
    },
    mounted() {
      this.data && this.page.length > 1 && $('#turn-hgz').turn({
        width: this.turnPage.width(),
        height: this.turnPage.height(),
        autoCenter: false,
        display: 'single',
        gradients: true
      })
    },
    activated() {

    },
    methods:{
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
        let data=this.data;
        let page=this.makePageAry(data,col);
        let pageNum=Math.ceil(page.length/row);
        let pageStrs=[];
        for(let i=1;i<=pageNum;i++){
          pageStrs.push(page.slice((i-1)*row,i*row).join(""))
        }
        this.page=pageStrs;
      },
      makePageAry(data,col){
        data=data.replace(/ /g,"");
        data="  "+data;
        data=data.replace(/↵/g,`↵  `);
        let page=[];
        let start=0;
        for(let i=0;;i++){
          let w=0;
          let num=0;
          if(start>=data.length){
            break;
          }
          for(let j=0;j<=col;j++){
            if(/↵/.test(data[start+num])){
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
          this.pagePre();
        }
        if(e.clientX>=wright){
          this.pageNext();
        }
        const ycenter=this.screenHeight/2;
        const ytop=ycenter/3;
        const ybottom=ycenter+ycenter/3;
        if(e.clientY<=ytop&&e.clientX>wleft&&e.clientX<wright){
          this.pagePre();
        }
        if(e.clientY>=ybottom&&e.clientX>wleft&&e.clientX<wright){
          this.pageNext();
        }
        if(e.clientY<ybottom&&e.clientY>ytop&&e.clientX>wleft&&e.clientX<wright){
          if(this.setFontFlag){
            this.setFontFlag=false;
          }else {
            this.menuFlag=!this.menuFlag;
          }
        }
      },
      pageNext(){
        let curNum=this.turnPage.turn('page');
        if(curNum==this.turnPage.turn('pages')){
          console.log("已经是最后一页");
        }
        this.turnPage.turn('next');
      },
      pagePre(){
        let curNum=this.turnPage.turn('page');
        if(curNum==1){
          console.log("已经是第一页");
        }
        this.turnPage.turn('previous');
      },
      fontSliderChange(data){
        console.log(data);
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
</style>
