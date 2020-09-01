// pages/DeliveryOrder/DeliveryOrder.js
Page({
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none'
    });
  },
  handeltoDetail(){
    wx.navigateTo({
      url: '/pages/LogisticsDetails/LogisticsDetails',

    })
  },
  handeltoPutin(){ //入库
     wx.showActionSheet({
      itemList: ['一键入库', '扫码入库','数量入库'],
       success (res) {
        if(res.tapIndex==0){
           wx.showModal({
            title: '提示',
            confirmColor:'#006AB3',
            cancelColor:'#696969',
            content: '请确认本次入库数量60箱0盒，确认后将增加您的库存！',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }else if(res.tapIndex==1){
          console.log('扫码入库')
        }else if(res.tapIndex==2){
          console.log('数量入库')
        }
      },
     })

  },
  /**
   * 页面的初始数据
   */
  data: {
    active:0
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