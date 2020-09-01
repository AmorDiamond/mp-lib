// pages/Addcomplaints/Addcomplaints.js
import {addcomplaints} from '../../utils/ajax.js'
import { ossHttp } from '../../utils/oss'
Page({
  afterRead(event) {
    console.log(event)
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
         // 上传完成需要更新 fileList
        ossHttp.put('complaints/complaintimg',file.path).then(result=>{
         const { fileList = [] } = this.data;
         fileList.push({ ...file, url: result.url });
         this.setData({ fileList });
      }) 
  },
  handelDelete(e){
     const index = e.detail.index
     this.data.fileList.splice(index,1)
     this.setData({
        fileList:this.data.fileList
      })
  },
  vieter(){
    const {inputvalue,textareavalue} =this.data
    if(inputvalue==''){
      wx.showToast({
        title: '请填写反馈标题',
        duration: 2000,
        icon: 'none',
      })

    }else if(textareavalue==''){
      wx.showToast({
        title: '请填写反馈内容',
        duration: 2000,
        icon: 'none',
      })
    }else{
      return true
    }
     return false
  },
  handelsumbit(){ //提交投诉建议
  if(this.vieter()){
     let img = this.data.fileList.map(item=>item.url)
     let allimg = img.join(',')
     const data ={
      agentCode:wx.getStorageSync('agentCode'),
      agentName:wx.getStorageSync('brandInfoName')[0].agentName,
      brandCode:wx.getStorageSync('brandInfoName')[0].brandCode,
      content: this.data.textareavalue || '',
      createdBy:wx.getStorageSync('agentList').createdBy,
      createdById: wx.getStorageSync('agentList').id,
      feedbackTitle: this.data.inputvalue || '',
      pic:allimg||''
     }
     addcomplaints(data)
       .then(resp=>{
         if(resp.data.code==200){
            wx.showToast({
              title: '提交成功',
              duration: 2000,
              icon: 'success',
              success:()=>{
                wx.reLaunch({
                  url: '/pages/complaints/complaints',
                })
              }
            })

           
         }
        
       })
    }
  },
  handelinputvalue(e){
    // console.log(e.detail.value)
    this.setData({inputvalue:e.detail.value})

  },
  handeltextarea(e){
  //  console.log(e.detail.value)
   this.setData({textareavalue:e.detail.value})
  },
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],//图片
    inputvalue:'' ,//标题值
    textareavalue:'', //反馈内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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