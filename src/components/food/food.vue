<template>
  <transition name="move">
    <div class="food" v-show="visible">
       <cube-button @click="hideFood">close</cube-button>
    </div>
  </transition>
</template>

<script>
  import popupMixin from '../../common/mixins/popup.js'

  export default {
    name: 'food',
    mixins: [popupMixin],
    methods: {
      hideFood() {
        this.hide()
        this.$bus.$emit(this.$event.FOOD_VISIBLE, false)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../src/common/stylus/variable.styl'

  .food
    position fixed
    left 0
    bottom 57px
    right 0
    top: 0
    background-color #fff
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all .4s ease-in-out

</style>
