// pages/Myquota/quotaUsageList/index.js
import {getQuotaDealerUsePage} from '../../../utils/ajax.js'

Page({
  changeTabs(e){ //切换tabs
    this.setData({
      checkCode:e.detail.name,
      checkName:e.detail.title,
      arrList:[],
      page:1,
      totalPages:1,
      lookStatus: true, // 重置为查看生效数据
    })
    let brandCode = e.detail.name
    let brandName = e.detail.title
    let status = 0
    this.getQuotaDealerUsePage(brandCode,brandName,status)
  },
  handelchanegtype(e){
    const {lookStatus,tabList,checkCode,checkName}=this.data
    this.setData({
      lookStatus:!lookStatus,
      page:1,
      totalPages:1,
      arrList:[]
    })
    
    let status = !lookStatus?0:1
    let brandCode = checkCode?checkCode:tabList[0].brandCode
    let brandName = checkName?checkName:tabList[0].brandName
    this.getQuotaDealerUsePage(brandCode,brandName,status)

  },
  handeltogl(e){ //去关联订单页面
    console.log(e)
      let tradeCode = e.currentTarget.dataset.code 
     wx.navigateTo({
       url:   `/pages/Myquota/quotaUsageRelevance/index?tradeCode=${tradeCode}`,
     })
  },
  handeltotz(){ //去关调整记录页面
    const { checkCode,tabList } =this.data
    let brandCode = checkCode?checkCode:tabList[0].brandCode 
    wx.navigateTo({
      url: `/pages/Myquota/quotaUsageRecord/index?brandCode=${brandCode}`,
    })
 },
 getQuotaDealerUsePage(brandCode,brandName,status){ //" status 0未失效--1失效"
   const data= {
    "conditions": {
       brandCode,
       brandName,
      "dealerCode": wx.getStorageSync('agentCode'),
      "dealerName": wx.getStorageSync('brandInfoName')[0].agentName,
       status
    },
    "page": this.data.page,
    "size": 10
   }
   if(this.data.page<=this.data.totalPages){
      getQuotaDealerUsePage(data)
          .then(resp=>{
            if(resp.data.code==200){
              if(this.data.page<=this.data.totalPages){
                  let arrList = resp.data.data.content
                  this.setData({
                    arrList:this.data.arrList.concat(arrList),
                    page:this.data.page+1,
                    totalPages:resp.data.data.totalPages
                  })
              }

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
 scrolltolower(){
   const {lookStatus,tabList,checkCode,checkName}=this.data
   let status = lookStatus?0:1
   let brandCode = checkCode?checkCode:tabList[0].brandCode
   let brandName = checkName?checkName:tabList[0].brandName
   this.getQuotaDealerUsePage(brandCode,brandName,status)
 },

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    tabList:[],
    arrList:[],
    lookStatus:true, // true查看生效，false查看失效
    page:1,
    totalPages:1,
    checkCode:"",
    checkName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tabList = wx.getStorageSync('companyList')

    this.getQuotaDealerUsePage(tabList[0].brandCode,tabList[0].brandName,0)
     this.setData({
        tabList,
        active:tabList[0].brandCode
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