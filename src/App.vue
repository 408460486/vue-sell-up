<template>
  <div>
    <div class="header-wrapper">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab-wrapper">
      <tab :tabs="getTabs()" :initialIndex="0"></tab>
    </div>
    <header-details :seller="seller"></header-details>
    <transition name="fade">
      <div class="header-mask" v-show="headerMaskVisivle" @click="headerMaskClick"></div>
    </transition>
    <food ref="food"></food>
    <!-- <div class="tab">
      <div class="tab-item border-1px"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item border-1px"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item border-1px"><router-link to="/seller">商家</router-link></div>
    </div>
    <transition name="fade" mode="out-in"><router-view></router-view></transition> -->
  </div>
</template>

<script>
import { getSeller } from './api/index.js'
import VHeader from './components/v-header/v-header.vue'
import HeaderDetails from './components/header-details/header-details.vue'
import Food from './components/food/food.vue'
import Tab from './components/tab/tab.vue'
import Seller from './components/seller/seller.vue'
import Ratings from './components/ratings/ratings.vue'
import Goods from './components/goods/goods.vue'

export default {
  name: 'app',
  data() {
    return {
      seller: { id: 42010620191008 },
      goods: {},
      ratings: {},
      headerMaskVisivle: false
    }
  },
  components: {
    VHeader,
    Tab,
    HeaderDetails,
    Food
  },
  created() {
    this._getSeller()
    this.$bus.$on(this.$event.HEADER_MASK_VISIBLE, this._headerMaskVisible)
    this.$bus.$on(this.$event.FOOD_VISIBLE, this._showFood)
  },
  beforeDestroy() {
    this.$bus.$off(this.$event.HEADER_MASK_VISIBLE, this._headerMaskVisible)
    this.$bus.$off(this.$event.FOOD_VISIBLE, this._showFood)
  },
  methods: {
    _getSeller() {
      getSeller().then(seller => {
        this.seller = Object.assign({}, this.seller, seller)
      })
    },
    _headerMaskVisible(flag) {
      this.headerMaskVisivle = flag
    },
    _showFood(flag) {
      if (flag) {
        this.$refs.food.show()
      }
    },
    getTabs() {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评价',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    },
    headerMaskClick() {
      this.$bus.$emit(this.$event.HEADER_MASK_HIDE)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/mixin.styl'

  .header-wrapper
    position fixed
    top 0
    left 0
    right 0
  .tab-wrapper
    position fixed
    top 133px
    left 0
    right 0
    bottom 0
  .header-mask
    position fixed
    left 0
    right 0
    height 169px
    background #25262d
    opacity 0.4
    &.fade-enter, &.fade-leave-to
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition all .3s ease-in-out
</style>
