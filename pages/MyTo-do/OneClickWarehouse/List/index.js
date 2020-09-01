import { http } from '../../../../utils/http'
import apis from '../../../../apis/MyTodo/index'
import { formatTimeToString } from '../../../../utils/util'

Page({
  page: 1,
  totalPages: 0,
  keyWord: '',
  data: {
    tabTypes: [
      { title: '待处理', value: '1' },
      { title: '已处理', value: '2' },
    ],
    activeType: '1',
    list: [],
    querying: false,
    hasMore: true,
  },

  onLoad(options) {
    this.getList()
  },

  getList() {
    if (this.data.querying) {
      return
    }
    const isFirstLoad = !this.data.list || this.data.list.length == 0
    isFirstLoad && wx.showLoading({ title: '加载中...' })
    this.setData({ querying: true })
    let statusStr
    if (this.data.activeType == 1) {
      // 待处理包括 wait:待处理， dealing:处理中
      statusStr = ['wait', 'dealing'].join(',')
    } else {
      // finish:处理完成
      statusStr = ['finish'].join(',')
    }
    const params = { statusStr, logisticsNo: this.keyWord, page: this.page, size: 20 }
    http({ url: apis.GetLogisticsOrderList , data: params }).then(res => {
      const list = res.data && res.data.content ? res.data.content.map(item => ({ ...item, name: `物流单${item.logisticsNo}入库管理`, time: formatTimeToString(item.signInDate)})) : []
      this.totalPages = res.data.totalPages
      const hasMore = this.totalPages > this.page
      this.setData({
        list: [ ...this.data.list, ...list],
        hasMore,
      })
    }).finally(() => {
      isFirstLoad && wx.hideLoading()
      this.setData({ querying: false })
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

  onTabChange(e) {
    const type = e.detail.name
    this.page = 1
    this.totalPages = 0
    this.setData({
      activeType: type,
      hasMore: true,
      list: [],
    })
    this.getList()
  },

  onGotoDetail(e) {
    const { code } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/MyTo-do/OneClickWarehouse/Detail/index?code=${code}` })
  },

})