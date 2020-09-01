Component({
  data: {
    inputValue: '',
  },
  methods: {
    onSubmitHandle() {
      this.triggerEvent('submitHandle', { value: this.data.inputValue })
      this.setData({
        inputValue: '',
      })
    },

    onInputChange(e) {
      const value = e.detail
      this.setData({
        inputValue: value,
      })
    }
  }
})