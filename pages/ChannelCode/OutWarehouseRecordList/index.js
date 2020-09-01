import { http } from '../../../utils/http'
import apis from '../../../apis/ChannelScanCode/index'
import { mappingStockType, formatTimeToString, removeEmptyObjectKey } from '../../../utils/util'

Page({
  enterType: '',
  orderCode: '',
  page: 1,
  totalPages: 0,
  keyWord: '',
  /**
   * 页面的初始数据
   */
  data: {
    rowTitle: {
      label: '出库单号',
      id: 'code',
    },
    rowItems: [
      {
        label: '出库时间',
        id: 'createdTime'
      },
      {
        label: '收货方名称',
        id: 'consigneeName'
      },
      {
        label: '出库数量',
        quantity: {
          chestId: 'boxQuantity',
          boxId: 'bottleQuantity',
        }
      },
      {
        label: '出库类型',
        id: 'type',
      }
    ],
    conditions: [
      {
        id: 'type',
        title: '出库类型',
        type: 'BtnRadio',
        initialValue: '',
        options: [
          { value: '', title: '全部'},
          { value: 'sale', title: '销售出库'},
          { value: 'aoo', title: '调拨出库'},
          { value: 'ret', title: '退货出库'},
          { value: 'other', title: '其他出库'},
          { value: 'worn', title: '破损出库'},
        ]
      },
      {
        id: 'way',
        title: '出库方式',
        type: 'BtnRadio',
        initialValue: '',
        options: [
          { value: '', title: '全部'},
          { value: 'scan', title: '扫码出库'},
          { value: 'num', title: '数量出库'},
        ]
      },
      {
        id: ['startTime', 'endTime'],
        title: '起止时间',
        type: 'RangeDate',
        // initialValue: ['2020-07-06', '2020-10-06'],
      }
    ],
    showFilter: false,
    list: [],
    querying: false,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 保存是否创建出库单跳转进入
    this.enterType = options.enterType
    this.orderCode = options.orderCode
    this.getList()
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

  onUnload: function () {
    console.log('enterType', this.enterType)
    if (this.enterType) {
      // 如果是创建入库单进入的
      const pages = getCurrentPages()
      // 返回渠道扫码页面
      let backPageRoute = 'pages/ChannelCode/ChannelCode'
      if (this.orderCode) {
        // 如果是待办--物流单入库进入的，返回入库管理列表
        backPageRoute = 'pages/MyTo-do/OneClickWarehouse/List/index'
      }
      const backPageIndex = pages.findIndex(page => page.route == backPageRoute)
      if (backPageIndex > -1) {
        /**
         * 走页面栈中找到需要返回的页面层级，直接返回
         * 是在销毁周期执行，所以是在上一个页面里执行navigateBack，
         * 如果页面栈里，上一个页面就是需要返回的页面，则不执行navigateBack
         */
        const backLength = pages.length - 1 - backPageIndex
        // 是在上一页面执行navigateBack，所以返回层级要减一
        const delta = backLength > 1 ? backLength - 1 : 0
        delta && wx.navigateBack({ delta })
      } else {
        // 直接返回渠道扫码入口页面
        wx.redirectTo({ url: '/pages/ChannelCode/ChannelCode' })
      }
    }
  },

  getList() {
    if (this.data.querying) {
      return
    }
    const isFirstLoad = !this.data.list || this.data.list.length == 0
    isFirstLoad && wx.showLoading({ title: '加载中...' })
    this.setData({ querying: true })
    const params = { ...this.searchValues, code: this.keyWord ,page: this.page, size: 20 }
    http({ url: apis.GetOutRecordList, data: params }).then(res => {
      const list = res.data && res.data.content ? res.data.content.map(item => ({ ...item, type: mappingStockType(item.type), createdTime: formatTimeToString(item.createdTime)})) : []
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
  
  onSearchInputChange(e) {
    const value = e.detail.value
    this.keyWord = value
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
    values.startTime = values.startTime ? values.startTime + ' 00:00:00' : ''
    values.endTime = values.endTime ? values.endTime + ' 23:59:59' : ''
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
  
  onGotoDetail(e) {
    const code = e.currentTarget.dataset.code
    wx.navigateTo({ url: `/pages/ChannelCode/OutWarehouseRecordList/Detail/index?code=${code}`})
  },

})