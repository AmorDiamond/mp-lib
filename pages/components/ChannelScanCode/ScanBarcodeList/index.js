Component({
  properties: {
    codeList: {
      type: Array,
      value: [],
    },
    mapping: {
      type: Object,
      value: {
        code: 'barCode',
        type: 'barType',
      }
    }
  },
  methods: {
    onDeleteHandle(e) {
      const code = e.currentTarget.dataset.code
      this.triggerEvent('deleteHandle', { code })
    }
  }
})