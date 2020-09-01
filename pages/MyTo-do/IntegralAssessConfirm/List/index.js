import { http } from '../../../../utils/http'
import apis from '../../../../apis/MyTodo/index'
import { formatTimeToString, removeEmptyObjectKey } from '../../../../utils/util'

Page({
  page: 1,
  totalPages: 0,
  keyWord: '',
  searchValues: {},
  data: {
    tabTypes: [
      { title: '待处理', value: '1' },
      { title: '已处理', value: '2' },
    ],
    conditions: [
      {
        id: 'brandCode',
        title: '销售组织',
        type: 'BtnRadio',
        initialValue: '',
        options: [
          { value: '', title: '全部'},
          { value: '1', title: '国窖'},
          { value: '2', title: '特曲'},
          { value: '3', title: '二曲'},
        ]
      },
    ],
    activeType: '1',
    list: [
      {
        name: '2020年Q1季度积分考核结果确认',
        brandName: '泸州老窖国窖有限公司',
        status: 'wait'
      },
      {
        name: '2020年Q1季度积分考核结果确认',
        brandName: '泸州老窖国窖有限公司',
        time: '2020-09-09 12:12:12',
        status: 'dealing'
      }
    ],
    querying: false,
    hasMore: true,
    showFilter: false,
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
    const params = { ...this.searchValues, statusStr, name: this.keyWord, page: this.page, size: 20 }
    http({ url: apis.GetLogisticsOrderList , data: params }).then(res => {
      const list = res.data && res.data.content ? res.data.content.map(item => ({ ...item, name: `${item.name}积分考核结果确认`, time: formatTimeToString(item.createTime)})) : []
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

  onSearchInputChange(e) {
    const value = e.detail.value
    this.keyWord = value
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
    this.searchValues = removeEmptyObjectKey(values)
    this.page = 1
    this.totalPages = 0
    this.setData({
      showFilter: false,
      hasMore: true,
      list: [],
    })
    this.getList()
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
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/MyTo-do/IntegralAssessConfirm/AssessPage/index?id=${id}` })
  },

})