// pages/MyContract/ContractDel/index.js
import {achieve} from "../../../utils/ajax.js";

Page({
  handelgetachieve(brandCodes){
    const data = {
      brandCodes
    }
    achieve(data)
     .then(resp=>{
       if(resp.data.code==200){
         let contractde = resp.data.data
         this.setData({contractLsit:contractde})
       }else {
         wx.showToast({
           title: resp.data.msg,
           duration: 2000,
           icon: 'none',
         })
       }

     })
  },
  onChangeScorll(e){ //tabs切换
    console.log(e)
    this.handelgetachieve([e.detail.name])
    
  },

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[],
    active:0 ,
    contractLsit:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let companyall = wx.getStorageSync('companyList') 
    let bands = companyall.map(item => item.brandCode)
    this.handelgetachieve([bands[0]])
     this.setData({
       tabList:this.data.tabList.concat(wx.getStorageSync('companyList')),
       active:bands[0]
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