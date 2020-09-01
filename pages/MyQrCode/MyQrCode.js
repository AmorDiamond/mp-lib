// pages/MyQrCode/MyQrCode.js
import { base64src } from '../../utils/base64src.js'

import {qrcode,qrname} from '../../utils/ajax.js'

import { ossHttp } from '../../utils/oss'


Page({
     handelgetqrcode(){
       let arr = wx.getStorageSync('brandInfoName')
       let  brandlist = arr.map(item=>item.brandCode)

       let agent = wx.getStorageSync('agentCode')
       let brandCode = brandlist.join(',') // brandCode

       const data = {
         agentCode : agent+","+brandCode
       }
          qrcode(data)
            .then(resp=>{
              if(resp.data.code==200){
                let data = wx.getStorageSync('imgcode')||''
                if(!data){
                base64src(resp.data.data, res => {
                  //console.log(res) // 返回图片地址，直接赋值到image标签即可
                  // 二维码上传到oss，并且返回给服务端
                  ossHttp.put('user/my-qr-code',res).then(result=>{
                    // console.log('ossImg',result)
                    this.setData({imgcode:result.url})
                    wx.setStorageSync('imgcode', result.url)
                  }) 
                });
              }
            }
          })
       
      const datas = {
        agentCode:wx.getStorageSync('agentCode')
      }
        qrname(datas)
           .then(resp=>{
             if(resp.data.code==200){
                 this.setData({
                  angetName: resp.data.data
                 })
             }
           })
          
     },
  /**
   * 页面的初始数据
   */
  data: {
     imgcode:'',
     angetName:'', //经销商名称
     agentCode:'',
     brandName:wx.getStorageSync('agentList').brandName || '',
     avatar:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handelgetqrcode()
    this.setData({
      imgcode:wx.getStorageSync('imgcode')||'',
      agentCode:wx.getStorageSync('agentCode') || '',
    })
    let that = this
    wx.downloadFile({
      url: wx.getStorageSync('userInfo').avatarUrl || '',
      success: function (res) {
        that.setData({
          avatar:res.tempFilePath,
        })
      }
    })
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