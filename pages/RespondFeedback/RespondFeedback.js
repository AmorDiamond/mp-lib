// pages/RespondFeedback/RespondFeedback.js
import {detailAgent,handleAgent,confirmHandle} from '../../utils/ajax.js'
const App = getApp();
Page({
  SreachdetailAgent(detailId){
    const data ={
      id:detailId
    }
    detailAgent(data)
      .then((resp)=>{
        console.log(resp)
        const feekbackDetail = resp.data.data
        const feekbackList = resp.data.data.messages
        let url = feekbackDetail.pic&&feekbackDetail.pic.split(',')
        let tolast = [...feekbackList].pop()
        this.setData({feekbackDetail,feekbackList,url,tolast:'id'+tolast.id})

    })

  },
  handelsend(){
    const {inputValue,detailId,typeId}=this.data
    const data ={
      "content": inputValue,
      "id": detailId
    }
    handleAgent(data)
      .then((resp)=>{
        if(resp.data.code ==200){
           this.SreachdetailAgent(detailId)
          this.setData({inputValue:''})
        }
      })
  },
  inputValue(e){
    this.setData({inputValue:e.detail.value})
  },
  handelback(){
    if(this.data.status==2){
      this.setData({showtost:false})
      wx.reLaunch({
        url: '/pages/complaints/complaints',
      })
    }else{
      this.setData({showtost:true})
    }
    
  },

  confirmHandle(type){
    const data = {
      'id':this.data.detailId,
      'status': type
    }
    confirmHandle(data)
       .then((resp)=>{
         if(resp.data.code==200){
           wx.showToast({
             title: '操作成功',
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
  },

  handelcrfimok(){ //已解决问题
    this.confirmHandle(2)
    this.setData({showtost:false})
    
  },
  handelcencel(){ //未解决问题
    wx.reLaunch({
      url: '/pages/complaints/complaints',
    })
    
    this.setData({showtost:false})
  },
  handelpew(e){
    console.log(e.currentTarget.dataset.url)
    let url = e.currentTarget.dataset.url
    let arr = []
    arr.push(url)
    wx.previewImage({
      //当前显示图片
      current: arr[0],
      urls: arr,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    feekbackDetail:'',
    feekbackList:'', //删除第一条过后的数据
    inputValue:"",
    detailId:'', //详情页id
    typeId:'', //类型id
    navH:'', //header高
    showtost:false,
    url:'',//显示图片
    status:'',  //状态
    avarurl:'',
    tolast:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({detailId:options.id,typeId:options.type,status:options.status})
     this.SreachdetailAgent(options.id)
       // 获取手机系统信息
       wx.getSystemInfo({
        success: res => {
          //导航高度
           this.setData({navH:res.statusBarHeight + 46})
        }, fail(err) {
          console.log(err);
        }
      })

  // 获取本地头像地址
      let that = this
      wx.downloadFile({
        url: wx.getStorageSync('userInfo').avatarUrl || '',
        success: function (res) {
          that.setData({
            avarurl:res.tempFilePath,
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