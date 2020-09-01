
import {getsms,updateForgetAccount} from '../../utils/ajax.js'

Page({

  handeltocode(){

   if((/^1(3|5|6|7|8|9)\d{9}$/.test(this.data.phonevalue))){
          this.setData({
            showtext:false,
            showcode:true
        })
           this.handelsetTime()
           this.handelgetsms(this.data.phonevalue)
    }else{
      wx.showToast({
        title: '请输入正确的手机号',
        duration: 2000,
        icon: 'none',
      })
    }
 },

handelsetTime(){
  var inter = setInterval(function() {
    this.setData({
      countdown:this.data.countdown-1 
    });
    if (this.data.countdown <= 0) {
      clearInterval(inter)
      this.setData({
        showtext:true,
        showcode:false,
        countdown:60
      });
    }
  }.bind(this), 1000);
},
handelphone(e){
 this.setData({phonevalue:e.detail})
},
formSubmit(e){
  console.log(e.detail.value)
  let alldt = e.detail.value
  this.setData({alldt})
  if(this.setpassword()){
  const data = {
    phone:alldt.phonenum,
    verificationCode:alldt.code,
    password:alldt.password,
    accountType:this.data.typeid,
    flag:1
  }
  this.handelpostupdate(data)
}
},

setpassword(){
  const {alldt} =this.data
  if(alldt.phonenum==null){
    wx.showToast({
      title: '请输入手机号',
      icon: 'none',
      duration: 2000
    })
  }else if (alldt.code==null){
    wx.showToast({
      title: '请输入验证码',
      icon: 'none',
      duration: 2000
    })
  }else if (alldt.password==null){
    wx.showToast({
      title: '请输入设置密码',
      icon: 'none',
      duration: 2000
    })
  }else if (alldt.passwordAgin==null){
    wx.showToast({
      title: '请输入确认密码',
      icon: 'none',
      duration: 2000,
    })
  }else{
    return true
  }
  return false
},

handelgetsms(phone){
  const data = {
    phone,
    type:this.data.typeid,
    flag:0
  }
  getsms(data)
     .then(resp=>{
       if(resp.data.code==10115) {
        wx.showToast({
          title: resp.data.msg,
          duration: 2000,
          icon: 'none',
        })
      }
     })
},
handelpostupdate(data){ //修改密码确定
  updateForgetAccount(data)
    .then(resp=>{
      if(resp.data.code==200){
       wx.redirectTo({
         url: '/pages/login/login',
       })
       wx.clearStorageSync()
      }else if(resp.data.code == 10111){
       wx.showToast({
         title: resp.data.msg,
         icon: 'none',
         duration: 2000
       })
      }else{
        wx.showToast({
          title: resp.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
},

bindPickerthree(e){
  console.log(e)
  this.setData({
    organindex:e.detail.value,
    typeid:this.data.organiList[e.detail.value].id
  })
},
  /**
   * 页面的初始数据
   */
  data: {
    countdown:60,
    showtext:true,
    showcode:false,
    phonevalue:'', //电话号码
    alldt:'',
    typeid:'',
    setpassid:'',
    phonenum:'',
    organindex:'',
    organiList:[{id:1,name:'经销商'},{id:2,name:'特约经销商'}]
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