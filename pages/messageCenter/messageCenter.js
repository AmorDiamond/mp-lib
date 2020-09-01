import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageDetail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  onViewDetailHandle() {
    const title = '积分调整'
    const content = '根据国窖积分考核办法，2020年Q1季度就考核项”暗流价“，调减积分100分，请知晓！'
    Dialog.alert({
      title,
      message: content,
      messageAlign: 'left',
    }).then(() => {
      // on close
    })
  }

})