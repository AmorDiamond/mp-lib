import { appCenter } from '../../../core/appCetner'

Page({
  page: 1,
  data: {
    showFilter: false,
    showDialog: false,
    selectExchangeDealer: '',
    exchangeNumber: '',
    conditions: [
      { title: '起止时间', type: 'RangeDate', id: ['startTime', 'endTime'] }
    ],
    tabTypes: [
      { title: '全部', value: null },
      { title: '兑付中', value: '1' },
      { title: '已兑付', value: '2' },
      { title: '未兑付', value: '3' },
    ],
    activeType: null,
    isSpecialDealer: false,
    exchangeDealerList: [
      {
        code: 0,
        name: '美国'
      },
      {
        code: 1,
        name: '中国'
      },
    ],
    list: [
      {
        name: '2020Q1积分兑付',
        time: '2019-12-21 13:00:01',
        code: 'DF000002',
        number: 100,
        type: 'UP',
        status: 1,
        exchangeUser: '国窖公司',
      },
      {
        name: '2020Q1积分兑付',
        time: '2019-12-21 13:00:01',
        code: 'DF000002',
        number: 100,
        type: 'DOWN',
        status: 2,
        exchangeUser: '国窖公司',
      },
      {
        name: '2020Q1积分兑付',
        time: '2019-12-21 13:00:01',
        code: 'DF000002',
        number: 100,
        type: 'DOWN',
        status: 3,
        exchangeUser: '国窖公司',
      },
    ]
  },
  onLoad(options) {
    // 登录的是特约经销商
    const isSpecialDealer = appCenter.getAgentType() == 2
    this.setData({
      isSpecialDealer,
    })
  },

  getList() {

  },

  onSearchHandle(e) {},

  onListScrollHandle() {},

  onTabChange(e) {
    const type = e.detail.name
    this.setData({
      activeType: type,
    })
  },

  onSubmitHandle(e) {
    console.log(e)
    this.setData({
      showFilter: false,
    })
  },

  onOpenFilterHandle() {
    this.setData({
      showFilter: true,
    })
  },

  onCloseFilterHandle() {
    this.setData({
      showFilter: false,
    })
  },

  onConfirmHandle() {
    wx.showModal({
      title: '兑付确认',
      content: '2020年Q1季度，国窖公司已向您兑付100积分，请确认是否收到！',
      cancelText: '未兑付',
      confirmText: '已兑付',
      cancelColor: '#696969',
      confirmColor: '#006AB3',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          return false
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onGoExchangeHandle() {
    this.setData({
      showDialog: true,
    })
  },

  onPickerChangeHandle(e) {
    console.log(e.detail.value)
    const value = e.detail.value
    const selectExchangeDealer = this.data.exchangeDealerList.find(item => item.code == value)
    this.setData({
      selectExchangeDealer,
    })
  },

  onChangeExchangeNum(e) {
    console.log(e.detail.value)
    const value = e.detail.value
    this.setData({
      exchangeNumber: value,
    })
  },

  onDialogConfirmHandle() {},

  onDialogCancelHandle() {},

})