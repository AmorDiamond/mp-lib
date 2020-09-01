import { http } from '../../../../utils/http'
import apis from '../../../../apis/MyTodo/index'

Page({
  orderCode: '',
  data: {
    openSheet: false,
    showDialog: false,
    sheetActions: [
      {
        name: '一键入库',
        type: 'once',
      },
      {
        name: '扫码入库',
        type: 'pur',
      },
      {
        name: '数量入库',
        type: 'quantity',
      },
    ],
    detail: {
      logisticName: '中通快递',
      logisticCode: '2222222222222222',
      logisticCode: '2222222222222222',
      signingStatus: 1,
      stockStatus: 1,
      productNum: 60,
    },
    productList: [],
    openProductList: false,
  },

  onLoad(options) {
    const { code } = options
    this.orderCode = code
    this.getDetail(code)
  },

  getDetail(code) {
    wx.showLoading({ title: '加载中...' })
    http({ url: apis.LogisticsOrderDetail, data: { logisticsNo: code } }).then(res => {
      const detail = res.data
      this.setData({ detail })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /* 根据物流单获取物料数据列表 */
  getMatListByLogNo() {
    const code = this.orderCode
    wx.showLoading({ title: '' })
    http({ url: apis.GetMatListByLogisticNo, data: { code } }).then(res => {
      const productList = res.data
      this.setData({ productList, openProductList: true })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  onViewProductList() {
    if (this.data.productList && this.data.productList.length !== 0) {
      this.setData({ openProductList: !this.data.openProductList })
    } else {
      this.getMatListByLogNo()
    }
  },

  /* 入库 */
  onOpenWarehouse() {
    this.setData({
      openSheet: true,
    })
  },

  onCloseSheetHandle() {
    this.setData({ openSheet: false })
  },

  /* 选择入库方式 */
  onSheetSelectHandle(e) {
    const { type } = e.detail
    const orderCode = 123
    if (type == 'once') {
      this.setData({
        showDialog: true,
      })
    } else if (type == 'pur') {
      // 比采购入库多物流单号
      wx.navigateTo({ url: `/pages/ChannelCode/HistoryListPage/index?menuType=purchaseIn&orderCode=${orderCode}` })
    } else if (type == 'quantity') {
      // 比采购入库多物流单号
      wx.navigateTo({ url: `/pages/ChannelCode/QuantityListPage/index?menuType=purchaseIn&orderCode=${orderCode}` })
    }
  },

  /* 一键入库弹框确认 */
  onDialogConfirmHandle() {
    this.setData({ showDialog: false })
    wx.showLoading({ title: '请求中...' })
    const code = this.orderCode
    http({ url: apis.OnceClickWarehouse, data: { code }, method: 'POST' }).then(res => {
      wx.showToast({ title: '操作成功', success: () => {
        wx.navigateTo({ url: `/pages/ChannelCode/WarehouseRecordList/index?enterType=onceWarehouse&orderCode=${this.orderCode}` })
      } })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  onDialogCancelHandle() {},

  /* 破损出库 */
  onDamagedOut() {
    wx.navigateTo({ url: `/pages/ChannelCode/HistoryListPage/index?menuType=wornOut&orderCode=${this.orderCode}` })
  },

})