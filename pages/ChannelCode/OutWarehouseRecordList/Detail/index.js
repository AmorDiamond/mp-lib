import { http } from '../../../../utils/http'
import apis from '../../../../apis/ChannelScanCode/index'
import { mappingStockType, mappingStockWay, formatTimeToString } from '../../../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    hdTitle: {
      label: '出库单号',
      id: 'code'
    },
    hdItems: [
      { label: '收货方名称', id: 'consigneeName' },
      { label: '出库时间', id: 'createdTime' },
      { label: '出库数量', 
        quantity: {
          chestId: 'boxQuantity',
          boxId: 'bottleQuantity'
        },
      },
      { label: '出库类型', id: 'type' },
      { label: '出库方式', id: 'wayText' },
    ],
    rowItems: [
      { label: '', productName: true },
      { label: '数量', quantity: true },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { code } = options
    this.getDetail(code)
  },

  getDetail(code) {
    wx.showLoading({ title: '加载中...' })
    http({ url: apis.GetOutOrderDetail, data: { code } }).then(res => {
      const detail = res.data
      if (detail) {
        detail.type = mappingStockType(detail.type)
        detail.wayText = mappingStockWay(detail.way)
        detail.createdTime = formatTimeToString(detail.createdTime)
      }
      this.setData({
        detail,
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

})