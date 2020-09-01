// pages/MyClientDetail/MyClientDetail.js
import {customerskids} from '../../utils/ajax.js'

Page({
     handelgetkids(id,agentcode,brandcode){
       const data = {
         page:this.data.page,
         size:10,
         brandCode:brandcode,
         agentCode:agentcode,
         belongAreaCode:id
        }
        if(this.data.page<=this.data.totalPages){
      customerskids(data)
         .then(resp=>{
           if(resp.data.code==200){
              console.log(resp)
              let childer = resp.data.data.content
              this.setData({
                childer:this.data.childer.concat(childer),
                page:this.data.page+1,
                totalPages:resp.data.data.totalPages,
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
       const {id,agentcode,brandcode} =this.data
       this.handelgetkids(id,agentcode,brandcode)
     },
  /**
   * 页面的初始数据
   */
  data: {
    childer:[],
    page:1,
    totalPages:1,
    id:"",
    agentcode:"",
    brandcode:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id,agentcode,brandcode} =options
    this.setData({id,agentcode,brandcode})
    this.handelgetkids(id,agentcode,brandcode)
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