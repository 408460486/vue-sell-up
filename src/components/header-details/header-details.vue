<template>
  <transition name="fade">
    <div class="details" v-show="visible">
      <div class="details-wrapper clearfix">
        <div class="details-main">
          <span class="name">{{ seller.name }}</span>
          <star class="star" :size="48" :score="3.6"></star>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li v-for="(support, index) in seller.supports" :key="index" class="support-item">
              <support-ico :type="support.type" :size="2"></support-ico>
              <span class="text">{{ support.description }}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <span class="text">{{ seller.bulletin }}</span>
          </div>
        </div>
      </div>
      <div class="details-close" @click="hide"><i class="icon-close"></i></div>
    </div>
  </transition>
</template>

<script>
import SupportIco from '../../components/support-ico/support-ico.vue'
import Star from '../../components/star/star.vue'
import popupMixin from '../../common/mixins/popup.js'

export default {
  mixins: [popupMixin],
  name: 'header-details',
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    this.$bus.$on(this.$event.HEADER_DETAILS_SHOW, this.show)
  },
  beforeDestroy() {
    this.$bus.$off(this.$event.HEADER_DETAILS_SHOW, this.show)
  },
  components: {
    SupportIco,
    Star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// @import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable.styl'

.fade-enter-active, .fade-leave-active
  transition opacity 0.5s ease
.fade-enter, .fade-leave-to
  opacity 0
.details
  position fixed
  left 0
  top 0
  width 100%
  height 100%
  color $color-white
  background $color-background-s
  backdrop-filter blur(10px)
  z-index 9999
  overflow auto
  .details-wrapper
    display inline-block
    width 100%
    min-height 100%
    .details-main
      text-align center
      padding 64px 32px 64px 32px
      .name
        font-size $fontsize-large
        color $color-white
        font-weight 700
        line-height 16px
      .title
        display flex
        margin-top 28px
        .line
          flex 1
          border-bottom 1px solid rgba(255, 255, 255, 0.2)
          transform translateY(-6px)
        .text
          font-size $fontsize-medium
          color $color-white
          font-weight 700
          line-height 14px
          margin-left 12px
          margin-right 12px
      .star
        margin-top 16px
      .supports
        padding 24px 12px 0px 12px
        .support-item
          text-align left
          display flex
          align-items center
          margin-bottom 12px
          &:last-child
            margin-bottom 0
          .text
            color $color-white
            font-size $fontsize-small
            font-weight 200
            margin-left 6px
      .bulletin
        padding 24px 12px 0px 12px
        text-align left
        .text
          color $color-white
          font-size $fontsize-small
          font-weight 200
          line-height 24px
  .details-close
    position relative
    width 32px
    height 32px
    font-size $fontsize-large-xxxx
    // left calc(50% - 15px)
    margin -56px auto 0 auto
</style>
