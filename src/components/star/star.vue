<template>
  <div class="star" :class="starType"><span v-for="(itemClass, index) in itemClasses" :key="index" class="star-item" :class="itemClass"></span></div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_OFF = 'off'
const CLS_HALF = 'half'

export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number,
      default: 0
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      if (isNaN(this.score) || this.score === 0) {
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
      } else {
        const temp = Math.floor(this.score * 2) / 2
        const hasXiaoshu = temp % 1 !== 0
        const zhengshu = Math.floor(temp)
        for (let i = 0; i < zhengshu; i++) {
          result.push(CLS_ON)
        }
        if (hasXiaoshu) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.star
  display flex
  align-items center
  justify-content center
  .star-item
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      background-size 20px 20px
      margin-right 22px
      &:last-child
        margin-right 0
      &.on
        bg-image('star48_on')
      &.off
        bg-image('star48_off')
      &.half
        bg-image('star48_half')
  &.star-36
    .star-item
      width 15px
      height 15px
      background-size 15px 15px
      margin-right 6px
      &:last-child
        margin-right 0
      &.on
        bg-image('star36_on')
      &.off
        bg-image('star36_off')
      &.half
        bg-image('star36_half')
  &.star-24
    .star-item
      width 10px
      height 10px
      background-size 10px 10px
      margin-right 3px
      &:last-child
        margin-right 0
      &.on
        bg-image('star24_on')
      &.off
        bg-image('star24_off')
      &.half
        bg-image('star24_half')
</style>
