<template>
    <div class="turn-box" id="turn-box">
      <div><span class="text">Page 1</span></div>
      <div><span class="text">Page 2</span></div>
      <div><span class="text">Page 3</span></div>
    </div>
</template>

<script>
  // import $ from 'jquery';
  import 'assets/js/turn.min';
    export default {
        name: "turn",
      mounted(){
        $('#turn-box').turn({
          width: $('#turn-box').width(),
          height: $('#turn-box').height(),
          autoCenter: false,
          display: 'single',
          gradients: true,
          // ... plus any extra option you need
        });
      },
      methods:{
          init(){

          }
      }
    }
</script>

<style scoped lang="stylus">
.turn-box
  width  100vw
  height  100vh
  div
    background red
</style>
