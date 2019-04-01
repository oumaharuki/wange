<template>
  <div id='turn-hgz' :style="{'font-size': txtWidth + 'px', 'line-height': lineHeight + 'px'}">
    <div class="content" style="line-height: 21px;" v-html="page">

    </div>
  </div>
</template>
<script>
  import 'assets/js/turn.min'
  export default {
    name: 'turn-hgz',
    data() {
      return {
        screenHeight: 0,
        screemWidth: 0,
        page: []
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
      this.screenHeight = window.innerHeight
      this.screemWidth = window.innerWidth
      const col = Math.floor((this.screemWidth - 40) / this.txtWidth)
      const row = Math.floor(this.screenHeight / this.lineHeight)
      let data=this.data;
      data="    "+data;
      data=data.replace(/↵/g,`↵</div><div>    `);
      let page=[];
      let start=0;
      for(let i=0;i<row;i++){
        let w=0;
        let num=0;
        for(let j=0;j<=col;j++){
          console.log(/↵/.test(data[start + num]));
          if(/↵/.test(data[start+num])){
            let str=data.slice(start,start+num);
            console.log(str);
            start+=num+1;
            page.push(str);
            break;
          }
          w+=this.txtWidth;
          num++;
          if(w>=this.screemWidth - 40){
            let str=data.slice(start,start+j);
            start+=num;
            page.push(str);
            break;
          }
        }
      }
      console.log(page);
      this.page=page.join("").replace(/ /g,`&nbsp`);

    },
    mounted() {
      this.data && this.page.length > 1 && $('#turn-hgz').turn({
        width: $('#turn-hgz').width(),
        height: $('#turn-hgz').height(),
        autoCenter: false,
        display: 'single',
        gradients: true
      })
    },
    activated() {

    }
  }
</script>
<style lang='stylus'>
#turn-hgz
  width  100vw
  height  100vh !important
  position relative
  background #fff
  .content
    padding 0 20px
    background #fff
    br {
      height 0px !important;
    }
</style>
