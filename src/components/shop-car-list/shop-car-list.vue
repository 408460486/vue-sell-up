<template>
  <div class="shop-car-list">
    <transition name="fade">
      <cube-popup type="shop-car-list-wrapper"
        position="bottom"
        :mask-closable="true"
        ref="myPopup"
        @mask-click="maskClick"
        v-show="visible">
        <transition name="move">
          <div class="scroll-list-wrapper" v-show="visible">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="clear">清空</span>
            </div>
            <cube-scroll
              ref="scroll"
              :data="selectedFoods"
              class="list-content"
              :options="scrollOptions">
              <ul>
                <li v-for="(food, index) in selectedFoods" class="list-item" :key="index">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                  </div>
                  <div class="cart-control-wrapper">
                    <car-control @add="add" :food="food"></car-control>
                  </div>
                </li>
              </ul>
            </cube-scroll>
          </div>
        </transition>
      </cube-popup>
    </transition>
  </div>
</template>

<script>
  import CarControl from '../car-control/car-control.vue'
  import popupMixin from '../../common/mixins/popup.js'

  const EVENT_MASK_CLICK = 'maskClick'
  const EVENT_ADD = 'add'
  const EVENT_SHOW = 'show'

  export default {
    mixins: [popupMixin],
    name: 'shop-car-list',
    props: {
      selectedFoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        scrollOptions: {
          observeDOM: true,
          // click: false,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false
        }
      }
    },
    components: {
      CarControl
    },
    created() {
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      })
    },
    mounted() {

    },
    methods: {
      maskClick() {
        this.$emit(EVENT_MASK_CLICK)
        // this.$bus.$emit(this.$event.FOODS_NUM_CLOSE)
      },
      add(target) {
        this.$emit(EVENT_ADD, target)
      },
      getHeight() {
        return document.getElementsByClassName('scroll-list-wrapper')[0].clientHeight
      },
      clear() {
        this.$createDialog({
          type: 'confirm',
          // icon: 'cubeic-alert',
          title: '清空购物车？',
          // content: '我是内容',
          // confirmBtn: {
            // text: '确定',
            // active: true,
            // disabled: false,
            // href: 'javascript:;'
          // },
          // cancelBtn: {
          //   text: '取消',
          //   active: false,
          //   disabled: false,
          //   href: 'javascript:;'
          // },
          onConfirm: () => {
            this.selectedFoods.forEach((food) => {
              food.count = 0
            })
            this.hide()
          },
          onCancel: () => {

          }
        }).show()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../src/common/stylus/variable.styl'

  .shop-car-list
    .cube-shop-car-list-wrapper
      width 33.333334%
      bottom 46px
      >>> .cube-popup-mask
        opacity 0.4
      &.fade-enter, &.fade-leave-to
        opacity: 0
      &.fade-enter-active, &.fade-leave-active
        transition all .3s ease-in-out
      .move-enter, .move-leave-active
        transform: translate3d(0, 100%, 0)
      .move-enter-active, .move-leave-active
        transition: all .3s ease-in-out
      .scroll-list-wrapper
        .list-header
          height: 40px
          line-height: 40px
          padding: 0 18px
          background: $color-background-ssss
          .title
            float: left
            font-size: $fontsize-medium
            color: $color-dark-grey
          .empty
            float: right
            font-size: $fontsize-small
            color: $color-blue
        .list-content
          padding: 0 18px
          max-height: 217px
          overflow: hidden
          background: $color-white
          .list-item
            position: relative
            padding: 12px 0
            box-sizing: border-box
            .name
              line-height: 24px
              font-size: $fontsize-medium
              color: $color-dark-grey
            .price
              position: absolute
              right: 90px
              bottom: 12px
              line-height: 24px
              font-weight: 700
              font-size: $fontsize-medium
              color: $color-red
            .cart-control-wrapper
              position: absolute
              right: 0
              bottom: 6px
</style>
