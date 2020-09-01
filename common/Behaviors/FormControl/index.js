const formControlBehavior = Behavior({
  properties: {
    name: {
      type: String,
    },
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    }
  },
  methods: {
    onChangeHandle(e) {
      const value = e.detail.value
      this.triggerEvent('changeHandle', { name: this.data.name, value })
    }
  }
})

export { formControlBehavior }