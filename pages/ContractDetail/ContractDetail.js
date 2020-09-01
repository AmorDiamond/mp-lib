// pages/ContractDetail/ContractDetail.js
import { contractsDetail } from '../../utils/ajax.js'

Page({
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  handelgetDetail(id){
    const data = {
      Number:id
    }
    contractsDetail(data)
      .then(resp=>{
        if(resp.data.code==200){
           let titleDtail = resp.data.data
           let Elements = resp.data.data.ContractElements
            let PromotionalDeposit =titleDtail.PromotionalDeposit&&titleDtail.PromotionalDeposit.map(item=>{
                 item.BeginTime =  Number(item.BeginTime)
                 item.EndTime = Number(item.EndTime)
                 return item
            })

           this.setData({
            titleDtail,
            Elements,
            PromotionalDeposit
           })
        }
      })
  },

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    status:'',
    titleDtail:'',
    Elements:[],
    tabList:[],
    active:0,
    PromotionalDeposit:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id , come} = options
    this.handelgetDetail(id)
    this.setData({status:come})
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