<template>
  <transition name="move">
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" />
            <div class="back" @click="hideFood"><i class="icon-arrow_lift"></i></div>
          </div>
          <div class="content">
            <h1 class="title">{{ food.name }}</h1>
            <div class="detail">
              <span class="sell-count">月售{{ food.sellCount }}份</span>
              <span class="rating">好评率{{ food.rating }}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{ food.price }}</span>
              <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
            </div>
            <div class="cart-control-wrapper"><car-control @add="add" :food="food"></car-control></div>
          </div>
          <split></split>
          <div class="content">
            <h1 class="title2">商品介绍</h1>
            <div class="info">{{ food.info }}</div>
          </div>
          <split></split>
          <div class="content"><h1 class="title2">商品评价</h1></div>
        </div>
        <div class="ball-container">
          <!-- <div class="ball">
            <div class="inner"></div>
          </div> -->
        </div>
        <transition name="fade">
          <div class="content-mask" v-show="contentMaskVisivle"></div>
        </transition>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import popupMixin from '../../common/mixins/popup.js'
import Split from '../split/split.vue'
import CarControl from '../car-control/car-control.vue'

const EVENT_SHOW = 'show'

export default {
  name: 'food',
  mixins: [popupMixin],
  data() {
    return {
      contentMaskVisivle: false
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    })

    this.$bus.$on(this.$event.FOODS_NUM, this._onFoodsNum)
  },
  beforeDestroy() {
    this.$bus.$off(this.$event.FOODS_NUM, this._onFoodsNum)
  },
  mounted() {},
  methods: {
    hideFood() {
      this.hide()
      this.$bus.$emit(this.$event.FOOD_VISIBLE)
    },
    add(target) {
      // this.$bus.$emit(this.$event.FOOD_DROP, target)
      this.drop(target)
    },
    drop(el) {
      const ball = document.createElement('div')
      ball.setAttribute('data-v-4ddfd40f', '')
      ball.className = 'ball'
      const inner = document.createElement('div')
      inner.setAttribute('data-v-4ddfd40f', '')
      inner.className = 'inner'
      ball.appendChild(inner)
      const ballContainer = document.getElementsByClassName('ball-container')[1]
      ballContainer.appendChild(ball)

      const rect = el.getBoundingClientRect()
      // console.log(rect)
      const sx = rect.left
      const sy = rect.top
      ball.style.left = `${sx}px`
      ball.style.top = `${sy}px`
      // ball.style.opacity = 1
      const x = rect.left - 5
      const y = window.innerHeight - rect.top
      ball.style.transform = ball.style.webkitTransform = `translate(0,${y}px)`
      inner.style.transform = inner.style.webkitTransform = `translate(-${x}px,0)`
      // ball.style.opacity = 0

      let vm = this
      ball.addEventListener('transitionend', () => {
        if (vm.$si.options.debug) {
          console.log('transitionend')
        }
        ball.removeChild(inner)
        ballContainer.removeChild(ball)
      })
    },
    _onFoodsNum(n) {
      let _elfood = document.getElementsByClassName('food')[0]
      if (this.contentMaskVisivle) {
        _elfood.style.bottom = '57px'
      } else {
         const _h = 88 + 48 * (n - 1)
          _elfood.style.bottom = _h + 20 + 'px'
      }
      this.contentMaskVisivle = !this.contentMaskVisivle
    }
  },
  components: {
    Split,
    CarControl
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../src/common/stylus/variable.styl'

.food
  transition: all .3s ease-in-out
  position fixed
  left 0
  bottom 57px
  right 0
  top 0
  background-color #ff
  &.move-enter, &.move-leave-active
    transform translate3d(100%, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition all 0.4s ease-in-out
  .image-header
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      left 0
      top 0
      width 100%
      height 100%
    .back
      position absolute
      top 10px
      left 0
      .icon-arrow_lift
        display block
        padding 10px
        font-size $fontsize-large-xx
        color $color-white
  .content
    position relative
    padding 18px
    .title
      line-height 14px
      margin-bottom 8px
      font-size $fontsize-medium
      font-weight 700
      color $color-dark-grey
    .detail
      margin-bottom 18px
      line-height 10px
      height 10px
      .sell-count, .rating
        font-size $fontsize-small-s
        color $color-light-grey
      .sell-count
        margin-right 12px
    .price
      line-height 24px
      font-weight 700
      .now
        margin-right 8px
        font-size 14px
        color $color-red
      .old
        text-decoration line-through
        font-size $fontsize-small-s
        color $color-light-grey
    .cart-control-wrapper
      position absolute
      right 12px
      bottom 12px
    .title2
      color $color-dark
      font-size $fontsize-medium
    .info
      line-height 20px
      padding 8px 8px 6px 8px
      font-size $fontsize-small-s
      color $color-grey
  .ball-container
    pointer-events none
    .ball
      position absolute
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        transition all 0.4s linear
        width 16px
        height 16px
        border-radius 50%
        background $color-blue
  .content-mask
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #25262d
    opacity 0.4
    &.fade-enter, &.fade-leave-to
      opacity 0
    &.fade-enter-active, &.fade-leave-active
      transition all 0.3s ease-in-out
</style>
