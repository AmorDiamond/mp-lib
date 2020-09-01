// pages/orderDetails/orderDetails.js
import {orderDetail} from '../../utils/ajax.js'

Page({
  handeluplow(){//收起金额
   this.setData({showmoeny:false})
  },
  handeluplows(){
    this.setData({showmoeny:true})
  },
  handelbutton(e){
    console.log(e)
     let pageId = e.currentTarget.dataset.id
     switch(pageId){
         case 1:
          //  return wx.navigateTo({url: '/pages/LogisticsTracking/LogisticsTracking'});
             return wx.showToast({
               title: '物流跟踪功能正在开发中...',
               duration: 2000,
               icon: 'none',
             })
          case 2:
            // return wx.navigateTo({url: '/pages/DeliveryOrder/DeliveryOrder'});
            return wx.showToast({
              title: '交货单功能正在开发中...',
              duration: 2000,
              icon: 'none',
            })
     }
  },
  handelgetorderDetail(number){
    const data ={
      "Number":number
    }
    orderDetail(data)
      .then(resp=>{
        if(resp.data.code==200){
          console.log(resp)
          let moent = resp.data.data
          this.setData({
            allData:moent,

          })
        }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
   showmoeny:true,
   buttonList:[
      {id:1,name:'物流跟踪'},
      {id:2,name:'交货单'}
    ],
    allData:'',
    type:"",
    count:'',
    moeny:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({type:options.type})
    console.log(options.type)
    this.handelgetorderDetail(options.Number)
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