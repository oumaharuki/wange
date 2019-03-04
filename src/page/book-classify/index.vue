<template>
    <div>
        <top>
            <slot>分类</slot>
        </top>
    </div>
</template>
<script>
import Top from 'components/top-return'
export default {
  name: 'bookClassify',
  components: {
    Top
  }
}
</script>
<style lang="stylus">

</style>
