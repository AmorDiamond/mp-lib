import { http } from '../../../../utils/http'
import apis from '../../../../apis/ChannelScanCode/index'
import { mappingStockWay, formatTimeToString } from '../../../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    hdTitle: {
      label: '盘点单号',
      id: 'code'
    },
    hdItems: [
      { label: '盘点时间', id: 'checkTime' },
      { label: '盘点数量', 
        quantity: {
          chestId: 'boxQuantity',
          boxId: 'bottleQuantity'
        },
      },
      { label: '盘点方式', id: 'way' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const code = options.code
    this.getDetail(code)
  },

  getDetail(code) {
    wx.showLoading({ title: '请求中...' })
    http({ url: apis.GetInventoryDetail, data: { code } }).then(res => {
      const detail = res.data
      if (detail) {
        detail.way = mappingStockWay(detail.way)
        detail.checkTime = formatTimeToString(detail.checkTime)
      }
      this.setData({
        detail,
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

})