<template>
  <div class="shop-car">
    <div class="shop-car-wrapper" @click="toogleList">
      <div class="content-left">
        <span class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</span>
        <div class="vline"></div>
        <span class="desc">另需配送费￥{{deliveryPrice}}元</span>
      </div>
      <div class="content-right" :class="payClass" @click="pay">
        <span class="pay" :class="payClass">{{payDesc}}</span>
      </div>
    </div>
    <div class="circle0" @click.stop="toogleList"></div>
    <div class="circle1" :class="{'highlight':totalPrice>0}" @click.stop="toogleList">
      <i class="icon-shopping_cart"></i>
      <bubble class="bubble" :num="foodsNum" v-show="foodsNum>0"></bubble>
    </div>
    <div class="ball-container">
      <!-- <div class="ball">
        <div class="inner"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import Bubble from '../bubble/bubble.vue'

  const EVENT_TOOGLE_LIST = 'toggltList'
  const EVENT_LIST_EMPTY = 'listEmpty'

  export default {
    name: 'goods',
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectedFoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Bubble
    },
    computed: {
      totalPrice() {
        let price = 0
        this.selectedFoods.forEach((sfood) => {
          price += sfood.price * sfood.count
        })
        return price
      },
      payDesc() {
        if (this.totalPrice === 0) {
           return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      foodsNum() {
        let num = 0
        this.selectedFoods.forEach((sfood) => {
          num += sfood.count
        })
        return num
      }
    },
    methods: {
      drop(el) {
        const ball = document.createElement('div')
        ball.setAttribute('data-v-28f54322', '')
        ball.className = 'ball'
        const inner = document.createElement('div')
        inner.setAttribute('data-v-28f54322', '')
        inner.className = 'inner'
        ball.appendChild(inner)
        const ballContainer = document.getElementsByClassName('ball-container')[0]
        ballContainer.appendChild(ball)

        const rect = el.getBoundingClientRect()
        // console.log(rect)
        const sx = rect.left + 10
        const sy = window.innerHeight - rect.bottom + 10
        ball.style.left = `${sx}px`
        ball.style.bottom = `${sy}px`
        // ball.style.opacity = 1
        const x = rect.left - 24
        const y = window.innerHeight - rect.top - 44
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
      toogleList() {
        if (this.foodsNum > 0) {
          this.$emit(EVENT_TOOGLE_LIST)
          this.$bus.$emit(this.$event.FOODS_NUM, this.foodsNum)
        }
      },
      pay(e) {
        if (this.totalPrice < this.minPrice) {
          return
        }
        this.$createDialog({
          title: '支付',
          content: `您需要支付${this.totalPrice}元`
        }).show()
        e.stopPropagation()
      }
    },
    watch: {
      foodsNum(count) {
        if (count === 0) {
          this.$emit(EVENT_LIST_EMPTY)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../src/common/stylus/variable.styl'

  .shop-car
    position absolute
    width 100%
    bottom 0
    height 58px
    background transparent
    z-index 999
    .circle0
      position absolute
      bottom 0
      left 12px
      width 58px
      height 58px
      border-radius 50%
      background-color #07111B
    .circle1
      position absolute
      bottom 7px
      left 20px
      width 43px
      height 43px
      border-radius 50%
      background-color #333333
      text-align center
      line-height 48px
      color rgba(255,255,255,0.4)
      font-size $fontsize-large-xxx
      &.highlight
        color #FFFFFF
        background-color $color-blue
    .bubble
      position absolute
      top -5px
      right -3px
    .shop-car-wrapper
      margin-top 10px
      // width 100%
      height 48px
      background-color #07111B
      display flex
      .content-left
        flex 1
        .price
          display inline-block
          vertical-align: top
          margin-left 80px
          height 48px
          line-height 48px
          font-weight 700
          font-size: $fontsize-large
          color rgba(255,255,255,0.4)
          &.highlight
            color #FFFFFF
        .vline
          display inline-block
          vertical-align: top
          margin-left 12px
          margin-right 12px
          margin-top 8px
          width 1px
          height 32px
          background-color rgba(255,255,255,0.1)
        .desc
          display inline-block
          vertical-align: top
          height 48px
          line-height 48px
          font-size: $fontsize-small-s
          color rgba(255,255,255,0.4)
          letter-spacing 1px
      .content-right
        flex 0 0 105px
        width 105px
        height 100%
        background-color $color-dark-grey
        text-align center
        &.not-enough
          background: $color-dark-grey
        &.enough
          background: $color-green
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-weight: 700
          font-size: $fontsize-small
          color rgba(255,255,255,0.4)
          &.not-enough
            color rgba(255,255,255,0.4)
          &.enough
            color: $color-white
    .ball-container
      pointer-events none
      .ball
        position absolute
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          transition: all 0.4s linear
          width 16px
          height 16px
          border-radius: 50%
          background: $color-blue
</style>
