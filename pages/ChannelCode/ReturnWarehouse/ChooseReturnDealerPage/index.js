import { http } from '../../../../utils/http'
import apis from '../../../../apis/ChannelScanCode/index'

Page({
  outType: '',
  data: {
    types: [],
    delaerList: [],
    selectDealer: null,
    querying: false,
  },
  onLoad: function(options) {
    const { outType } = options
    this.outType = outType
  },

  onInputChange(e) {
    const value = e.detail
    if (!value) {
      this.setData({
        delaerList: [],
      })
      return
    }
    this.searchDealer(value)
  },

  /* 根据名称搜索收货人 */
  searchDealer(value) {
    if (value) {
      this.setData({ querying: true })
      http({ url: apis.GetSubDealer, data: { name: value } }).then(res => {
        const delaerList = res.data ? res.data.map(({customerCode: code, customerName: name, customerNameType: type}) => ({code, name, type})) : []
        this.setData({
          delaerList,
        })
      }).finally(() => {
        this.setData({ querying: false })
      })
    } else {
      this.setData({
        delaerList: [],
      })
    }
  },

  /* 清除搜索内容或选择的经销商 */
  onClearInputHandle() {
    this.setData({
      selectDealer: null,
    })
  },

  /* 选择收货人 */
  onClickDealer(e) {
    const { name, code, type } = e.currentTarget.dataset
    this.setData({
      selectDealer: {
        name,
        code,
        type,
      }
    })
  },

  /* 提交 */
  onSubmitHandle() {
    console.log(this.data.selectDealer)
    if (!this.data.selectDealer) {
      wx.showToast({ title: '请选择退货人', icon: 'none' })
      return
    }
    const consigneeName = this.data.selectDealer.name
    const consigneeCode = this.data.selectDealer.code || ''
    const consigneeType = this.data.selectDealer.type || ''
    if (this.outType == 'scancode') {
      // 进入扫码条码列表页
      wx.navigateTo({ url: `/pages/ChannelCode/BarcodeListPage/index?menuType=returnIn&consigneeType=${consigneeType}&consigneeName=${consigneeName}&consigneeCode=${consigneeCode}` })
    } else {
      // 进入数量输入列表页
      wx.navigateTo({ url: `/pages/ChannelCode/QuantityListPage/index?menuType=returnIn&consigneeType=${consigneeType}&consigneeName=${consigneeName}&consigneeCode=${consigneeCode}` })
    }
  }

})