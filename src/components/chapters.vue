<template>
  <div class="chapters">
  	<p v-for="(item, index) in chapter" :key="index" @click="getChapter(item)">{{item.title}}</p>
  </div>
</template>
<script>
  export default {
  	props: {
  	  chapter: {
  	  	type: Array,
  	  	default: []
  	  }
  	},
  	methods: {
  	  getChapter(item) {
	    window.localStorage.setItem('ready-link', item.link)
	    this.$router.push({path: `/ready`})
	  }
  	}
  }
</script>
<style lang="stylus">
.chapters{
  padding 0 .5rem;
  p{
    margin .5rem 0;
  }
}
</style>