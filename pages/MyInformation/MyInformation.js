// pages/MyInformation/MyInformation.js
import {appmsg} from '../../utils/ajax.js'

Page({
     handelgetmymsg(){
       const data = {
        agentCode: wx.getStorageSync('agentCode'),
       }
      appmsg(data)
        .then(resp=>{
          if(resp.data.code==200){
            console.log(resp)
              let allmsglist = resp.data.data.dealerOtherMsg || resp.data.data.otherMsg
               let agentmsg= resp.data.data
              this.setData({
                 allmsglist,
                 agentmsg
              })
          }else if(resp.data.code==10102){
             wx.showToast({
               title: resp.data.msg,
               duration: 2000,
               icon: 'none',
             })
          }
        })
     },
  /**
   * 页面的初始数据
   */
  data: {
    accountType:'',
    allmsglist:"",
    agentmsg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handelgetmymsg()
     const accountType = wx.getStorageSync('accountType')
     this.setData({accountType})

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