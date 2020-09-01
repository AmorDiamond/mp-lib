Page({
  page: 1,
  data: {
    showFilter: false,
    conditions: [
      { title: '起止时间', type: 'RangeDate', id: ['startTime', 'endTime'] }
    ],
    tabTypes: [
      { title: '返利明细', value: '1' },
      { title: '调整明细', value: '2' },
      { title: '兑付明细', value: '3' },
    ],
    activeType: '1',
    list: [
      {
        name: '调拨调整积分',
        time: '2019-12-21',
        code: 'DD037373',
        number: 100,
        type: 'UP',
        status: 1,
      },
      {
        name: '调拨调整积分',
        time: '2019-12-21',
        code: 'DD037373',
        number: 100,
        type: 'DOWN',
        status: 2,
      },
      {
        name: '调拨调整积分',
        time: '2019-12-21',
        code: 'DD037373',
        number: 100,
        type: 'UP',
        status: 1,
      },
      {
        name: '调拨调整积分',
        time: '2019-12-21',
        code: 'DD037373',
        number: 100,
        type: 'DOWN',
        status: 2,
      },
      {
        name: '调拨调整积分',
        time: '2019-12-21',
        code: 'DD037373',
        number: 100,
        type: 'UP',
        status: 1,
      },
      {
        name: '调拨调整积分',
        time: '2019-12-21',
        code: 'DD037373',
        number: 100,
        type: 'DOWN',
        status: 2,
      },
      {
        name: '调拨调整积分',
        time: '2019-12-21',
        code: 'DD037373',
        number: 100,
        type: 'UP',
        status: 1,
      },
      {
        name: '调拨调整积分',
        time: '2019-12-21',
        code: 'DD037373',
        number: 100,
        type: 'DOWN',
        status: 2,
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

})