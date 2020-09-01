// pages/AccountDetails/AccountDetails.js
import {moneyDetail,detailTotal} from '../../utils/ajax.js'

Page({

  bindDateChange: function(e) { //开始时间
    const {brandCode } =this.data
    let startTime =  e.detail.value+" "+"00:00:00"
    let endTime = this.data.endTime?this.data.endTime+" "+"00:00:00":this.data.endTime
    this.setData({
      startTime: e.detail.value,
      page:1,
      totalPages:1,
      synList:[],
    })
    if(startTime!=""&&endTime!=""){
      if(startTime<=endTime){
        this.handelgetmoneyDetail(brandCode,startTime,endTime)
        this.getdetailTotal(brandCode,startTime,endTime)
      }else{
        this.setData({
          endTime:"",
          startTime:""
        })
        wx.showToast({
          title: '开始时间不能大于结束时间请重新选择',
          duration: 2000,
          icon: 'none',
          complete:(res)=>{
            setTimeout(() => {
              this.handelgetmoneyDetail(brandCode)
              this.getdetailTotal(brandCode)
            }, 1000);
          }
        })

      }
  }else{
    this.handelgetmoneyDetail(brandCode,startTime,endTime)
    this.getdetailTotal(brandCode,startTime,endTime)
  }
  },
  bindDateChangeend(e){//结束时间
    const {brandCode ,brandName} =this.data
    let endTime =  e.detail.value+" "+"00:00:00"
    let startTime = this.data.startTime?this.data.startTime+" "+"00:00:00":this.data.startTime
    this.setData({
      endTime: e.detail.value,
      page:1,
      totalPages:1,
      synList:[],
    })
    if(startTime!=""&&endTime!=""){
      if(startTime<=endTime){
        this.handelgetmoneyDetail(brandCode,startTime,endTime)
        this.getdetailTotal(brandCode,startTime,endTime)
      }else{
        this.setData({
          endTime:"",
          startTime:""
        })
        wx.showToast({
          title: '开始时间不能大于结束时间请重新选择',
          duration: 2000,
          icon: 'none',
          complete:(res)=>{
            setTimeout(() => {
              this.handelgetmoneyDetail(brandCode)
              this.getdetailTotal(brandCode)
            }, 1000);
          }
        })

      }
  }else{
    this.handelgetmoneyDetail(brandCode,startTime,endTime)
    this.getdetailTotal(brandCode,startTime,endTime)
  }
  },
  handeltomore(){
    this.setData({showmore:!this.data.showmore})
  },
  handelgetmoneyDetail(brandCodes,startDate="",endDate=""){
    const data = {
      page:this.data.page,
      size:10,
      brandCodes,
      agentCode: wx.getStorageSync('agentCode'),
      startDate,
      endDate
    }
    let datas = {}
    for(let i in data){
       if(data[i]){
        datas[i] = data[i]
       }
    }
  if(this.data.page <= this.data.totalPages){
    moneyDetail(datas)
       .then(resp=>{
         if(resp.data.code==200){
            let content = resp.data.data.content
            this.setData({
              page:this.data.page+1,
              totalPages:resp.data.data.totalPages,
              synList:this.data.synList.concat(content)
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
    const {brandCode} =this.data
    let endTime = this.data.endTime?this.data.endTime+" "+"00:00:00":this.data.endTime
    let startTime = this.data.startTime?this.data.startTime+" "+"00:00:00":this.data.startTime
    this.handelgetmoneyDetail(brandCode,startTime,endTime)
  },
  getdetailTotal(brandCodes,startDate="",endDate=""){
    const data = {
      brandCodes,
      dealerCode:wx.getStorageSync('agentCode'),
      startDate,
      endDate,
    }
    let datas = {}
    for(let i in data){
       if(data[i]){
        datas[i] = data[i]
       }
    }
    detailTotal(datas)
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
  handeltoreset(){
    const {brandCode} =this.data
    this.setData({
      page:1,
      totalPages:1,
      synList:[],
      startTime:"",
      endTime:""
    })
    this.handelgetmoneyDetail(brandCode)
  },
  /**
   * 页面的初始数据
   */
  data: {
    startTime:'',
    endTime:'',
    showmore:false, //展示跟多数据,
    page:1,
    totalPages:1,
    synList:[],
    company:"",
    total:'',
    brandCode:'',
    brandName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getdetailTotal([options.brandCode])
     this.handelgetmoneyDetail([options.brandCode])
     this.setData({
       company:options.brandName,
       brandCode:options.brandCode.split(),
       brandName:options.brandName
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