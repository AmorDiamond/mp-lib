import { http } from '../../../utils/http'
import apis from '../../../apis/ChannelScanCode/index'
import { removeEmptyObjectKey, formatTimeItem, formatNumber } from '../../../utils/util'

Page({
  page: 1,
  totalPages: 0,
  searchValues: {},
  data: {
    showFilter: false,
    conditions: [
      {
        id: 'yearMonth',
        title: '年月',
        type: 'DatePicker',
        fields: 'month',
        initialValue: '',
      },
      {
        id: 'matName',
        title: '产品名称'
      }
    ],
    list: [],
    countInfo: {},
    querying: false,
    hasMore: true,
    year: '',
    month: '',
  },
  onLoad() {
    const { year, month } = formatTimeItem()
    const yearMonth = [year, month].map(formatNumber).join('-')
    this.setData({
      'conditions[0].initialValue': yearMonth,
      year,
      month,
    })
    this.getCountInfo()
    this.getList()
  },

  getCountInfo() {
    const params = { ...this.searchValues } 
    http({ url: apis.GetMyStockCountInfo, data: params }).then(res => {
      const countInfo = res.data
      const { year, month } = countInfo || {}
      this.setData({ countInfo, year, month })
    })
  },

  getList() {
    if (this.data.querying) {
      return
    }
    const isFirstLoad = !this.data.list || this.data.list.length == 0
    isFirstLoad && wx.showLoading({ title: '加载中...' })
    this.setData({ querying: true })
    const params = { ...this.searchValues ,page: this.page, size: 20 }
    http({ url: apis.GetMyStockList, data: params }).then(res => {
      const list = res.data && res.data.content ? res.data.content : []
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

  onScrollHandle(e) {
    if (this.data.hasMore) {
      this.page += 1 
      this.getList()
    }
  },

  onFilterOpenHandle() {
    this.setData({
      showFilter: true,
    })
  },

  onFilterCloseHandle() {
    this.setData({
      showFilter: false,
    })
  },

  onSubmitHandle(e) {
    const values = { ...e.detail.values }
    // 处理年-月时间为年-月-日给服务端
    // values.yearMonth = values.yearMonth ? values.yearMonth + '-01' : ''
    this.searchValues = removeEmptyObjectKey(values)
    this.page = 1
    this.totalPages = 0
    const year = values.yearMonth && values.yearMonth.split('-')[0]
    const month = values.yearMonth && values.yearMonth.split('-')[1]
    this.setData({
      showFilter: false,
      hasMore: true,
      list: [],
      year,
      month,
    })
    this.getList()
    this.getCountInfo()
  }
})