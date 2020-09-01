import { http } from '../../../utils/http'
import apis from '../../../apis/ChannelScanCode/index'
import { channelCodeOption } from '../common/config.options'

Page({
  /* 收货方类型 */
  consigneeType: '',
  /* 收货方名称 */
  consigneeName: '',
  /* 收货方编码 */
  consigneeCode: '',
  menuType: '',
  orderCode: '',
  configOption: {},
  /**
   * 页面的初始数据
   */
  data: {
    showSearchPage: false,
    productList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { consigneeType, consigneeName, consigneeCode, menuType, orderCode } = options
    this.consigneeType = consigneeType
    this.consigneeName = consigneeName
    this.consigneeCode = consigneeCode
    this.configOption = channelCodeOption[menuType]
    this.menuType = menuType
    this.orderCode = orderCode
    const title = this.configOption && this.configOption.quantityPage ? this.configOption.quantityPage.title: '数量出入库'
    wx.setNavigationBarTitle({ title })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  onSubmitHandle() {
    console.log('productList', this.data.productList)
    const params = this.getCreateParams(this.menuType)
    const { url, redirectPath } = this.getCreateApiAndredirectPath(this.menuType)
    wx.showLoading({ title: '请求中...' })
    http({ url: url, data: params, method: 'POST' }).then(res => {
      wx.showToast({ title: '操作成功', success: () => {
        // 进入入库记录列表
        // wx.redirectTo({ url: redirectPath })
        this.completeRedirectPath(redirectPath)
      } })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /* 创建成功后回到对应列表页 */
  completeRedirectPath(redirectPath) {
    if (this.menuType !== 'stockInventory') {
      // 如果不是盘点
      if (this.orderCode) {
        // 待办-物流单进入的，路径带上orderCode区分
        redirectPath =  redirectPath + `&orderCode=${this.orderCode}`
      }
      wx.redirectTo({ url: redirectPath })
    } else {
      /**
       * 盘点时走盘点列表进入的，所以这里通过navigateBack方式跳转到列表，避免反复盘点页面栈里加入多层盘点列表，
       * 避免处理返回触发其他异常清空。
       */
      const pages = getCurrentPages()
      const backPageIndex = pages.findIndex(page => page.route == 'pages/ChannelCode/InventoryManage/List/index')
      if (backPageIndex > -1) {
        const backLength = pages.length - 1 - backPageIndex
        backLength && wx.navigateBack({ delta: backLength })
      } else {
        wx.redirectTo({ url: redirectPath })
      }
    }
  },

  onDeleteHandle(e) {
    const code = e.currentTarget.dataset.code
    console.log('delete code ' + code)
    const productList = this.data.productList.filter(item => item.matCode != code)
    this.setData({
      productList,
    })
  },

  onChangeNumber(e) {
    console.log(e)
    const { code } = e.currentTarget.dataset
    const { type, value } = e.detail
    const productList = [ ...this.data.productList ]
    let index = productList.findIndex(item => item.matCode == code)
    let product = productList[index]
    if (type == 1) {
      // 改变箱数
      product.boxQuantity = value
    } else if (type == 2) {
      // 改变盒数
      product.bottleQuantity = value
    }
    productList.splice(index, 1, product)
    this.setData({
      productList,
    })
  },

  onAddProductHandle(e) {
    const { code: matCode, name: matName } = e.detail.data
    this.setData({
      productList: [ ...this.data.productList, { matCode, matName} ],
      showSearchPage: false,
    })
  },

  onOpenSearch() {
    this.setData({
      showSearchPage: true,
    })
  },

  onCancleSearch() {
    this.setData({
      showSearchPage: false,
    })
  },

  /* 匹配对应类型的请求参数 */
  getCreateParams(type) {
    let params = {}
    switch (type) {
      case 'purchaseIn':
        params = { operType: 'pur', detailVos: this.data.productList }
        break
      case 'saleOut':
        params = { operType: 'sale', detailVos: this.data.productList, oppositeName: this.consigneeName, oppositeCode: this.consigneeCode, oppositeType: this.consigneeType }
        break
      case 'returnIn':
        params = { operType: 'ret', detailVos: this.data.productList, oppositeName: this.consigneeName, oppositeCode: this.consigneeCode, oppositeType: this.consigneeType }
        break
      case 'otherOut':
        params = { operType: 'other', detailVos: this.data.productList, oppositeName: this.consigneeName, oppositeCode: this.consigneeCode, oppositeType: this.consigneeType }
        break
      case 'stockInventory':
        params = this.data.productList
        break
    }
    if (this.orderCode) {
      // 如果是待办的物流单里进入的，加上物流单号获取数据
      params.orderCode = this.orderCode
    }
    return params
  },

  /* 匹配对应类型的请求接口 */
  getCreateApiAndredirectPath(type) {
    let url
    let redirectPath
    switch (type) {
      case 'purchaseIn':
      case 'returnIn':
        url = apis.EnterQuantityCreateOrder
        redirectPath = '/pages/ChannelCode/WarehouseRecordList/index?enterType=quantityEnter'
        break
      case 'saleOut':
      case 'otherOut':
        url = apis.OutQuantityCreateOrder
        redirectPath = '/pages/ChannelCode/OutWarehouseRecordList/index?enterType=quantityEnter'
        break
      case 'stockInventory':
        url = apis.InventoryQuantityCreateOrder
        redirectPath = '/pages/ChannelCode/InventoryManage/List/index?enterType=quantityEnter'
        break
    }
    return { url, redirectPath }
  }

})