// pages/Myquota/createtory/index.js
import { ossHttp } from '../../../utils/oss'
import { getAllmatByDealer, nextTask, checkStockSave } from '../../../utils/ajax.js'
import { http } from '../../../utils/http';
import apis from '../../../apis/MyQuota/index'
const app = getApp();
// 控制首次渲染onShow生命周期是否操作盘点的数据
let pageOnLoaded = false
Page({
  checkItem: [],
  afterRead(event) {
    console.log(event)
    const { file } = event.detail;
    let brandCode = event.currentTarget.dataset.brandcode
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // 上传完成需要更新 fileList
    ossHttp.put('dealer-stock-check/certificate', file.path).then(result => {
      console.log('ossImg', result)
      const { fileList = {} } = this.data;
      fileList[brandCode] = [{ ...file, url: result.url }];
      this.setData({ fileList });
      wx.setStorageSync('fileList', fileList)

    })
  },
  handelDelete(e) {

    const brandCode = e.currentTarget.dataset.brandcode
    const { fileList } = this.data
    delete fileList[brandCode]
    this.setData({
      fileList,
    })
    wx.setStorageSync('fileList', fileList)
  },
  handeltoDetails(e) {
    let prodBarcode = e.currentTarget.dataset.id
    let matName = e.currentTarget.dataset.name
    let brandCode = e.currentTarget.dataset.brandcode

    this.setData({ prodBarcode })
    wx.navigateTo({
      url: `/pages/Myquota/Myquota/index?id=${prodBarcode}&matName=${matName}&brandCode=${brandCode}`,
    })
  },
  handeltonewspage(e) {

    let id = e.currentTarget.dataset.id
    let brandCode = e.currentTarget.dataset.brandcode
    let ids = JSON.stringify(id)
    wx.navigateTo({
      url: `/pages/Myquota/createtory/choosePage/index?id=${ids}&brandCode=${brandCode}`,
    })
  },
  haneltootherpage(e) {

    let index = e.currentTarget.dataset.index
    let brandCode = e.currentTarget.dataset.brandcode
    wx.navigateTo({
      url: `/pages/Myquota/SearchMaterial/index?index=${index}&brandCode=${brandCode}`,
    })
  },

  handellong() {
    this.setData({ material: !this.data.material })
  },

  getAllMatList() {
    if (this.checkItem && this.checkItem.length > 0) {
      wx.showLoading({title: '加载中...'})
      let promiseAll = []
      this.checkItem.forEach(item => {
        const { brandCode, inventoryEndTime } = item
        const data = { brandCode, dealerCode: wx.getStorageSync('agentCode'), inventoryEndTime }
        // 获取物料信息
        let getMatList = http({url: apis.getAllmatByDealer, data, method: 'POST'})
        // 获取下一节点审批人信息
        let getNextApprover = http({url: apis.nextTaskAgent, data: { brandCode }})
        promiseAll.push(getMatList, getNextApprover)
      })
      Promise.all(promiseAll).then(result => {
        let index = 0
        let checkItem = this.checkItem.map((item) => {
          const matList = result[index].data
          const nextApprover = result[index + 1].data
          item.arrList = matList
          item.nextTask = nextApprover
          index += 2
          return item
        })
        wx.setStorageSync('checkItem', checkItem)
        this.setData({
          weaperList: checkItem,
        })
        pageOnLoaded = true
      }).finally(() => {
        wx.hideLoading()
      })
    }
  },

  handelDelper(e) {
    let weaperList = [...this.data.weaperList]
    const brandCode = e.currentTarget.dataset.brandcode
    // 删除对应品牌的审批人
    weaperList = weaperList.map(item => {
      if (item.brandCode == brandCode) {
        item.userole = []
      }
      return item
    })
    this.setData({ weaperList })
  },

  checkStockSave() {
    const { weaperList, fileList } = this.data

    console.log(weaperList)
    const isNoApprover = weaperList.some(item => !item.userole || item.userole.length == 0)
    const isNoMaterial = weaperList.some(item => !item.arrList || item.arrList.length == 0)
    if (isNoApprover) {
      wx.showToast({ title: '请选择审批人', icon: 'none' })
      return
    }
    if (isNoMaterial) {
      wx.showToast({ title: '盘点物料不能为空', icon: 'none' })
      return
    }
    const data = weaperList.map(item => {
      const stockCertificate = fileList[item.brandCode] && fileList[item.brandCode][0].url
      let value = {
        "brandCode": item.brandCode,
        "brandName": item.brandName,
        "checkStockSaveDetailReqVos": item.arrList,
        "dataSource": "DEALER",
        "dealerCode": wx.getStorageSync('agentCode'),
        "dealerName": this.data.agenName,
        "description": item.description,
        "inventoryBegineTime": item.inventoryBegineTime,
        "inventoryEndTime": item.inventoryEndTime,
        "stockCertificate": stockCertificate,
        "workflowReqVos": {
          "name": 'candidateUsers',
          "userId": item.userole ? item.userole.map(item => item.id) : []
        }
      }

      return value
    })
    wx.showLoading({ title: '' })
    http({ url: apis.checkStockSave, data, method: 'POST' }).then(res => {
      /* 新增后库存盘点记录列表重新请求数据处理 */
      const pages = getCurrentPages()
      const prevPage = pages[pages.length - 2] //上一个页面
      wx.navigateBack({
        success: (res) => {
          // 新增成功后，触发库存盘点记录列表查询最新数据
          if ( prevPage.route == 'pages/Myquota/inventory/index' ) {
            // 确认是库存盘点记录列表页面
            prevPage.setData({ page: 1, arrList: [] }) // 重置查询page为1，列表数据为空，重新请求
            const { statusId, endTime, startTime } = prevPage.data.searchDetail
            prevPage.queryDHistory && prevPage.queryDHistory(statusId, endTime, startTime, prevPage.data.inputvalue)
          }
        }
      })
    }).finally(() => {
      wx.hideLoading()
    })

  },

  handelgetSave() {
    this.checkStockSave()
  },

  handelDetail(e) {
    const { weaperList } = this.data
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index

    weaperList[index].arrList = weaperList[index].arrList.filter(item => item.prodBarcode != id)

    wx.setStorageSync('checkItem', weaperList)

    this.setData({ weaperList })
  },

  /**
   * 页面的初始数据
   */
  data: {
    fileList: {},
    arrList: [],
    rovalname: [],
    addindex: '',
    prodBarcode: '',
    material: false,
    agenName: '',
    indeximg: '',
    temporary: [],
    weaperList: [], //最外层循环
    checkItem: [],
    oldvalue: [],
    dataObj: '',
    nextMonthOrderNum: '',
    moveNum: '',
    nowRealStock: '',
    overNum: '',
    addsearch: [],//新整加物料
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(app)
    let agenName = wx.getStorageSync('brandInfoName')[0].agentName
    let checkItem = wx.getStorageSync('checkItem') || []
    // let temporary = wx.getStorageSync('temporary')
    let fileList = wx.getStorageSync('fileList') || {}

    this.checkItem = checkItem
    this.setData({
      agenName,
      fileList,
      weaperList: checkItem,
    })
    this.getAllMatList()

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
    if (pageOnLoaded) {
      let checkItem = wx.getStorageSync('checkItem')
      this.setData({
        weaperList: checkItem,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync('checkItem')
    wx.removeStorageSync('fileList')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})