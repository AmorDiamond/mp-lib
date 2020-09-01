// pages/Myquota/inventory/index.js
import { queryDHistory, DateByBrandCode, getInventoryDateDefault } from '../../../utils/ajax.js'
import { http } from '../../../utils/http.js'
import apis from '../../../apis/MyQuota/index'
const app = getApp()
const val = []
const checkone = []
Page({
  noop() { },
  handelchaneg(e) {
    this.setData({ inputvalue: e.detail.value })
  },
  handelsreach() { //input查询
    const { inputvalue } = this.data
    this.setData({ arrList: [], page: 1, totalPages: 1 })

    this.queryDHistory(undefined, undefined, undefined, inputvalue)
  },

  handeltoDetail(e) {
    let id = e.currentTarget.dataset.id
    let inventorystr = e.currentTarget.dataset.inventorystr
    let time = e.currentTarget.dataset.time
    let brandCode = e.currentTarget.dataset.brandcode
    let businessKey = e.currentTarget.dataset.business
    let status = e.currentTarget.dataset.status
    let dataSource = e.currentTarget.dataset.source


    wx.navigateTo({
      url: `/pages/Myquota/MyquotaDetail/index?id=${id}&inventorystr=${inventorystr}&time=${time}&brandCode=${brandCode}&businessKey=${businessKey}&status=${status}&dataSource=${dataSource}`,
    })
  },

  /* 筛选 */
  handleShowFilter() {
    this.setData({
      showSide: true
    })
  },

  /* 点击开始盘点 */
  handelshowTime() {
    const canCheck = this.data.actions && this.data.actions.some(item => item.isAllowd)
      if (canCheck) {
        // 有一个以上的品牌可以盘点
        this.setData({
          showmodel: true,
          showSide: false,
        })
      } else {
        wx.showToast({
          title: '未到盘点时间，无法盘点',
          duration: 2000,
          icon: 'none',
        })
      }

  },

  /* 获取盘点的品牌和周期数据，用于盘点弹框数据和筛选条件数据 */
  getCheckBrandAndCycle() {
    wx.showLoading({
      title: "加载中...",
      mask: true
    })
    http({
      url: apis.getInventoryDateDefault,
      data: { dealerCode: wx.getStorageSync('agentCode') }
    }).then(res => {
      const brandList = this.formatBrandCheckCycleData(res.data)
      this.setData({
        actions: brandList,
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  formatBrandCheckCycleData(brands) {
    return brands.map(brand => {
      if (brand.inventoryType === "WEEKLY") {
        // 只能盘点当前月份，所以直接获取当前月
        brand.monthName = new Date().getMonth() + 1 + '月'
        brand.weekName = brand.description
        const { description: weekName, inventoryBegineTime: weekStartTime, inventoryEndTime: weekEndTime } = brand
        const getTimeDay = (time) => {
          // 时间格式2020-06-06 09:09:09
          let day = time ? time.substr(time.lastIndexOf('-') + 1, 2) : ''
          return day
        }
        let startDay = getTimeDay(weekStartTime)
        let endDay = getTimeDay(weekEndTime)
        let label = `${weekName}(${startDay}~${endDay})`
        brand.label = label
      } else {
        brand.monthName = brand.description
        brand.label = brand.description
      }
      return brand
    })
  },

  onClickHide() {
    this.setData({ showmodel: false, selectedBrands: [] });
  },
  handelwethon() {
    const { selectedBrands, actions } = this.data
    if (selectedBrands && selectedBrands.length !== 0) {
      const selectBrand = actions.filter(brand => selectedBrands.some((selectCode) => brand.brandCode == selectCode))
      wx.setStorageSync('checkItem', selectBrand)
      this.setData({ showmodel: false, selectedBrands: [] })
      wx.navigateTo({
        url: '/pages/Myquota/createtory/index',
      })
    } else {
      wx.showToast({
        title: '请选择盘点公司！',
        duration: 2000,
        icon: 'none',
      })
    }

  },
  showPopup(e) {
    console.log(e.currentTarget.dataset.index)
    let picindex = e.currentTarget.dataset.index
    this.setData({
      showpicker: true,
      picindex: Number(picindex)
    })
  },
  closemodel() { this.setData({ showpicker: false }) },

  onChange(e) { //checkbox 多选
    console.log(e)
    this.setData({
      selectedBrands: e.detail,
    });

    wx.setStorageSync('temporary', e.detail)
  },
  queryDHistory(approvalStatusEnum = "", endTime = '', startTime = '', tradeCode = '') {
    const data = {
      conditions: {
        approvalStatusEnum,
        endTime,
        startTime,
        tradeCode
      },
      "page": this.data.page,
      "size": 10
    }
    if (this.data.page <= this.data.totalPages) {
      queryDHistory(data)
        .then(resp => {
          if (resp.data.code == 200) {
            let value = resp.data.data.content
            let newvalue = value.map(item => {
              item.inventoryTime = item.inventoryBegineTime && item.inventoryBegineTime.slice(0, 7)
              return item
            }).flat(Infinity)
            this.setData({
              arrList: [ ...this.data.arrList, ...newvalue ],
              page: this.data.page + 1,
              totalPages: resp.data.data.totalPages
            })
          }
        })
    } else {
      wx.showToast({
        title: '没有更多了...',
        duration: 2000,
        icon: 'none',
      })
    }
  },
  hadnellower() {
    const { inputvalue, searchDetail } = this.data
    let endTime = searchDetail.endTime
    let startTime = searchDetail.startTime
    let statusId = searchDetail.statusId
    this.queryDHistory(statusId, endTime, startTime, inputvalue)
  },

  /* 筛选确认操作 */
  handelpandok(e) {
    this.setData({ arrList: [], page: 1, totalPages: 1 })
    const { inputvalue } = this.data
    // this.setData({
    //   searchDetail: e.detail
    // })
    let startTime = undefined
    let endTime = undefined
    // 按周期时间筛选的时间数据
    const { timestr, timeEnd, dateEnd, dateStart } = e.detail
    if (dateStart || dateEnd) {
      // 按盘点时间筛选的时间数据
      startTime = dateStart ? dateStart + " " + "00:00:00" : undefined
      endTime = dateEnd ? dateEnd + " " + "23:59:59" : undefined
    } else if (timestr && timeEnd) {
      // 按周期时间筛选的时间数据
      startTime = timestr
      endTime = timeEnd
    }
    let statusId = e.detail.statusId == '1' ? '' : e.detail.statusId
    this.queryDHistory(statusId, endTime, startTime, inputvalue)
    this.setData({
      showSide: false,
      searchDetail: { statusId, endTime, startTime }
    })
  },
  handelzouqi(e) {
    console.log(e)
    let filterSelect = []
    if (e.detail == '按周') {
      filterSelect = this.data.actions.filter(item => item.inventoryType == 'WEEKLY')
    } else {
      filterSelect = this.data.actions.filter(item => item.inventoryType != 'WEEKLY')
    }
    this.setData({
      searchData: filterSelect
    })

  },
  /**
   * 页面的初始数据
   */
  data: {
    inputvalue: '',
    arrList: [],
    allweek: [],
    newweek: [],
    searchDetail: {},
    totalPages: 1,
    picValue: '',
    picindex: '',
    checkType: '',
    page: 1,
    statusList: [
      { name: '全部', id: '1' },
      { name: '审批中', id: 'AUDITING' },
      { name: '审批通过', id: 'AUDITSUCC' },
      { name: '审批失败', id: 'AUDITFAIL' },
    ],
    showSide: false,
    result: [],//checkbox 多选
    statusId: '1',
    showmodel: false,
    actions: [],
    newActions: [],
    brandCode: [],
    searchCompany: [],//盘点公司
    searchData: [], //盘点周期
    showpicker: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let companyList = wx.getStorageSync('companyList')
    this.queryDHistory()
    this.setData({ searchCompany: companyList })
    this.getCheckBrandAndCycle()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ result: [] })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})