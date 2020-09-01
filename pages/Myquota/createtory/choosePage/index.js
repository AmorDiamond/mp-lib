// pages/Myquota/createtory/choosePage/index.js
import {checkroleId} from '../../../../utils/ajax.js'
const app =getApp();
Page({
  brandCode: undefined,
  noop() {},
  handeltoOk(){
    const approverList = this.data.result
    if (approverList.length == 0) {
      wx.showToast({title: "请至少选择一个审批人", icon: 'none'})
    } else if (approverList.length > 1) {
      wx.showToast({title: "只能选择一个审批人", icon: 'none'})
    } else {

      let checkItem = wx.getStorageSync('checkItem')
      checkItem = checkItem.map(item => {
        if (item.brandCode == this.brandCode) {
          item.userole = approverList.map(s => {
            const [ id, name ] = s.split(',')
            return { id, name }
          })
        }
        return item
      })
      wx.setStorageSync('checkItem', checkItem)
      wx.navigateBack()
    }
    /* wx.redirectTo({
      url: `/pages/Myquota/createtory/index`,
    })
    app.userole = {
      [this.brandCode]: this.data.result
    } */

  },
  checkroleId(roleId){
    const data = {
      ids:JSON.parse(roleId)
    }
    checkroleId(data)
      .then(resp=>{
        if(resp.data.code==200){
          let value = resp.data.data
          this.setData({arrList:value})
        }
      })
  },
  onChange(event) {
    console.log(event)
    this.setData({
      result: event.detail
    });
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  /**
   * 页面的初始数据
   */
  data: {
    arrList:[],
    result:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.brandCode = options.brandCode
    this.checkroleId(options.id)
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