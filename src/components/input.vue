<template>
    <div>
      <input :type="type" class="input" :style="{borderBottomColor:color,fontSize:fontSize+'px'}" @blur="inputBlur" v-model="valueStr" >
      <input type="hidden" :value="value" @input="inputEmit">
    </div>
</template>

<script>
    export default {
        name: "my-input",
      props:{
          type:{
            type:String,
            default:"text"
          },
          color:{
            type:String,
            default:"red"
          },
        value:{
            default:""
        },
        fontSize:{
            type:Number,
            default:14
        }
      },
      data(){
        return{
          valueStr:this.value
        }
      },
      created(){
      },
      methods:{
        inputBlur(){
          this.inputEmit(this.valueStr)
        },
        inputEmit(value){
          this.$emit('input', value)
        }
      }
    }
</script>

<style scoped lang="stylus">
.input
  border-color transparent
  height 40px
  width 100%
</style>
