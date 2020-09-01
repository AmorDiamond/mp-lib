// pages/Myquota/quotaUsageRecord/index.js
import { agentHistory } from '../../../utils/ajax.js'

Page({
  handeltoDetails(e){
    const {itemList}=this.data
   let id = e.currentTarget.dataset.id
   let filtvalue = itemList.filter(item=>item.id==id)
    let data = JSON.stringify(filtvalue)
    wx.navigateTo({
      url: `/pages/Myquota/quotaUsageDetails/index?data=${data}`,
    })
  },
  funagentHistory(quotaDetailId){
    const data = {
      quotaDetailId,

    }
    agentHistory(data)
      .then(resp=>{
        if(resp.data.code==200){
          let itemList = resp.data.data
          this.setData({
            itemList,
          })
        } 
      })

  },
  /**
   * 页面的初始数据
   */
  data: {
    itemList:[],
    tradeCode:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({tradeCode:options.tradeCode || ''})
     this.funagentHistory(2)//options.brandCode
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