<template>
  <div class="carcontrol">
    <transition name="move">
      <div class="remove icon-remove_circle_outline" v-show="food.count>0" @click.stop="remove"></div>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="add icon-add_circle" @click.stop="add"></div>
  </div>
</template>

<script>
  const EVENT_ADD = 'add'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      add(event) {
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit(EVENT_ADD, event.target)
      },
      remove() {
        if (this.food.count > 0) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../src/common/stylus/variable.styl'

  .carcontrol
    display flex
    .remove
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: $fontsize-large-xxx
      color: $color-blue
    .move-enter-active,.move-leave-active
      transition all 0.4s linear
    .move-enter
      transform translateX(30px) rotate(180deg)
      opacity 0
    .move-leave-to
      transform translateX(30px) rotate(180deg)
      opacity 0
    .count
      width: 12px
      line-height: 35px
      text-align: center
      font-size: $fontsize-small-s
      color: $color-grey
    .add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: $fontsize-large-xxx
      color: $color-blue
</style>
