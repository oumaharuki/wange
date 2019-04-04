<template>
    <button :style="{background:background,color:color}" @click="click">{{text}}</button>
</template>

<script>
    export default {
        name: "my-button",
      props:{
          text:{
            type:String,
            default:""
          },
        background:{
            type:String,
            default: "#000"
        },
        color:{
            type:String,
              default:"#fff"
        }
      },
      methods:{
        click(){
          this.$emit("click")
        }
      }
    }
</script>

<style scoped lang="stylus">
button
  padding 0 10px
  outline none
  border none
  border-radius 2px
</style>
