// pages/GuaranteDetails/GuaranteDetails.js
import {depositDetail,getpermission,depositTal} from '../../utils/ajax.js'

Page({
  bindDateChange: function(e) { //开始时间
    const { brandName ,brandCode} =this.data
    let startTime =  e.detail.value+" "+"00:00:00"
    let endTime = this.data.endTime?this.data.endTime+" "+"00:00:00":this.data.endTime
    this.setData({
      startTime: e.detail.value,
      page:1,
      totalPages:1,
      descrList:[],
    })
  console.log(startTime,endTime)
    if(startTime!=""&&endTime!=""){
      if(startTime<=endTime){
        this.handelgetdeposit(brandName,startTime,endTime,brandCode)
        this.getdepositTal(brandCode,startTime,endTime)
      }else{
        this.setData({
          endTime:"",
          startTime:""
        })
        wx.showToast({
          title: '开始时间不能大于结束时间',
          duration: 2000,
          icon: 'none',
          complete:()=>{
            setTimeout(() => {
              this.handelgetdeposit(brandName,undefined,undefined,brandCode)
              this.getdepositTal(brandCode)
            }, 1000);
          }
        })
        
      }
  }else{
    this.handelgetdeposit(brandName,startTime,endTime,brandCode)
    this.getdepositTal(brandCode,startTime,endTime)
  }
  
  },
  bindDateChangeend(e){//结束时间
    const { brandName ,brandCode} =this.data
    let endTime =  e.detail.value+" "+"00:00:00"
    let startTime = this.data.startTime?this.data.startTime+" "+"00:00:00":this.data.startTime
    this.setData({
      endTime: e.detail.value,
      page:1,
      totalPages:1,
      descrList:[],
    })
    console.log(startTime,endTime)
    if(startTime!=""&&endTime!=""){
      if(startTime<=endTime){
        this.handelgetdeposit(brandName,startTime,endTime,brandCode)
        this.getdepositTal(brandCode,startTime,endTime)
      }else{
        this.setData({
          endTime:"",
          startTime:""
        })
        wx.showToast({
          title: '开始时间不能大于结束时间',
          duration: 2000,
          icon: 'none',
          complete:(res)=>{
            setTimeout(() => {
              this.handelgetdeposit(brandName,undefined,undefined,brandCode)
              this.getdepositTal(brandCode)
            }, 1000);
          }
        })

      }
  }else{
    this.handelgetdeposit(brandName,startTime,endTime,brandCode)
    this.getdepositTal(brandCode,startTime,endTime)

  }

  },
  handeltomore(){
    this.setData({showmore:!this.data.showmore})
  },

  handelgetdeposit(brandName,startDate="",endDate="",brandCodes=""){
    const data = {
      page:this.data.page,
      size:10,
      brandName,
      startDate,
      endDate,
      brandCodes
    }

    if(this.data.page <= this.data.totalPages){
    depositDetail(data)
       .then(resp=>{
         if(resp.data.code==200){
            let content = resp.data.data.content
            content.map(item=>{
              let time = item.recordDate.split(" ")
               item.changeTime = time[0]
               return content
            })
           
            this.setData({
              page:this.data.page+1,
              totalPages:resp.data.data.totalPages,
              descrList:this.data.descrList.concat(content)
            })
        }else{
          wx.showToast({
            title: resp.data.msg,
            duration: 2000,
            icon: 'none',
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
  scrolltolower(){
    const {brandName,startDate,endDate,brandCode} =this.data
    this.handelgetdeposit(brandName,startDate,endDate,brandCode)
  },
  getpermission(){
    const data = {
      agentCode:wx.getStorageSync('agentCode'),
       type:3
    }
   getpermission(data)
      .then(resp=>{
        if(resp.data.code==200){
           let tabList = resp.data.data
            this.setData({tabList})
        }
      })
  },
  onChangeScorll(e){
    let brandName = e.detail.title
    let  brandCode = e.detail.name
    this.setData({
      brandName:e.detail.title,
      page:1,
      totalPages:1,
      descrList:[],
      startTime:"",
      endTime:""
    })
    this.handelgetdeposit(brandName,undefined,undefined,[brandCode])
  },
  getdepositTal(brandCodes,startDate="",endDate=""){
    const datas = {
      brandCodes,
      startDate,
      endDate,
      dealerCode:wx.getStorageSync('agentCode')
    }
     let data = {}
    for(let i in datas){
       if(datas[i]){
        data[i] = datas[i]
       }
    }
    depositTal(data)
       .then(resp=>{
         if(resp.data.code==200){
            this.setData({
               total:resp.data.data
            })
         }else{
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
    startTime:'',
    endTime:'',
    showmore:false,
    page:1,
    totalPages:1,
    descrList:[],
    brandName:'',
    company:"",
    tabList:[],
    total:'',
    brandCode:'',
    height:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpermission()
    this.handelgetdeposit(options.brandName,undefined,undefined,[options.brandCode])
    this.getdepositTal([options.brandCode])
    let libs = wx.getStorageSync('brandInfoName')[0].brandName
    let tabList = wx.getStorageSync('companyList')
    let tabs = tabList.shift()
    this.setData({
        brandName:options.brandName,
        brandCode:options.brandCode.split(),
        company:libs,
        active : tabs.brandCode,
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