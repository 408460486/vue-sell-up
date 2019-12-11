exports.install = function(Vue, options) {
  let debug = options.debug
  var eventBus = new Vue()
  Vue.prototype.$bus = {
    $on(...args) {
      if (debug) {
        console.log('$on')
        console.log(args)
        console.log(args[1].name || null)
        console.log('............................................')
      }
      eventBus.$on(...args)
    },
    $off(...args) {
      if (debug) {
        console.log('$off')
        console.log(args)
        console.log(args[1].name || null)
        console.log('............................................')
      }
      eventBus.$off(...args)
    },
    $once(...args) {
      if (debug) {
        console.log('$once')
        console.log(args)
        console.log(args[1].name || null)
        console.log('............................................')
      }
      eventBus.$emit(...args)
    },
    $emit(...args) {
      if (debug) {
        console.log('$emit')
        console.log(args)
        console.log('............................................')
      }
      eventBus.$emit(...args)
    }
  }
  Vue.prototype.$event = {
    HEADER_DETAILS_SHOW: 'HEADER_DETAILS_SHOW',
    HEADER_MASK_VISIBLE: 'HEADER_MASK_VISIBLE',
    HEADER_MASK_HIDE: 'HEADER_MASK_HIDE',
    FOOD_VISIBLE: 'FOOD_VISIBLE',
    FOOD_DROP: 'FOOD_DROP',
    FOODS_NUM: 'FOODS_NUM'
    // FOODS_NUM_CLOSE: 'FOODS_NUM_CLOSE',
    // FOODS_NUM_CLOSE_TO_GOOD: 'FOODS_NUM_CLOSE_TO_GOOD'
  }
  Vue.prototype.$si = {
    options: options
  }
}
