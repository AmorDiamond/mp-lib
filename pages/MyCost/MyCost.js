// pages/MyCost/MyCost.js
import {thirdPartyList,getpermission} from '../../utils/ajax.js'

Page({
  handeltozlan(){
    const {brandCodes,active} =this.data
    let brand = brandCodes?brandCodes:active
    let brandname = this.data.brandName?this.data.brandName:this.data.bdname
   wx.navigateTo({
     url: `/pages/MyCostDetail/MyCostDetail?brandCode=${brand}&brandName=${brandname}`,
   })
  },

  handelgetmoList(BrandCodes){
  
   const data = {
     BrandCodes
   }
     thirdPartyList(data)
      .then(resp=>{
        if(resp.data.code){
           let moenyList = resp.data.data.costList 
           let Money = resp.data.data.sumMoney
           let TotalUsedMoney = resp.data.data.sumUsedMoney
           let CanUseMoney = resp.data.data.sumCanUseMoney
           this.setData({
             moenyList,
             Money,
             TotalUsedMoney,
             CanUseMoney
           })
        }
      })

  },
  sum(arr) {
    return arr.reduce(function(prev, curr){
        return prev + curr;
    });
 },
 getpermission(){
   const data = {
     agentCode:wx.getStorageSync('agentCode'),
      type:2
   }
  getpermission(data)
     .then(resp=>{
       if(resp.data.code==200){
          let tabList = resp.data.data
           this.setData({
             tabList,
             active:tabList[0].brandCode,
             bdname:tabList[0].brandName

            })
            this.handelgetmoList([tabList[0].brandCode])
       }else{
         wx.showToast({
           title: resp.data.msg,
           duration: 2000,
           icon: 'none',
         })
       }
     })
 },
  changetabs(e){
    this.setData({brandCodes:e.detail.name,brandName:e.detail.title})
    this.handelgetmoList([e.detail.name])
  },

  /**
   * 页面的初始数据
   */
  data: {
     moenyList:[],
     Money:'',
     TotalUsedMoney:'',
     CanUseMoney:'',
     active:0,
     tabList:[],
     brandCodes:'',
     brandName:"",
     bdname:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpermission()

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