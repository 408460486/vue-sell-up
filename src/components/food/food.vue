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
          <div class="content">
            <h1 class="title2">商品评价</h1>
            <rating-select @select="onSelect" @toogle="onToogle" :ratings="ratings" :desc="desc" :selectType="selectType" :onlyContent="onlyContent"></rating-select>
          </div>
          <div class="hline"></div>
          <div class="content">
            <div class="ratings-wrapper">
              <ul v-show="computedRatings && computedRatings.length">
                <li v-for="(rating, index) in computedRatings" :key="index" class="rating-item border-bottom-1px">
                  <div class="user">
                    <span class="name">{{ rating.username }}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar" />
                  </div>
                  <div class="time">{{ _format(rating.rateTime) }}</div>
                  <p class="text">
                    <span :class="{ 'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1 }"></span>
                    {{ rating.text }}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!computedRatings || !computedRatings.length">暂无评价</div>
            </div>
          </div>
        </div>
        <div class="ball-container">
          <!-- <div class="ball">
            <div class="inner"></div>
          </div> -->
        </div>
        <transition name="fade"><div class="content-mask" v-show="contentMaskVisivle" @click="_contentMaskClick"></div></transition>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
import popupMixin from '../../common/mixins/popup.js'
import ratingsMixin from '../../common/mixins/ratings.js'
import Split from '../split/split.vue'
import CarControl from '../car-control/car-control.vue'
import RatingSelect from '../rating-select/rating-select.vue'

const EVENT_SHOW = 'show'

export default {
  name: 'food',
  mixins: [ratingsMixin, popupMixin],
  data() {
    return {
      contentMaskVisivle: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
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
    this.$bus.$on(this.$event.FOODS_NUM_CLOSE, this._onFoodsNumClose)
  },
  beforeDestroy() {
    this.$bus.$off(this.$event.FOODS_NUM, this._onFoodsNum)
    this.$bus.$off(this.$event.FOODS_NUM_CLOSE, this._onFoodsNumClose)
  },
  mounted() {},
  computed: {
    ratings() {
      return this.food.ratings
    }
  },
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
        _elfood.style.bottom = _h + 45 + 'px'
      }
      this.contentMaskVisivle = !this.contentMaskVisivle
    },
    _onFoodsNumClose() {
      let _elfood = document.getElementsByClassName('food')[0]
      _elfood.style.bottom = '57px'
      this.contentMaskVisivle = false
    },
    _contentMaskClick() {
      let _elfood = document.getElementsByClassName('food')[0]
      _elfood.style.bottom = '57px'
      this.contentMaskVisivle = false
      this.$bus.$emit(this.$event.FOODS_NUM_CLOSE_TO_GOOD)
    },
    _format(time) {
      return moment(time).format('YYYY-MM-DD HH:MM')
    }
  },
  components: {
    Split,
    CarControl,
    RatingSelect
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../src/common/stylus/variable.styl'

// @import '../../../src/common/stylus/mixin.styl'
.food
  transition all 0.3s ease-in-out
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
    .ratings-wrapper
      .rating-item
        padding 16px 0
        // border-bottom 1px solid $color-row-line
        &:last-child
          border-bottom none
        .user
          position absolute
          right 0
          top 16px
          display flex
          align-items center
          line-height 12px
          .name
            margin-right 6px
            font-size $fontsize-small
            color $color-light-grey
          .avatar
            border-radius 50%
        .time
          margin-bottom 6px
          line-height 12px
          font-size $fontsize-small
          color $color-light-grey
        .text
          line-height 16px
          font-size $fontsize-medium
          color $color-dark-grey
          .icon-thumb_up, .icon-thumb_down
            margin-right 4px
            line-height 16px
            font-size $fontsize-medium
          .icon-thumb_up
            color $color-blue
          .icon-thumb_down
            color $color-light-grey
      .no-rating
        padding 16px 0
        font-size $fontsize-medium
        color $color-light-grey
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
  .hline
    width 100%
    height 2px
    background-color $color-row-line
    margin-top -16px
</style>
