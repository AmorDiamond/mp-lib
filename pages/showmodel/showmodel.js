// pages/showmodel/showmodel.js
const app =getApp();
import {
  setBrandInfo
} from '../../utils/ajax.js'
Page({

  onClose() {
    wx.navigateBack({
      delta: 1,
    })
  },
  quedtext(){

  },
  closemodel(){
    this.setData({ showpicker: false });
  },
  showPopup(e){
    console.log(e.currentTarget.dataset.index)
    let picindex = e.currentTarget.dataset.index
    this.setData({
      showpicker:true,
      picindex:Number(picindex)
    })
  },
  onConfirm(e){
    const {picindex} =this.data
    console.log(e)
    let value = e.detail.value
    var picV = "picValue[" + picindex + "]"
    this.setData({
      [picV]:value,
      showpicker:false
    })

  },
  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    showpicker:false,
    picindex:'',
    radio:'',
    companylist:[],
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    barndList:[{name:'国窖',id:12342},{name:'二曲',id:345353}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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