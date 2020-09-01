// pages/MyCostDetail/MyCostDetail.js
import {reimburseDetail,reimburseList} from '../../utils/ajax.js'
Page({
  bindDateChange: function(e) { //开始时间
    const {endTime,BrandCodes } = this.data
    let startTime =  e.detail.value
    this.setData({
      startTime: e.detail.value,
      baxList:[],
      sylist:[],
      page:1,
      totalPages:1
    })
    if(startTime!=""&&endTime!=""){
      if(startTime<=endTime){
        if(this.data.checkname){
          this.handelgetbax(e.detail.value,this.data.endTime,[BrandCodes])
        }else{
          this.handelgetmx(e.detail.value,this.data.endTime,[BrandCodes])
        }
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
              if(this.data.checkname){
                this.handelgetbax(e.detail.value,this.data.endTime,[BrandCodes])
              }else{
                this.handelgetmx(e.detail.value,this.data.endTime,[BrandCodes])
              }
            }, 1000);
          }
        })

      }
  }else{
    if(this.data.checkname){
      this.handelgetbax(e.detail.value,this.data.endTime,[BrandCodes])
    }else{
      this.handelgetmx(e.detail.value,this.data.endTime,[BrandCodes])
    }
  }

  },
  bindDateChangeend(e){//结束时间
    const {startTime ,BrandCodes} = this.data
     let endTime =  e.detail.value
    this.setData({
      endTime: e.detail.value,
      baxList:[],
      sylist:[],
      page:1,
      totalPages:1
    })
    if(startTime!=""&&endTime!=""){
      if(startTime<=endTime){
        if(this.data.checkname){
          this.handelgetbax(startTime,e.detail.value,[BrandCodes])
        }else{
          this.handelgetmx(startTime,e.detail.value,[BrandCodes])
        }
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
              if(this.data.checkname){
                this.handelgetbax(undefined,undefined,[BrandCodes])
              }else{
                this.handelgetmx(undefined,undefined,[BrandCodes])
              }
            }, 1000);
          }
        })

      }
  }else{
    if(this.data.checkname){
      this.handelgetbax(this.data.startTime,e.detail.value,[BrandCodes])
    }else{
      this.handelgetmx(this.data.startTime,e.detail.value,[BrandCodes])
    }
  }

  },
  handelcheck(){ // 费用报销明细
    const {BrandCodes} =this.data
   this.setData({checkname:true,baxList:[],page:1,totalPages:1,startTime:"",endTime:""})
   this.handelgetbax(undefined,undefined,[BrandCodes])
  },
  handelcheckmix(){ // 费用使用明细
    const {BrandCodes} =this.data
    this.setData({checkname:false,sylist:[],syPages:1,pagesy:1,startTime:"",endTime:""})
    this.handelgetmx(undefined,undefined,[BrandCodes])
  },
  handeltomix(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    let AccountName = e.currentTarget.dataset.accountname
    let Money = e.currentTarget.dataset.money
    let AccountNumber = e.currentTarget.dataset.accountnumber
    let canusemoney = e.currentTarget.dataset.canusemoney

    wx.navigateTo({
      url: `/pages/CostUsageDetails/CostUsageDetails?id=${id}&money=${Money}&accountname=${AccountName}&accountnumber=${AccountNumber}&canusemoney=${canusemoney}`,

    })
  },
  handelgetmx(BeginTime="",EndTime="",BrandCodes){
    const data = {
      BrandCodes,
      page:1,
      size:10,
      BeginTime,
      EndTime,
    }
    reimburseDetail(data)
    .then(resp=>{
      if(resp.data.code==200){
        const sylist = resp.data.data
         sylist[sylist.length-1].isEnd=false
         let arrsy = this.sliceArray(sylist,10)
         this.setData({sylist:arrsy[0],arrsy})
      }
    })
  },
  handelgetbax(BeginTime="",EndTime="",BrandCodes){
    const data = {
      page:this.data.page,
      size:10,
      BrandCodes,
      BeginTime,
      EndTime,
    }
    if(this.data.page<=this.data.totalPages){
    reimburseList(data)
       .then(resp=>{
         if(resp.data.code==200){
          let baxList = resp.data.data.content
           this.setData({
             baxList:this.data.baxList.concat(baxList),
             page:this.data.page+1,
             totalPages:resp.data.data.totalPages
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
  scrollower(){ //下拉
    const {BrandCodes,startTime,endTime } =this.data
    this.handelgetbax(startTime,endTime,[BrandCodes])
  },
  scrollowersy(){
    const {arrsy} =this.data
    if(this.data.pagesy<=this.data.syPages){
      wx.showLoading({
        title: '加载中...',
        mask: true,
        success: (res) => {
            this.setData({
              sylist:this.data.sylist.concat(arrsy[this.data.pagesy]),
              pagesy:this.data.pagesy+1,
              syPages:arrsy.length-1
            })
        },
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 150)

   }else{
     wx.showToast({
       title: '没有更多了...',
       duration: 2000,
       icon: 'none',
     })
   }
  },
  sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
},

  /**
   * 页面的初始数据
   */
  data: {
    startTime:'',
    endTime:'',
    baxList:[],
    sylist:[],
    checkname:true,
    page:1,
    totalPages:1,
    pagesy:1,
    syPages:1,
    company:'',//公司
    show_per_page:10, //每页显示的数目
    arrsy:[],
    BrandCodes:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let BrandCodes = options.brandCode
    this.setData({
      BrandCodes
    })
    let company = options.brandName
    this.setData({company})
    this.handelgetbax(undefined,undefined,[BrandCodes])
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