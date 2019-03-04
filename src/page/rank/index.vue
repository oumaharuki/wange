<template>
    <div>
        <top>
            <slot>排行榜</slot>
        </top>
    </div>
</template>
<script>
import Top from 'components/top-return'
export default {
  name: 'rank',
  data() {
    return{}
  },
  components: {
    Top
  }
}
</script>
<style lang="stylus">

</style>
