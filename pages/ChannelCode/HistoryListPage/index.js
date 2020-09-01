import { http } from '../../../utils/http'
import apis from '../../../apis/ChannelScanCode/index'
import { channelCodeOption } from '../common/config.options'
import { formatTimeToString } from '../../../utils/util'

Page({
  menuType: '',
  orderCode: '',
  configOption: {},
  data: {
    items: [],
    data: null,
  },
  onLoad(options) {
    const { menuType, orderCode } = options
    this.menuType = menuType
    this.orderCode = orderCode
    this.configOption = channelCodeOption[menuType]
    const title = this.configOption && this.configOption.historyPage ? this.configOption.historyPage.title: '未完成临时单'
    wx.setNavigationBarTitle({ title })
    const items = this.configOption && this.configOption.historyPage ? this.configOption.historyPage.items : []
    this.setData({ items })
    // this.getTempOrder()
  },

  onShow() {
    // 获取最新数据
    this.getTempOrder()
  },

  getTempOrder() {
    wx.showLoading({ title: '加载中...' })
    const params = { operType: this.configOption.operType }
    if (this.orderCode) {
      // 如果是待办的物流单里进入的，加上物流单号获取数据
      params.orderCode = this.orderCode
    }
    http({ url: apis.GetTempOrder, data: params }).then(res => {
      console.log(res)
      const data = res.data ? res.data : undefined
      if (data) {
        data.scanDate = formatTimeToString(data.scanDate)
        this.setData({
          data,
        })
      } else {
        // 没有临时单，跳转到条码列表操作
        wx.redirectTo({ url: `/pages/ChannelCode/BarcodeListPage/index?menuType=${this.menuType}&orderCode=${this.orderCode}` })
      }
    }).finally(() => {
      wx.hideLoading()
    })
  },

  onGotoDetail() {
    let code = 123
    wx.navigateTo({ url: `/pages/ChannelCode/BarcodeListPage/index?code=${code}&menuType=${this.menuType}&orderCode=${this.orderCode}` })
  },
  
  onContinueScan() {
    this.startScanCode()
  },
  
  /* 重新扫码 */
  onAfreshScan() {
    console.log('onAfreshScan 2')
    wx.showLoading({ title: '请求中...' })
    const params = { operType: this.configOption.operType }
    if (this.orderCode) {
      // 如果是待办的物流单里进入的，加上物流单号获取数据
      params.orderCode = this.orderCode
    }
    http({ url: apis.ClearTempOrder, data: params, method: 'DELETE' }).then(res => {
      // 删除临时单数据，销售、其他出库和下游退货，进入选择收货人页面
      if (this.menuType == 'saleOut') {
        wx.redirectTo({ url: '/pages/ChannelCode/SaleOutWarehouse/ChooseConsigneePage/index' })
      } else if (this.menuType == 'otherOut') {
        wx.redirectTo({ url: '/pages/ChannelCode/OtherOutWarehouse/ChooseDealerPage/index' })
      } else if (this.menuType == 'returnOut') {
        wx.redirectTo({ url: '/pages/ChannelCode/ReturnWarehouse/ChooseReturnDealerPage/index' })
      } else {
        // 成功后进入扫码页面
        wx.redirectTo({ url: `/pages/ChannelCode/BarcodeListPage/index?menuType=${this.menuType}&orderCode=${this.orderCode}` })
      }
    }).finally(() => {
      wx.hideLoading()
    })
  },

  startScanCode() {
    const { oppositeCode, oppositeName, oppositeType } = this.data.data
    const consigneeName = oppositeName || ''
    const consigneeCode = oppositeCode || ''
    const consigneeType = oppositeType || ''
    wx.navigateTo({ url: `/pages/ChannelCode/BarcodeListPage/index?menuType=${this.menuType}&orderCode=${this.orderCode}&consigneeType=${consigneeType}&consigneeName=${consigneeName}&consigneeCode=${consigneeCode}` })
    /* wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        // 扫码内容，扫码类型
        const { result, scanType } = res
        const code = this.data.data.code
        wx.navigateTo({ url: `/pages/ChannelCode/PurchaseWarehouse/ScanCodeWarehouse/WarehouseBarcodeListPage/index?code=${code}&barcodeInfo=${result}` })    
      },
      fail: () => {
        console.log('fail')
        wx.showToast({
          title: '扫描失败，请重新扫码',
          icon: 'none',
        })
      }
    }) */
  },

})