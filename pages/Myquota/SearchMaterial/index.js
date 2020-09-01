// pages/Myquota/SearchMaterial/index.js
import { getMaterialByName } from '../../../utils/ajax.js'
const app = getApp()
Page({
  brandCode: undefined,
  toggle(event) {
    const { sreachList, index } = this.data
    let { code, name } = event.currentTarget.dataset
    // 保存的盘点数据
    let checkItem = wx.getStorageSync('checkItem')
    const brandGroup = checkItem.find(item => item.brandCode == this.brandCode)
    let isHave = brandGroup && brandGroup.arrList.some(mat => mat.prodBarcode == code && mat.matName == name)
    if (isHave) {
      wx.showToast({ title: '所选物料已存在', icon: 'none' })
      return
    }
    // 不同品牌下物料号存在相同的，所以使用 "物料号" + "描述" 判断唯一
    let filterdata = sreachList.filter(({ prodBarcode, matName }) => prodBarcode == code && matName == name).map(item => ({ ...item, beginningRealStock: item.beginningRealStock || 0, nowAog: item.nowAog || 0 }))

    checkItem[index].arrList = checkItem[index].arrList ? checkItem[index].arrList.concat(filterdata) : filterdata
    wx.setStorageSync('checkItem', checkItem)
    wx.navigateBack()
    // wx.redirectTo({
    //   url: `/pages/Myquota/createtory/index?index=${index}`,
    // })
  },

  handelchaneg(e) {
    this.setData({ sreachValue: e.detail.value })
  },
  handelsreach() {
    this.getMaterialByName()
  },
  getMaterialByName() {
    const { sreachValue } = this.data
    const data = {
      conditions: {
        matName: sreachValue,
      },
      page: this.data.page,
      size: 20
    }
    if (this.data.page <= this.data.totalPages) {
      getMaterialByName(data)
        .then(resp => {
          if (resp.data.code == 200) {
            let value = resp.data.data.content
            this.setData({
              sreachList: this.data.sreachList.concat(value),
              page: this.data.page + 1,
              totalPages: resp.data.data.totalPages
            })
          }
        })
    } else {
      wx.showToast({
        title: '没有更多了...',
        duration: 2000,
        icon: 'none',
      })
    }
  },
  scrolltolower(e) {
    console.log(e)
    this.getMaterialByName()
  },
  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    sreachValue: '',
    sreachList: [],
    page: 1,
    totalPages: 1,
    filterdata: [],
    index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ index: options.index })
    this.brandCode = options.brandCode
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