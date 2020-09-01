Page({
  outType: '',
  data: {
    types: [
      { title: '团购', value: 'group' },
      { title: '消费者', value: 'consumer' },
      { title: '其他', value: 'other' },
    ],
    delaerList: [],
    selectType: '',
    selectDealer: null,
  },
  onLoad: function(options) {
    const { outType } = options
    this.outType = outType
  },

  /* 点击按钮触发 */
  onChangeType(e) {
    this.setData({
      selectType: e.detail,
      delaerList: [],
      selectDealer: null,
    })
  },

  /* 点击cell触发 */
  onClickCell(e) {
    const { name } = e.currentTarget.dataset
    this.setData({
      selectType: name,
      delaerList: [],
      selectDealer: null,
    })
  },

  onInputChange(e) {
    const value = e.detail
    if (!this.data.selectType) {
      wx.showToast({ title: '请先选择收货方类型', icon: 'none' })
      return
    }
    if (!value) {
      this.setData({
        delaerList: [],
      })
      return
    }
    this.setData({
      selectDealer: {
        name: value,
      },
    })
  },

  /* 清除搜索内容或选择的经销商 */
  onClearInputHandle() {
    this.setData({
      selectDealer: null,
    })
  },

  /* 提交 */
  onSubmitHandle() {
    console.log(this.data.selectDealer)
    if (!this.data.selectDealer) {
      wx.showToast({ title: '请选择收货方数据', icon: 'none' })
      return
    }
    const consigneeName = this.data.selectDealer.name
    const consigneeCode = this.data.selectDealer.code || ''
    const consigneeType = this.data.selectType
    if (this.outType == 'scancode') {
      // 进入扫码条码列表页
      wx.navigateTo({ url: `/pages/ChannelCode/BarcodeListPage/index?menuType=otherOut&consigneeType=${consigneeType}&consigneeName=${consigneeName}&consigneeCode=${consigneeCode}` })
    } else  {
      // 进入数量输入列表页
      wx.navigateTo({ url: `/pages/ChannelCode/QuantityListPage/index?menuType=otherOut&consigneeType=${consigneeType}&consigneeName=${consigneeName}&consigneeCode=${consigneeCode}` })
    }
  }

})