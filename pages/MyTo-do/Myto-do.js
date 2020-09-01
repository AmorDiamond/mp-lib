// pages/MyTo-do/Myto-do.js
Page({
  handeltopic(e) {
    console.log(e)
    let picId = e.currentTarget.dataset.id
    const menuInfo = this.data.arrpic.find(item => item.id == picId)
    const url = menuInfo && menuInfo.url
    url && wx.navigateTo({ url })
  },
  /**
   * 页面的初始数据
   */
  data: {
    arrpic: [
      { id: 1, pic: '../../img/yijian.png', name: '一键入库', url: '/pages/MyTo-do/OneClickWarehouse/List/index' },
      { id: 2, pic: '../../img/wuliu.png', name: '货物调拨', url: '/pages/MyTo-do/GoodsTransfer/TaskList/index' },
      { id: 3, pic: '../../img/zx.png', name: '执行案确认', url: '/pages/perform/perform' },
      { id: 4, pic: '../../img/qitadb.png', name: false, dealerShow: true, url: '/pages/MyTo-do/IntegralAssessConfirm/List/index' },
      // { id: 1, pic: '../../img/ws3.png', name: '一键入库' },
      // { id: 2, pic: '../../img/ws1.png', name: '货物调拨' },
      // { id: 4, pic: '../../img/ws2.png', name: false, dealerShow: true }

    ],
    type: wx.getStorageSync('accountType')

  },
})