Component({
  properties: {
    title: {
      type: String,
      value: "",
    },
    chestNum: {
      type: Number,
    },
    boxNum: {
      type: Number,
    },
    items: {
      type: Array,
    },
    detail: {
      type: Object,
    }
  },
  data: {
    
  },
  methods: {
    onContinueScan() {
      this.triggerEvent('continueScan')
    },

    onAfreshScan() {
      this.triggerEvent('afreshScan')
    },

    onGotoDetail() {
      this.triggerEvent('gotoDetail')
    },

  }
})