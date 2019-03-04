<template>
    <div>
        <top>
            <slot>公告</slot>
        </top>
    </div>
</template>
<script>
import Top from 'components/top-return'
export default {
  name: 'notice',
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
