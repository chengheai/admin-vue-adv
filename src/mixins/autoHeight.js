export default {
  data() {
    return {
      mixinAutoHeight: 0,
      selectedRef: ''
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calcTableHeight)
  },
  methods: {
    mixinCalcTableHeight(selectedRef) {
      this.selectedRef = selectedRef
      if (this.selectedRef) {
        this.$nextTick(() => {
          this.calcTableHeight()
          window.addEventListener('resize', this.calcTableHeight)
        })
      }
    },

    calcTableHeight() {
      const container = document.querySelector('.app-wrapper')
      const selected = this.$refs[this.selectedRef]?.$el ?? ''
      if (selected && container) {
        this.mixinAutoHeight = this.calcHeight(container, selected) - 12 - 14 - 2
        if (this.mixinAutoHeight < 360) {
          this.mixinAutoHeight = 400
        }
      }
    },

    calcHeight(container, selected) {
      const offsetParents = []
      let pointer = selected.offsetParent
      while (pointer && container !== pointer && container.contains(pointer)) {
        offsetParents.push(pointer)
        pointer = pointer.offsetParent
      }
      const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0)
      const viewHeight = container.clientHeight
      return viewHeight - top
    }
  }
}
