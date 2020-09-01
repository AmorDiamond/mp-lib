// pages/MyContract/MyContract.js
import {contractsList} from '../../utils/ajax.js'

Page({
  handelsreach(e){
    const {brandCodes,active} =this.data
    let brands = brandCodes?brandCodes:active
    this.setData({page:1,totalPages:1,arrList:[]},()=>{
      if(this.data.history){
       this.handelgetsList("TERMINATED",this.data.inputvalue,[brands])
      }else{
       this.handelgetsList("IN_EFFECT",this.data.inputvalue,[brands])
      }
  })
  },
  handelchaneg(e){
   this.setData({
     inputvalue:e.detail.value
   })
  },
  handeltoDetail(e){
    const {history} =this.data
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/ContractDetail/ContractDetail?come=${history}&id=${id}`,

    })
  },
  handeltoHistory(){
    const {brandCodes,active} =this.data
    let brands = brandCodes?brandCodes:active
   this.setData({history:!this.data.history,page:1,totalPages:1,arrList:[],inputvalue:''},()=>{
       if(this.data.history){
        this.handelgetsList("TERMINATED",undefined,[brands])
       }else{
        this.handelgetsList("IN_EFFECT",undefined,[brands])
       }
   })
   
  },
   handelgetsList(status="IN_EFFECT",NumberOrName="",BrandCodes){

     const data = {
       page:this.data.page,
       size:10,
       ContractStatus:status,
       NumberOrName,
       BrandCodes
     }
     if(this.data.page<=this.data.totalPages){
    contractsList(data)
      .then(resp=>{
         if(resp.data.code==200){
           console.log(resp)
           let arrList = resp.data.data.content
           this.setData({
             arrList:this.data.arrList.concat(arrList),
             page:this.data.page+1,
             totalPages:resp.data.data.totalPages
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
   hadnellower(){
    this.handelgetsList()
   },
   changelibs(e){
     let brandCodes = e.detail.name
     this.setData({
       page:1,
       totalPages:1,
       arrList:[],
       inputvalue:"",
       brandCodes
     })
     if(this.data.history){
      this.handelgetsList("TERMINATED",undefined,[brandCodes])
     }else{
      this.handelgetsList("IN_EFFECT",undefined,[brandCodes])
     }
   },
  /**
   * 页面的初始数据
   */
  data: {
    history:false,
    arrList:[],
    totalPages:1,
    page:1,
    inputvalue:'',
    active:0,
    tabList:[],
    brandCodes:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let companyList = wx.getStorageSync('companyList')
    let brandCodes = companyList.map(item => item.brandCode)
    this.handelgetsList(undefined,undefined,[brandCodes[0]])
    this.setData({
      tabList:wx.getStorageSync('companyList'),
      active:brandCodes[0]
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