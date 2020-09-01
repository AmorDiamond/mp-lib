// pages/CostUsageDetails/CostUsageDetails.js
import {DreimburseDetail} from '../../utils/ajax.js'

Page({
     handeltoDetail(id){
       const data = {
        ExpenseId:id
       }
      DreimburseDetail(data)
       .then(resp=>{
         console.log(resp)
         if(resp.data.code==200){
            let arrList = resp.data.data
            this.setData({arrList})
         }
       })
     },
  /**
   * 页面的初始数据
   */
  data: {
    accountname:"",
    money:"",
    arrList:[],
    accountnumber:'',
    company:''//公司
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const {id,accountname,money,accountnumber,canusemoney} = options
    let company = wx.getStorageSync('brandInfoName')[0].brandName || ""
     this.setData({accountname,money,company,accountnumber,canusemoney})
    this.handeltoDetail(id)
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