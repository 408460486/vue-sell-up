<template>
  <div id="app"><VHeader></VHeader></div>
</template>

<script>
import VHeader from './components/v-header/v-header.vue';

export default {
  name: 'app',
  components: {
    VHeader
  }
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 0px
</style>
