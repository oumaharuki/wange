<template>
    <div class="book-read">
      <turn></turn>
    </div>
</template>

<script>
import turn from "components/turn"
    export default {
        name: "bookRead",
      components:{
        turn
      }
    }
</script>

<style scoped lang="stylus">
.book-read
  width  100vw
  height  100vh

</style>
