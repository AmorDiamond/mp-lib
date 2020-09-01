// pages/Myquota/Myquota/index.js

const app = getApp()
Page({
  checkItem: [],
  computeMoveSaleNum(data) {
    const { nowRealStock, onOrder, beginningRealStock, nowAog } = data
    let nowMove = (beginningRealStock || 0) + (nowAog || 0) - (nowRealStock || 0) - (onOrder || 0)
    return nowMove
  },
  handelgetvalue(e) { //当前实物库存
    const nowRealStock = e.detail.value
    let allData = { ...this.data.allData, nowRealStock }
    allData = { ...allData, nowMove: this.computeMoveSaleNum(allData) }
    this.setData({
      allData,
    })
  },
  handelgetnowover(e) { //当前未到货
    const onOrder = e.detail.value
    let allData = { ...this.data.allData, onOrder }
    allData = { ...allData, nowMove: this.computeMoveSaleNum(allData) }
    this.setData({
      allData
    })
  },
  handelnextMonth(e) {
    const nextMonthOrderNum = e.detail.value
    let allData = { ...this.data.allData, nextMonthOrderNum }
    this.setData({ allData })
  },
  handeltosave() {
    const { allData, brandCode, matCode, matName } = this.data
    const data = allData

    let checkItem = this.checkItem.map(item => {
      if (item.brandCode == brandCode) {
        item.arrList = item.arrList.map(mat => {
          if(mat.prodBarcode == matCode && mat.matName == matName) {
            mat = { ...mat, ...data }
          }
          return mat
        })
      }
      return item
    })

    wx.setStorageSync('checkItem', checkItem)
    wx.navigateBack()

  },
  /**
   * 页面的初始数据
   */
  data: {
    allData: "",
    nextMonth: '',
    businesskey: '',
    nowNum: '',
    overNum: '',
    nowMove: '',
    datalist: [],
    detail: '',
    matCode: '',
    matName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.detail) {
      // 查看详情
      const stockMatDetail = wx.getStorageSync('stockMatDetail') || {}
      this.setData({
        detail: options.detail,
        allData: stockMatDetail
      })
    } else {
      // 新增盘点物料编辑
      this.checkItem = wx.getStorageSync('checkItem')
      const brandCode = options.brandCode
      const matCode = options.id
      const matName = options.matName
      const brandItem = this.checkItem.find(brand => brand.brandCode == brandCode)
      const allData = brandItem && brandItem.arrList.find(mat => mat.prodBarcode == matCode && mat.matName == matName)
      this.setData({
        allData,
        brandCode,
        matCode,
        matName,
      })
    }
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