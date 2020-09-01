// pages/Myquota/MyquotaDetail/index.js
import { workflowDetail } from '../../../utils/ajax.js'
const app = getApp()
// 盘点数据的来源，一种是员工盘点的，一种是经销商盘点的
let dataSource
Page({
  haneltoDetail(e) {
    const { arrList, businessKey } = this.data
    let id = e.currentTarget.dataset.id
    const stockMatDetail = arrList.find(mat => mat.prodBarcode == id)
    // 储存用于详情页面展示数据
    wx.setStorageSync('stockMatDetail', stockMatDetail)
    wx.navigateTo({
      url: `/pages/Myquota/Myquota/index?id=${id}&businesskey=${businessKey}&detail=${1}`,
    })
  },

  workflowDetail(brandCode, businessKey) {
    const data = {
      brandCode,
      businessKey
    }
    workflowDetail(dataSource, data)
      .then(resp => {
        if (resp.data.code == 200) {
          let value = resp.data.data

          this.setData({
            cyclestr: value.description,
            arrList: value.checkStockDetails,
            dataAll: value,
            steps: value.processDetailResult.processDetails,
            first: value.processDetailResult
          })

          console.log(this.data.steps)
        }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    steps:[],
    first:'',
    arrList:[],
    cyclestr:"",
    time:'',
    businessKey:'',
    status:'',
    dataAll:'',
    showPopup: false,
    showAuthAction: false,
    authActions: [{ name: '打开授权设置页', color: '#07c160', openType: 'openSetting' }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const { time } = options
    this.setData({
      time,
      businessKey: options.businessKey,
      status: options.status,
      // cyclestr:options.inventorystr.slice(0,7)
    })
    dataSource = options.dataSource
    this.workflowDetail(options.brandCode, options.businessKey)
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync('stockMatDetail')
  },
  
  onViewImgHandle() {
    this.setData({
      showPopup: true,
    })
  },
  
  onClosepopup() {
    this.setData({
      showPopup: false,
    })
  },

  onCloseAuthAction() {
    this.setData({
      showAuthAction: false
    })
  },

  onAuthSettingHandle(e) {
    // TODO: 打开授权设置页后回调未生效，待排查
    const { authSetting } = e.detail
    if (authSetting['scope.writePhotosAlbum']) {
      this.getImageInfo()
    }
  },

  onDownloadHandle() {
    // 检测是否已经授权
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              // 同意授权
              this.getImageInfo()
            },
            fail: (res) =>{
              console.log(res)
              this.setData({
                showAuthAction: true
              })
            }
          })
        }else{
          // 已经授权了
          this.getImageInfo()
        }
      },
      fail: (res) =>{
        console.log(res)
        wx.showToast({ title: '获取当前设置失败', icon: 'none' })
      }
    })
  },

  getImageInfo() {
    wx.showLoading({ title: '保存中...' })
    const src = this.data.dataAll.stockCertificate
    wx.getImageInfo({
      src,
      success: res => {
        const path = res.path
        this.saveImageToPhotosAlbum(path)
      },
      fail: () => {
        wx.showToast({ title: '获取图片信息失败', icon: 'none' })
        wx.hideLoading()
      }
    })
  },

  saveImageToPhotosAlbum(filePath) {
    wx.saveImageToPhotosAlbum({
      filePath,
      success: res => {
        console.log(res)
        wx.showToast({ title: '保存成功' })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }

})