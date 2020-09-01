import { quantityPropsBehavior } from '../ProductQuantityPropsBehavior/index'
Component({
  behaviors: [quantityPropsBehavior],
  properties: {
    title: {
      type: String,
      value: '',
    },
  },
  methods: {
    onDeleteHandle() {
      this.triggerEvent('deleteHandle')
    },

    onChangeChestNum(e) {
      const value = e.detail.value
      this.triggerEvent('changeNumber', { type: 1, value })
    },

    onChangeBoxNum(e) {
      const value = e.detail.value
      this.triggerEvent('changeNumber', { type: 2, value })
    }
  }
})