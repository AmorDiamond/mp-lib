Page({
  dealerTypes: [
    { title: '兑付积分', value: '1' },
    { title: '垫付积分', value: '2' },
  ],
  terminalTypes: [
    { title: '兑付积分', value: '1' },
  ],
  data: {
    showDialog: false,
    showPicker: false,
    isTerminal: false, // 是否终端
    activeType: '1',
    tabTypes: [],
    exchangeList: [],
    advancePayList: [],
    exSeasonActives: [],
    adSeasonActives: [],
    yearText: 2020,
    quarterText: 'Q1',
    searchValues: {
      year: 2020,
      quarter: 1,
    },
    pickColumns: [  
      {
        values: [
          { text: 2019, value: 2019 },
          { text: 2020, value: 2020 },
          { text: 2021, value: 2021 },
        ],
      },
      {
        values: [
          { text: 'Q1', value: 1 },
          { text: 'Q2', value: 2 },
          { text: 'Q3', value: 3 },
          { text: 'Q4', value: 4 },
        ],
      }
    ]
  },

  onLoad(options) {
    const { code, name } = options
    wx.setNavigationBarTitle({ title: name })
    let tabTypes = []
    if (this.data.isTerminal) {
      tabTypes = this.terminalTypes
    } else {
      tabTypes = this.dealerTypes
    }
    this.setData({ tabTypes })
    this.getDetail(code)
  },

  getDetail(code) { },

  onTabChange(e) {
    const type = e.detail.name
  },

  /* 展开兑付积分季度 */
  onExchangeSeasonChange(e) {
    console.log(e.detail)
    const actives = e.detail
    this.setData({ exSeasonActives: actives })
  },

  /* 展开垫付积分季度 */
  onAdvanceSeasonChange(e) {
    const actives = e.detail
    this.setData({ adSeasonActives: actives })
  },

  /* 去垫付 */
  onGotoAdvancePay() {
    this.setData({ showDialog: true })
  },

  /* 兑付积分输入 */
  onChangeExchangeNum(e) {},

  /* 去垫付确认 */
  onDialogConfirmHandle() {},

  onDialogCancelHandle() {},

  /* 时间筛选 */
  onClickFilterTimeHandle() {
    this.setData({
      showPicker: true,
    })
  },

  onPickerCancel() {
    this.setData({
      showPicker: false,
    })
  },

  /* 确认选择时间 */
  onPickerConfirm(e) {
    console.log(e)
    /** 
     * [
     *  {text: 2020, value: 2020}
     *  {text: "Q2", value: 2}
     * ]
      */
    const values = e.detail.value
    const yearText = values[0].text
    const quarterText = values[1].text
    this.setData({
      yearText,
      quarterText,
      showPicker: false,
    })
  },

})