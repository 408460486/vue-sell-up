const ALL = 2

export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: false
    }
  },
  computed: {
    computedRatings() {
      let ret = []
      if (this.ratings) {
        this.ratings.forEach(rating => {
          if (this.onlyContent && !rating.text) {
            return
          }
          if (rating.rateType === this.selectType || this.selectType === ALL) {
            ret.push(rating)
          }
        })
      }
      return ret
    }
  },
  methods: {
    onSelect(type) {
      this.selectType = type
    },
    onToogle() {
      this.onlyContent = !this.onlyContent
    }
  }
}
