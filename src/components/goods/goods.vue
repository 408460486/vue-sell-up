<template>
  <div class="goods">
    <div class="view-wrapper">
      <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
        @change="changeHandler"
        @sticky-change="stickyChangeHandler">
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <support-ico
                  v-if="props.txt.type>=1"
                  :type="props.txt.type"
                  :size="3"
                ></support-ico>
                <span>{{props.txt.name}}</span>
                <bubble class="bubble" :num="props.txt.count" v-if="props.txt.count"></bubble>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name">
          <ul>
            <li v-for="(food,index) in good.foods" :key="index" class="food-item" @click="showFood">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                 <h2 class="name">{{food.name}}</h2>
                 <p class="desc">{{food.description}}</p>
                 <div class="extra">
                   <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                 </div>
                 <div class="price">
                   <span class="now">￥{{food.price}}</span>
                   <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                 </div>
              </div>
              <div class="car-control-warpper">
                <car-control :food="food" @add="drop"></car-control>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <shop-car-list ref="shopCarList"
      :selected-foods="selectedFoods"
      @maskClick="maskClick"
      @add="drop">
    </shop-car-list>
    <shop-car
      ref="shopCar"
      :min-price="seller.minPrice"
      :delivery-price="seller.deliveryPrice"
      :selected-foods="selectedFoods"
      @toggltList="toogleList"
      @listEmpty="listEmpty">
    </shop-car>
    <transition name="move">
      <div v-show="foodMaskVisible" class="food-details-mask"></div>
    </transition>
  </div>
</template>

<script>
  import { getGoods } from '../../api/index.js'
  import SupportIco from '../support-ico/support-ico.vue'
  import ShopCar from '../shop-car/shop-car.vue'
  import CarControl from '../car-control/car-control.vue'
  import Bubble from '../bubble/bubble.vue'
  import ShopCarList from '../shop-car-list/shop-car-list.vue'

  export default {
    name: 'goods',
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      SupportIco,
      ShopCar,
      CarControl,
      Bubble,
      ShopCarList
    },
    data() {
      return {
        goods: [],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        },
        foodMaskVisible: false
      }
    },
    created() {
      this.$bus.$on(this.$event.HEADER_MASK_HIDE, () => {
        this._hide()
      })
      this.$bus.$on(this.$event.FOOD_VISIBLE, this._showFoodMask)
    },
    destroyed() {
      this.$bus.$off(this.$event.HEADER_MASK_HIDE)
      this.$bus.$off(this.$event.FOOD_VISIBLE, this._showFoodMask)
    },
    mounted() {

    },
    computed: {
      seller() {
        return this.data.seller
      },
      barTxts() {
        let ret = []
        this.goods.forEach((good) => {
          const { type, name, foods } = good
          let count = 0
          foods.forEach((food) => {
             count += food.count || 0
          })
          ret.push({
            type,
            name,
            count
          })
        })
        return ret
      },
      selectedFoods() {
        let ret = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0) {
              ret.push(food)
            }
          })
        })
        return ret
      }
    },
    methods: {
      fetch() {
       if (!this.fetched) {
         this.fetched = true
         getGoods({
           id: this.seller.id
         }).then((goods) => {
           goods.forEach((good) => {
             good.label = good.name
           })
           this.goods = goods
         })
       }
      },
      drop(target) {
        this.$refs.shopCar.drop(target)
      },
      _show() {
        this.$refs.shopCarList.show()
        this.$bus.$emit(this.$event.HEADER_MASK_VISIBLE, true)
      },
      _hide() {
        this.$refs.shopCarList.hide()
        this.$bus.$emit(this.$event.HEADER_MASK_VISIBLE, false)
      },
      toogleList() {
        if (this.$refs.shopCarList.visible) {
          this._hide()
        } else {
          this._show()
        }
      },
      listEmpty() {
         this._hide()
      },
      maskClick() {
         this._hide()
      },
      showFood() {
        this.$bus.$emit(this.$event.FOOD_VISIBLE, true)
      },
      _showFoodMask(flag) {
        this.foodMaskVisible = flag
      },
      changeHandler(label) {
        // console.log('changed to:', label)
      },
      stickyChangeHandler(current) {
        // console.log('sticky-change', current)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../src/common/stylus/variable.styl'
  .goods
    position relative
    text-align left
    height 100%
    border initial
    border-top 2px solid $color-col-line
    background-color #fff
    .view-wrapper
      position absolute
      width 100%
      top 0
      left 0
      bottom 48px
    .cube-scroll-nav-main
      background-color #efeff4
    .cube-sticky-fixed
      background-color #efeff4
    >>> .cube-scroll-nav-bar
      width 80px
      white-space normal
      overflow hidden
    >>> .cube-scroll-nav-bar-item
      padding 0 10px
      display flex
      align-items center
      height 56px
      line-height 16px
      font-size $fontsize-small
      background $color-background-ssss
      .text
        flex 1
        position relative
      .support-ico
        display inline-block
        vertical-align top
        margin-right 4px
        margin-top 2px
      .bubble
        position absolute
        right -8px
        top -8px
    >>> .cube-scroll-nav-bar-item_active
      background-color #fff
      color $color-dark-grey
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      position relative
      .icon
        flex 0 0 57px
        margin-right 10px
        img
          width 57px
          height 57px
      .content
        flex 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: $fontsize-medium
          color: $color-dark-grey
        .desc, .extra
          line-height: 10px
          font-size: $fontsize-small-s
          color: $color-light-grey
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: $fontsize-medium
            color: $color-red
          .old
            text-decoration: line-through
            font-size: $fontsize-small-s
            color: $color-light-grey
      .car-control-warpper
        position absolute
        right 0
        bottom 12px
    >>> .cube-scroll-nav-panel-title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid $color-col-line
      font-size $fontsize-small
      color $color-grey
      background $color-background-ssss
    .food-details-mask
      position fixed
      bottom 0
      width 33.333334%
      height: 57px
      background-color #fff
      z-index 998
      &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all .4s ease-in-out
</style>
