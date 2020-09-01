const { appCenter } = require("../../core/appCetner")
const { http } = require("../../utils/http")
import apis from '../../apis/ChannelScanCode/index'
const { formatTimeItem } = require("../../utils/util")

// pages/ChannelCode/ChannelCode.js
Page({
  // warehouseMenuConfig: {
  //   /* 采购入库 */
  //   purchase: {
  //     sheetActions: [
  //       { name: '扫码入库', url: '/pages/ChannelCode/PurchaseWarehouse/ScanCodeWarehouse/WarehouseHistory/index' },
  //       { name: '数量入库', url: '/pages/ChannelCode/PurchaseWarehouse/QuantityWarehouse/index' }
  //     ],
  //   },
  //   /* 下游退货 */
  //   underReturn: {
  //     sheetActions: [
  //       { name: '扫码入库', url: '/pages/ChannelCode/ReturnWarehouse/ScanCodeReturn/HistoryPage/index' },
  //       { name: '数量入库', url: '/pages/ChannelCode/ReturnWarehouse/ChooseReturnDealerPage/index' }
  //     ],
  //   },
  //   /* 销售出库 */
  //   sales: {
  //     sheetActions: [
  //       { name: '扫码出库', url: '/pages/ChannelCode/SaleOutWarehouse/ScanCodeOut/HistoryPage/index' },
  //       { name: '数量出库', url: '/pages/ChannelCode/SaleOutWarehouse/ChooseConsigneePage/index?outType=quantity' }
  //     ],
  //   },
  //   /* 其他出库 */
  //   otherOut: {
  //     sheetActions: [
  //       { name: '扫码出库', url: '/pages/ChannelCode/OtherOutWarehouse/ScanCodeOut/HistoryPage/index' },
  //       { name: '数量出库', url: '/pages/ChannelCode/OtherOutWarehouse/ChooseDealerPage/index?outType=quantity' }
  //     ],
  //   },

  // },
  warehouseMenuConfig: {
    /* 采购入库 */
    purchase: {
      sheetActions: [
        { name: '扫码入库', url: '/pages/ChannelCode/HistoryListPage/index?menuType=purchaseIn' },
        { name: '数量入库', url: '/pages/ChannelCode/QuantityListPage/index?menuType=purchaseIn' }
      ],
    },
    /* 下游退货 */
    underReturn: {
      sheetActions: [
        { name: '扫码入库', url: '/pages/ChannelCode/HistoryListPage/index?menuType=returnIn' },
        { name: '数量入库', url: '/pages/ChannelCode/ReturnWarehouse/ChooseReturnDealerPage/index' }
      ],
    },
    /* 销售出库 */
    sales: {
      sheetActions: [
        { name: '扫码出库', url: '/pages/ChannelCode/HistoryListPage/index?menuType=saleOut' },
        { name: '数量出库', url: '/pages/ChannelCode/SaleOutWarehouse/ChooseConsigneePage/index?outType=quantity' }
      ],
    },
    /* 其他出库 */
    otherOut: {
      sheetActions: [
        { name: '扫码出库', url: '/pages/ChannelCode/HistoryListPage/index?menuType=otherOut' },
        { name: '数量出库', url: '/pages/ChannelCode/OtherOutWarehouse/ChooseDealerPage/index?outType=quantity' }
      ],
    },

  },
  /* 点击的菜单 */
  handleType: '',
  /**
   * 页面的初始数据
   */
  data: {
    todayck:false,
    show: false,
    actions: [],
    countInfo: {
      inBottleQuantity: 0,
      inBoxQuantity: 0,
      outBottleQuantity: 0,
      outBoxQuantity: 0,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const pages = getCurrentPages()
    console.log('pages', pages)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 默认你获取今天的
    this.handeltoday()
  },

  getOutInStockCount({startTime, endTime}) {
    wx.showLoading({ title: '' })
    http({ url: apis.GetOutInStockCount, data: { startTime, endTime } }).then(res => {
      const countInfo = res.data
      this.setData({ countInfo })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  handeltomouth(){ //本月
    const { year, month, day } = formatTimeItem()
    const yearMonth = [year, month ].map(this.formatNumber).join('-')
    const startTime = `${yearMonth}-01 00:00:00`
    const endTime = `${yearMonth}-${day} 23:59:59`
    this.getOutInStockCount({ startTime, endTime })
    this.setData({todayck:true})
  },
  handeltoday(){ //今天
    const { year, month, day } = formatTimeItem()
    const date = [year, month, day ].map(this.formatNumber).join('-')
    const startTime = date + ' 00:00:00'
    const endTime = date + ' 23:59:59'
    // 默认你获取今天的
    this.getOutInStockCount({ startTime, endTime })
    this.setData({todayck:false})
  },

  onMenuClickHandle(e) {
    const handleType = e.currentTarget.dataset.type
    this.handleType = handleType
    if (handleType == 'purchase' && appCenter.getAgentType() != 1) {
      // TODO: 采购入库，特约经销商跳转到 待办--入库管理列表
    } else {
      this.onShowAction()
    }
  },

  onShowAction() {
    const actions = this.warehouseMenuConfig[this.handleType].sheetActions
    this.setData({
      show: true,
      actions,
    })
  },

  onClose() {
    this.setData({
      show: false,
    })
  },

  onSelect(event) {
    let name = event.detail.name
    const actions = this.warehouseMenuConfig[this.handleType].sheetActions
    const actionInfo = actions.find(item => item.name == name)
    let url = actionInfo ? actionInfo.url : undefined
    if (url) {
      wx.navigateTo({
        url,
      })
    }
  },
  
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  /* 进入入库记录列表 */
  onEntryRecordList() {
    wx.navigateTo({ url: '/pages/ChannelCode/WarehouseRecordList/index' })
  },

  /* 进入出库库记录列表 */
  onEntryOutRecordList() {
    wx.navigateTo({ url: '/pages/ChannelCode/OutWarehouseRecordList/index' })
  },

  /* 进入盘点列表 */
  onGotoInventoryList() {
    wx.navigateTo({ url: '/pages/ChannelCode/InventoryManage/List/index' })
  },

  /* 进入我的库存 */
  onGotoMyStock() {
    wx.navigateTo({ url: '/pages/ChannelCode/MyStock/index' })
  },

})