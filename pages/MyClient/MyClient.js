// pages/MyClient/MyClient.js
import {customersList,customercounts} from '../../utils/ajax.js'

Page({
  handelzduan(){
    this.setData({showzduan:true,showjx:false,customerList:[],page:1,totalPages:1})
    this.handelgetcustomer()
  },
  handelzjx(){
    this.setData({showzduan:false,showjx:true,customerList:[],page:1,totalPages:1})
    this.handelgetcustomer(1)
  },
  handeltogl(e){
    let id = e.currentTarget.dataset.id
    let agentcode =  e.currentTarget.dataset.agentcode
    let brandcode =  e.currentTarget.dataset.brandcode

    wx.navigateTo({
      url: `/pages/MyClientDetail/MyClientDetail?id=${id}&agentcode=${agentcode}&brandcode=${brandcode}`,
    })
  },
  handelgetcustomer(type=''){
    const data = {
     page:this.data.page,
     size:10,
     brandCode:wx.getStorageSync('brandInfoName')[0].brandCode,
     agentCode:wx.getStorageSync('agentCode'),
     agentType:type, //我的客户0是终端1是特约 和登录不一样
    }
    if(this.data.page<=this.data.totalPages){
    customersList(data)
       .then(resp=>{
         if(resp.data.code==200){
           console.log(resp)
           let customerList = resp.data.data.content
           this.setData({
             customerList:this.data.customerList.concat(customerList),
             totalPages:resp.data.data.totalPages,
             page:this.data.page+1
           })
         }
       })
      }else{
        wx.showToast({
          title: '没有更多了...',
          duration: 2000,
          icon: 'none',
        })
      }
  },
  lower(e){
    if(this.data.showjx){
      this.handelgetcustomer(1)
    }else if(this.data.showzduan){
      this.handelgetcustomer()
    }
   },
   handelgetCount(){
     const data ={
      brandCode:wx.getStorageSync('brandInfoName')[0].brandCode,
      agentCode:wx.getStorageSync('agentCode'),
     }
    customercounts(data)
       .then(resp=>{
        if(resp.data.code==200){
          let conuts = resp.data.data
          this.setData({conuts})
        }
       })
   },
  /**
   * 页面的初始数据
   */
  data: {
    showzduan:false,
    showjx:true,
    accountType:"",
    customerList:[],
    page:1,
    totalPages:1,
    conuts:'' //数量

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const accountType = wx.getStorageSync('accountType')
    this.setData({accountType})
    this.handelgetcustomer(accountType==1?1:'')
    this.handelgetCount()
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