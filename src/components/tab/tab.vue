<template>
  <div class="tab">
    <cube-tab-bar v-model="selectedLabel"
      :use-transition="disabled"
      :showSlider="showSlider"
      :data="tabs"
      ref="tabNav"
      class="border-bottom-1px">
    </cube-tab-bar>
    <div class="slider-wrapper">
      <cube-slide ref="slider"
        :loop="loop"
        :initial-index="index"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage">
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
     return {
       index: this.initialIndex,
       disabled: false,
       loop: false,
       autoPlay: false,
       showDots: false,
       showSlider: true,
       slideOptions: {
         listenScroll: true,
         probeType: 3,
         // click: false,
         directionLockThreshold: 0
       }
     }
   },
   computed: {
     selectedLabel: {
       get() {
         return this.tabs[this.index].label
       },
       set(newVal) {
         this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
         })
       }
     }
   },
   created() {
     this.$bus.$on(this.$event.HEADER_MASK_VISIBLE, this._slideStatus)
   },
   mounted() {
     this.changePage(this.index)
   },
   beforeDestroy() {
     this.$bus.$off(this.$event.HEADER_MASK_VISIBLE, this._slideStatus)
   },
   methods: {
     _slideStatus(flag) {
       if (flag) {
         this.$refs.slider.slide.disable()
       } else {
         this.$refs.slider.slide.enable()
       }
     },
     changePage (current) {
       this.index = current
       const instance = this.$refs.component[current]
       if (instance && instance.fetch) {
         instance.fetch()
       }
     },
     scroll(pos) {
        const tabBarWidth = this.$refs.tabNav.$el.clientWidth
        const slideWidth = this.$refs.slider.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabNav.setSliderTransform(transform)
     }
   },
   components: {

   }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tab
  display flex
  flex-direction column
  height 100%
  >>> .cube-tab
    padding 10px 0
  .slider-wrapper
    flex 1
    overflow hidden
</style>
