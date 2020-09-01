Component({
  properties: {
    productName: {
      type: String,
    },
    chestNum: {
      type: Number,
    },
    boxNum: {
      type: Number,
    },
    barcodeList: {
      type: Array,
      value: [],
    },
    showCode: {
      type: Boolean,
    },
    detail: {
      type: Object,
    },
    items: {
      type: Array,
      value: [
        { label: '产品名称', productName: true },
        { label: '产品数量', quantity: true },
      ]
    }
  }
})