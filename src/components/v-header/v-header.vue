<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar"><img width="64" height="64" :src="seller.avatar" /></div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <support-ico :type="seller.supports[0].type" :size="1"></support-ico>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetails">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetails">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background"><img :src="seller.avatar" width="100%" height="100%" /></div>
  </div>
</template>

<script type="text/ecmascript-6">
import SupportIco from '../support-ico/support-ico.vue'

export default {
  name: 'v-header',
  data() {
    return {}
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    SupportIco
  },
  methods: {
    showDetails() {
      this.$bus.$emit(this.$event.HEADER_DETAILS_SHOW)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable.styl'

.header
  position relative
  overflow hidden
  color $color-white
  background $color-background-ss
  .content-wrapper
    position relative
    display flex
    align-items center
    padding 20px 12px 18px 20px
    .avatar
      flex 0 0 64px
      width 64px
      margin-right 16px
      img
        border-radius 2px
    .content
      flex 1
      .title
        display flex
        align-items center
        margin-bottom 8px
        .brand
          width 30px
          height 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size $fontsize-large
          font-weight bold
      .description
        margin-bottom 8px
        line-height 12px
        font-size $fontsize-small
      .support
        display flex
        align-items center
        .support-ico
          margin-right 4px
        .text
          line-height 12px
          font-size $fontsize-small-s
    .support-count
      position absolute
      right 12px
      bottom 14px
      display flex
      align-items center
      padding 0 8px
      height 24px
      line-height 24px
      text-align center
      border-radius 14px
      background $color-background-ss
      .count
        font-size $fontsize-small-s
      .icon-keyboard_arrow_right
        margin-left 2px
        line-height 24px
        font-size $fontsize-small-s
  .bulletin-wrapper
    position relative
    display flex
    align-items center
    height 28px
    line-height 28px
    padding 0 8px
    background $color-background-sss
    .bulletin-title
      flex 0 0 22px
      width 22px
      height 12px
      margin-right 4px
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
    .bulletin-text
      flex 1
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size $fontsize-small-s
      margin-top 2px
    .icon-keyboard_arrow_right
      flex 0 0 10px
      width 10px
      font-size $fontsize-small-s
      margin-top 2px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
</style>
