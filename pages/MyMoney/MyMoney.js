// pages/MyMoney/MyMoney.js
import {moneySummary,getpermission} from '../../utils/ajax.js'
import {formatTime} from '../../utils/util.js'
Page({
  handeltoNext(e){
    let brandCode = e.currentTarget.dataset.id
    let brandName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/AccountDetails/AccountDetails?brandCode=${brandCode}&brandName=${brandName}`
    })
  },

  handelgetSummary(brandCode){
   let time = new Date()
   let DateTime = formatTime(time).split(" ")
   let endDate = DateTime[0].replace(/-/g,"")
    const data = {
      brandCodes:brandCode,
      code:wx.getStorageSync('agentCode'),
      endDate
    }
    moneySummary(data)
       .then(resp=>{
         if(resp.data.code==200){
            let summary = resp.data.data
             this.setData({summary})
         }else{
           wx.showToast({
             title: resp.data.msg,
             duration: 2000,
             icon: 'none',
           })
         }
       })
  },
  onChangeScorll(e){
    let brandCode = e.detail.name
    this.setData({
      brandName:e.detail.title
    })
    this.handelgetSummary([brandCode])
  },
  getpermission(){
    const data = {
      agentCode:wx.getStorageSync('agentCode'),
       type:1
    }
   getpermission(data)
      .then(resp=>{
        if(resp.data.code==200){
           let tabList = resp.data.data
            this.setData({tabList})
        }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    summary:'',
    active: 0,
    tabList:[],
    brandName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tabList = wx.getStorageSync('companyList')
    let tabs = tabList.shift()
    this.handelgetSummary([tabs.brandCode])
    this.getpermission()
    console.log(tabs.brandCode)
    this.setData({
       active : tabs.brandCode,
       brandName:tabs.brandName
    })
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