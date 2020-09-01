import { http } from '../../../../utils/http'
import apis from '../../../../apis/MyTodo/index'
import { mappingStockType, formatTimeToString } from '../../../../utils/util'

Page({
  orderCode: '',
  data: {
    rowTitle: {
      label: '入库单号',
      id: 'code',
    },
    rowItems: [
      {
        label: '调拨时间',
        id: 'createdTime'
      },
      {
        label: '调拨数量',
        quantity: {
          chestId: 'boxQuantity',
          boxId: 'bottleQuantity',
        }
      },
      {
        label: '入库类型',
        id: 'type',
      }
    ],
    list: [],
  },

  onLoad(options) {
    this.orderCode = options.code
    this.getList()
  },

  getList() {
    wx.showLoading({ title: '加载中...' })
    const params = { aoCode: this.orderCode }
    http({ url: apis.GetTransferTaskOrderList , data: params }).then(res => {
      const list = res.data && res.data ? res.data.map(item => ({ ...item, type: mappingStockType(item.type), createdTime: formatTimeToString(item.createdTime)})) : []
      this.setData({
        list,
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  onSearchHandle(e) {
    const value = e.detail.value
    this.keyWord = value
    this.page = 1
    this.totalPages = 0
    this.setData({
      hasMore: true,
      list: [],
    })
    this.getList()
  },

  onScrolListHandle() {
    if (this.data.hasMore) {
      this.page += 1 
      this.getList()
    }
  },

  onGotoDetail(e) {
    const { code } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/ChannelCode/WarehouseRecordList/Detail/index?code=${code}` })
  },

})