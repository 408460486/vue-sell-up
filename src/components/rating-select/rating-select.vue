<template>
  <div class="rating-select">
    <div class="border-bottom-1px">
      <span @click="select(2)" class="block btn-blue" :class="{ active: selectType === 2 }">
        {{ desc.all }}
        <span class="count">{{ ratings.length }}</span>
      </span>
      <span @click="select(0)" class="block btn-blue" :class="{ active: selectType === 0 }">
        {{ desc.positive }}
        <span class="count">{{ positives.length }}</span>
      </span>
      <span @click="select(1)" class="block btn-grey" :class="{ active: selectType === 1 }">
        {{ desc.negative }}
        <span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div class="hline"></div>
    <div class="switch" @click="toogle" :class="{ on: onlyContent }">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const EVENT_SELECT = 'select'
const EVENT_TOGGLE = 'toogle'
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    selectType: {
      type: Number,
      default: ALL
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select(type) {
      this.$emit(EVENT_SELECT, type)
    },
    toogle() {
      this.$emit(EVENT_TOGGLE)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../src/common/stylus/variable.styl'

.rating-select
  margin-top 16px
  .block
    transition: all .25s ease-in-out
    padding 8px 12px 8px 12px
    font-size $fontsize-medium
    color rgba(77, 85, 93, 1)
    margin-right 8px
    display inline-block
    .count
      font-size $fontsize-small-s
    &.active
      color $color-white
    &.btn-blue
      background-color $color-light-blue
      &.active
        background-color $color-blue
    &.btn-grey
      background-color rgba(77, 85, 93, 0.2)
      &.active
        background-color rgba(77, 85, 93, 1)
  .hline
    width 100%
    height 1px
    background-color $color-row-line
    margin-top 16px
  .switch
    display flex
    align-items center
    padding 12px 0px 12px 0px
    line-height 24px
    color $color-light-grey
    &.on
      .icon-check_circle
        color $color-green
    .icon-check_circle
      margin-right 4px
      font-size $fontsize-large-xxx
    .text
      font-size $fontsize-medium
</style>
