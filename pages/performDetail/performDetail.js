// pages/performDetail/performDetail.js
import {performOk} from '../../utils/ajax.js'

Page({
  handeltok(){
    const _this = this
    wx.showModal({
      title: '确认执行案',
      content: '是否确认执行案？确认后不可恢复！',
      success (res) {
        if (res.confirm) {
          performOk(_this.data.id)
          .then(resp=>{
            if(resp.data.code==200){
               wx.redirectTo({
                 url: '/pages/perform/perform',
               })
            }
          })
        }
      }
    })
    
   
  },
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    code:'',
    content:"",
    checkTime:"",
    budgCompC:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {name,code,content,id,checkTime,budgCompC} = options
    console.log(options)
      this.setData({
        name,code,content,id,checkTime,budgCompC
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