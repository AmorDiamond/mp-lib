// pages/MyCost/moneyall/index.js

import {getpermission} from '../../../utils/ajax.js'

Page({

  handeltopage(){
    this.getpermission(3)
  },
  handeltomoenyall(){
    this.getpermission(1)
  },
  getpermission(type){
    const data = {
       agentCode:wx.getStorageSync('agentCode'),
       type
    }
   getpermission(data)
      .then(resp=>{
        if(resp.data.code==200){
           let tabList = resp.data.data
           let tabs = [...tabList].shift()
           if(tabList.length!=0&&type==1){
            wx.navigateTo({
              url: `/pages/MyMoney/MyMoney`
            })
          }else if(tabList.length!=0&&type==3){
            wx.navigateTo({
              url: `/pages/GuaranteDetails/GuaranteDetails?brandName=${tabs.brandName}&brandCode=${tabs.brandCode}`
            })
          }else{
            wx.showToast({
              title: '你没有该权限！',
              duration: 2000,
              icon: 'none',
            })
          }

        }
      })
  },
  /**
   * 
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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