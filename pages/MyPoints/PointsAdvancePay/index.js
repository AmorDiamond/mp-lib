Page({
  page: 1,
  handleRow: {}, //保存当前操作的公司或终端信息
  data: {
    showFilter: false,
    showDialog: false,
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
    list: [
      {
        name: '宏升酒业销售有限公司',
        type: 1,
        code: 'DF000002',
        number: 100,
      },
      {
        name: '宏升酒业销售有限公司终端',
        type: 2,
        code: 'DF000002',
        number: 100,
      },
    ]
  },
  onLoad(options) {

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

  onGotoDeatilHandle(e) {
    const { number, code, name } = e.currentTarget.dataset
    // 保存当前操作的公司或终端信息
    this.handleRow = { code, name }
    if (number) {
      // 弹框提示确认
      this.setData({
        showDialog: true,
      })
    } else {
      // 进入兑付明细
      wx.navigateTo({ url: `/pages/MyPoints/PointsAdvancePay/Detail/index?code=${code}&name=${name}` })
    }
  },

  /* 确认已垫付 */
  onDialogConfirmHandle() {
    wx.showLoading({ title: '请求中...' })
    setTimeout(() => {
      const { code, name } = this.handleRow
      wx.navigateTo({ url: `/pages/MyPoints/PointsAdvancePay/Detail/index?code=${code}&name=${name}` })
      wx.hideLoading()
    }, 1000)
  },

  onDialogCancelHandle() {},

})