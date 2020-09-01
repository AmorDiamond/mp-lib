import { http } from '../../../../utils/http'
import apis from '../../../../apis/ChannelScanCode/index'

Page({
  outType: '',
  data: {
    types: [
      { title: '特约经销商', value: 'sp_dealer' },
      { title: '终端', value: 'terminal' },
      { title: '团购', value: 'group' },
      { title: '消费者', value: 'consumer' },
    ],
    delaerList: [],
    selectType: '',
    selectDealer: null,
    querying: false,
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
    if (this.data.selectType != 'sp_dealer' && this.data.selectType != 'terminal') {
      // 类型不是特约经销商和终端，使用输入的名称
      this.setData({
        selectDealer: {
          name: value,
        },
      })
      return
    }
    this.searchDealer(value)
  },

  /* 根据名称搜索收货人 */
  searchDealer(value) {
    console.log(value)
    if (value) {
      this.setData({ querying: true })
      http({ url: apis.GetSubDealer, data: { type: this.data.selectType, name: value } }).then(res => {
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
    const { name, code } = e.currentTarget.dataset
    this.setData({
      selectDealer: {
        name,
        code,
      }
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
      wx.navigateTo({ url: `/pages/ChannelCode/BarcodeListPage/index?menuType=saleOut&consigneeType=${consigneeType}&consigneeName=${consigneeName}&consigneeCode=${consigneeCode}` })
    } else {
      // 进入数量输入列表页
      wx.navigateTo({ url: `/pages/ChannelCode/QuantityListPage/index?menuType=saleOut&consigneeType=${consigneeType}&consigneeName=${consigneeName}&consigneeCode=${consigneeCode}` })
    }
  }

})