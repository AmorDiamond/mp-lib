import { http } from '../../../utils/http'
import apis from '../../../apis/ChannelScanCode/index'
import { channelCodeOption } from '../common/config.options'

Page({
  /* 上一页面扫码传过来的条码信息 */
  optionBarcodeInfo: '',
  /* 收货方类型 */
  consigneeType: '',
  /* 收货方名称 */
  consigneeName: '',
  /* 收货方编码 */
  consigneeCode: '',
  menuType: '',
  orderCode: '',
  /**
   * 页面的初始数据
   */
  data: {
    confirmSubmit: false,
    showDialog: false,
    codeList: [],
    productList: [],
    countChestNum: 0,
    countBoxNum: 0,
    differentChestNum: 0, // 异常箱数
    differentBoxNum: 0, // 异常盒数
    differentBarcodes: '', // 异常条码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const { code, barcodeInfo, menuType, orderCode } = options
    this.menuType = menuType
    this.orderCode = orderCode
    this.optionBarcodeInfo = barcodeInfo
    this.configOption = channelCodeOption[menuType]
    const title = this.configOption && this.configOption.barcodePage ? this.configOption.barcodePage.title: '扫码出入库'
    wx.setNavigationBarTitle({ title })
    if (code) {
      // 存在临时出库单，先获取出库单的条码列表
      this.getBarcodesList()
    } else if (barcodeInfo) {
      // 不存在临时出库单，上一页面有传递条码信息过来，直接展示扫码获取的条码
      // this.setData({
      //   codeList: [this.optionBarcodeInfo]
      // })
    } else {
      // 直接进行扫码操作
      const { consigneeType, consigneeName, consigneeCode } = options
      this.consigneeType = consigneeType
      this.consigneeName = consigneeName
      this.consigneeCode = consigneeCode
      this.onContinueScan()
      this.getBarcodesList()
    }
  },

  /* 获取临时出库单条码列表 */
  getBarcodesList() {
    /* const result = { codes: [] }
    // 获取完条码信息后，如果上一页面有传递条码数据过来，追加到列表里（如果扫码没有直接更新服务端数据）
    if (this.optionBarcodeInfo) {
      result.codes.push(this.optionBarcodeInfo)
    } */
    wx.showLoading({ title: '加载中...' })
    const params = { operType: this.configOption.operType }
    if (this.orderCode) {
      // 如果是待办的物流单里进入的，加上物流单号获取数据
      params.orderCode = this.orderCode
    }
    http({ url: apis.GetBarcodeListForTemp, data: params }).then(res => {
      const { datas = [], boxQuantity, bottleQuantity } = res.data || {}
      const list = datas
      this.setData({
        codeList: list,
        countChestNum: boxQuantity,
        countBoxNum: bottleQuantity,
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /* 结束扫码 */
  onCompleteScan() {
    console.log('结束扫码')
    wx.showLoading({ title: '请求中...' })
    const params = { operType: this.configOption.operType }
    if (this.orderCode) {
      // 如果是待办的物流单里进入的，加上物流单号获取数据
      params.orderCode = this.orderCode
    }
    http({ url: apis.GetMatAndBarcode, data: params }).then(res => {
      const { matCodeVos: productList = [], ebottleQuantity, eboxQuantity, exceptionBars } = res.data
      const differentBarcodes = exceptionBars && exceptionBars.join(',')
      this.setData({
        confirmSubmit: true,
        productList,
        differentChestNum: eboxQuantity,
        differentBoxNum: ebottleQuantity,
        differentBarcodes,
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /* 扫码添加条码到临时单 */
  onContinueScan() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        const barCode = ''
        this.addBarcodeToTempOrder(barCode)
      },
    })
  },
  
  /* 删除临时单里的条码 */
  onDeleteHandle(event) {
    const code = event.detail.code
    wx.showLoading({ title: '' })
    http({ url: apis.DeleteBarcodeForTempOrder, data: { barCode: code}, method: 'DELETE' }).then(res => {
      this.getBarcodesList()
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /* 手动输入条码，直接将输入的条码保存到临时单 */
  onInputSubmitHandle(event) {
    const barCode = event.detail.value
    this.addBarcodeToTempOrder(barCode)
  },

  /* 往临时单里添加条码 */
  addBarcodeToTempOrder(barCode) {
    wx.showLoading({ title: '' })
    const { addTempUrl: url } = this.getRequestApiAndredirectPath(this.configOption.handleType)
    const params = { operType: this.configOption.operType, barCode }
    if (this.orderCode) {
      params.orderCode = this.orderCode
    }
    // 保存到临时单
    http({ url: url, data: params }).then(res => {
      this.getBarcodesList()
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /* 提交 */
  onOpenDialogHandle() {
    if (!this.data.productList || this.data.productList.length == 0) {
      wx.showToast({ title: '条码不能为空', icon: 'none' })
      return
    }
    this.setData({
      showDialog: true,
    })
  },

  onDialogCancelHandle() {},

  /* 提交请求数据 */
  confirmSubmitHandle() {
    wx.showLoading({ title: '请求中...' })
    const { createOrderUrl: url, redirectPath } = this.getRequestApiAndredirectPath(this.configOption.handleType)
    const params = { operType: this.configOption.operType }
    if (this.orderCode) {
      // 如果是待办的物流单里进入的，加上物流单号获取数据
      params.orderCode = this.orderCode
    }
    http({ url, data: params, method: 'POST' }).then(res => {
      wx.showToast({ title: '操作成功',success: () => {
        // 进入记录列表
        // wx.redirectTo({ url: redirectPath })
        this.completeRedirectPath(redirectPath)
      } })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /* 创建成功后回到对应列表页 */
  completeRedirectPath(redirectPath) {
    if (this.configOption.handleType !== 'inventory') {
      // 如果不是盘点
      if (this.orderCode) {
        // 待办-物流单进入的
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

  /* 获取往临时单添加条码对应接口 */
  getRequestApiAndredirectPath(type) {
    let addTempUrl
    let createOrderUrl
    let redirectPath
    switch (type) {
      case 'enter':
        addTempUrl = apis.EnterScanSaveTemOrder
        createOrderUrl = apis.EnterScanCreateOrder
        redirectPath = `/pages/ChannelCode/WarehouseRecordList/index?enterType=scanEnter&enterMenuType=${this.menuType}`
        break
      case 'out':
        addTempUrl = apis.OutScanSaveTemOrder
        createOrderUrl = apis.OutScanCreateOrder
        redirectPath = `/pages/ChannelCode/OutWarehouseRecordList/index?enterType=scanEnter&enterMenuType=${this.menuType}`
        break
      case 'inventory':
        addTempUrl = apis.InventoryScanSaveTempOrder
        createOrderUrl = apis.InventoryScanCreateOrder
        redirectPath = `/pages/ChannelCode/InventoryManage/List/index?enterType=scanEnter&enterMenuType=${this.menuType}`
        break
    }
    return { addTempUrl, createOrderUrl, redirectPath }
  },


})