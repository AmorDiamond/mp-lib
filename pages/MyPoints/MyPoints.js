import { appCenter } from '../../core/appCetner'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dealerType: 1,
    activeBrand: '',
    brandList: [],
    showPicker: false,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const brandList = appCenter.getBrandList()
    this.setData({
      brandList: [ ...brandList, { brandCode: '12', brandName: '特曲' } ],
      activeBrand: brandList[0].brandCode,
    })
  },

  onTabChange(e) {
    const brandCode = e.detail.name
  },

  onClickTimeHandle() {
    this.setData({
      showPicker: true,
    })
  },

  onPickerCancel() {
    this.setData({
      showPicker: false,
    })
  },

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

  onGotoDetail() {
    wx.navigateTo({ url: '/pages/MyPoints/PointsDetails/index' })
  },

  onGotoExchange() {
    wx.navigateTo({ url: '/pages/MyPoints/PointsExchange/index' })
  },

  onGotoAdvancePay() {
    wx.navigateTo({ url: '/pages/MyPoints/PointsAdvancePay/index' })
  },

})