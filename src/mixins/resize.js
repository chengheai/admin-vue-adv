
export default {
  data() {
    return {
      mixinScreenWidth: 0
    }
  },
  beforeMount() {
    this.getScreen()
    window.addEventListener('resize', this.getScreen)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getScreen)
  },
  methods: {
    getScreen() {
      this.mixinScreenWidth = document.body.clientWidth
    }
  }
}
