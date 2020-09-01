// pages/login/login.js
const App = getApp()
import {
  login,
  getBrandInfo,
  setBrandInfo
} from '../../utils/ajax.js'
Page({

  bindPickerOk: function(e) { //选择经销商
    const {usernameInput,passwordInput,phonetest,passwordtest} =this.data
    this.setData({
      index: e.detail.value,
      focusSelect:true,
      showpiker:false,
      notshowpiker:false
    })
     wx.setStorageSync('agentCode', e.detail.value.agentCode)
  if(usernameInput&&passwordInput&&phonetest&&passwordtest){
     this.setData({tologin:true})
  }
  },
  PickeronCancel(){
    this.setData({
      showpiker:false
    })
  },
  formSubmit: function (e) { //登录按钮
    // console.log(e)
    this.setData({formData:e.detail.value})
  },
  handelchangePassword(e){
    this.setData({focuspass:e.type})
  },
  handelchangePasswordblur(e){
    this.setData({passwordtest:true,focuspass:e.type})
    if(this.data.passwordtest&&this.data.phonetest){
      const data = {
        username: this.data.usernameInput,
        password:this.data.passwordInput
       }
      //  console.log(data)
       login(data).then((resp)=>{
         if(resp.data.code==200){
           const aglist = resp.data.data.agentList
           const agentList = []
         for(let i in aglist){
            agentList.push({
               agentCode:aglist[i].agentCode,
               agentId:aglist[i].agentId,
               text:aglist[i].agentName
            })
          }

          this.setData({array:agentList})
          if(aglist.length>1){ //数据大于1才显示pick选择
            this.setData({
              showLoding:false,
              showpiker: true 
            })
          }else if(aglist.length==1){
            wx.setStorageSync('agentCode', aglist[0].agentCode)
            this.setData({tologin:true})
          }
          
         }else{
           wx.showToast({
             title: resp.data.msg,
             duration: 2000,
             icon: 'none',
           })
           this.setData({tologin:false})
         }

       })
    }

  },

  handelchangeUsername(e){
    this.setData({focususer:e.type})
  },
  handelchangeUsernameblur(e){
    this.setData({focususer:e.type})
    if (!/^1(3|5|6|7|8|9)\d{9}$/.test(e.detail.value)) {
      
      this.setData({phonetest:false})
   }else{
    this.setData({phonetest:true})
    if(this.data.passwordInput!=""&&this.data.phonetest){
      const data = {
        username: this.data.usernameInput,
        password:this.data.passwordInput
       }
      //  console.log(data)
       login(data).then((resp)=>{
        if(resp.data.code==200){
          const aglist = resp.data.data.agentList
          const agentList = []
        for(let i in aglist){
           agentList.push({
              agentCode:aglist[i].agentCode,
              agentId:aglist[i].agentId,
              text:aglist[i].agentName
           })
         }

         this.setData({array:agentList})
         if(aglist.length>1){
          this.setData({
            showLoding:false,
            showpiker: true,
          })

         }else if(aglist.length==1){
          wx.setStorageSync('agentCode', aglist[0].agentCode)
          this.setData({tologin:true})
        }

          
         }else{
           wx.showToast({
             title: resp.data.msg,
             duration: 2000,
             icon: 'none',
           })
           this.setData({tologin:false})
         }
       })
    }
    
   }
  },
  handeluplogin(){ //登录
    this.vilater()
  },
  vilater(){
    if(this.data.formData.username==''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.phonetest==false){
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.formData.password==''){
      wx.showToast({
        title: '请输入用户密码',
        icon: 'none',
        duration: 2000
      })
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,16}$/.test(this.data.formData.password)){
      wx.showToast({
        title: '用户名密码错误!',
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.formData.agentCode==''){
      wx.showToast({
        title: '请输选择经销商',
        icon: 'none',
        duration: 2000
      })
    }else{
      return true
    }
    return false
  },
  handelremove(){ //清除用户名
   this.setData({usernameInput:'',tologin:false,index:'',focusSelect:false,array:[]})
  },
  handelpassremove(){ //清除密码
    this.setData({passwordInput:'',tologin:false,index:'',focusSelect:false,array:[]})
  },
  handelhasusername(e){ //监听input的值
    const {passwordInput,focusSelect,usernameInput} = this.data
   this.setData({usernameInput:e.detail.value})

   if(usernameInput!=''&&passwordInput!=''&&focusSelect&&(/^1(3|5|6|7|8|9)\d{9}$/.test(usernameInput))&&(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,16}$/.test(passwordInput))){
    this.setData({tologin:true})

 }else{
   this.setData({tologin:false,index:'',focusSelect:false})

 }

  },
  handelhaspassword(e){//监听input的值
    const {usernameInput,focusSelect,PointTo,passwordInput} = this.data
   this.setData({passwordInput:e.detail.value})

   if(usernameInput!=''&&passwordInput!=''&&focusSelect&&(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,16}$/.test(passwordInput))&&(/^1(3|5|6|7|8|9)\d{9}$/.test(usernameInput))){
    this.setData({tologin:true})
 }else{
   this.setData({tologin:false,index:'',focusSelect:false})

 }

    
  },
  handellogin(res){ //登录授权
    if(this.vilater()){
    const {index, array} =this.data
    if (res.detail.userInfo) { //经销商
      const data = {
        agentCode:array.length>1?index.agentCode:array[0].agentCode
      }
      getBrandInfo(data)
        .then((resp)=>{
          let dataList = resp.data.data
          if(resp.data.code==200){
            wx.reLaunch({
              url: `/pages/home/home?radioName=${dataList[0].brandName}`,
            })
            App.globalData.companylist=resp.data.data
            wx.setStorageSync('brandInfoName', resp.data.data)
           
          }
        })
         this.setBrandInfo()

      const userInfo = res.detail.userInfo
      wx.setStorageSync('userInfo', userInfo)
      

    }else{
      wx.showToast({
        title: "同意授权后才能登录系统",
        icon: "none",
        duration: 2000,
        active: false
    });
    }
   }
  },
  setBrandInfo(){
    const {index,array} = this.data
    console.log(index,array)
    const data = {
      agentName:array.length>1?index.text:array[0].agentName,
      agentCode:array.length>1?index.agentCode:array[0].agentCode

    }
    setBrandInfo(data)
    .then(resp=>{
      if(resp.data.code==200){
        let realName = resp.data.data
        let real = {}
         for(let i in realName){
           if(realName[i]){
             real[i] = realName[i]
           }
         }
         wx.setStorageSync('realName', real)
      }
    })
  },

  handelchangeTitlety(){ //切换title标签栏 为特约经销商
   this.setData({
     PointTo:true,
     tologin:false,
     passwordInput:'',
     usernameInput:'',
     notshowpiker:true, //不显示piker
     index:'',
     focusSelect:false,

    })
   App.globalData.accountType = 2
   wx.setStorageSync('accountType', 2)
  },
  handelchangeTitlejx(){ //切换title标签栏 为经销商
    this.setData({
      PointTo:false,
      tologin:false,
      focusSelect:false,
      passwordInput:'',
      usernameInput:'',
      index:'',
      notshowpiker:true,
    })
    App.globalData.accountType = 1
    wx.setStorageSync('accountType', 1)

  },


  showPopups(){
    this.setData({ showpiker: true });
  },
  onClose() {
    this.setData({ showpiker: false });
  },
  handeltopass(){
    wx.navigateTo({
      url: '/pages/upDatapassword/upDatapassword'
    })
  },
  handeltoregter(){
    wx.navigateTo({
      url: '/pages/registered/registered',
    })
  },
  showPopup(){
    const {array} =this.data
    if(array.length!=0 && array!=undefined&&this.data.index!=""){
      console.log(array)
      this.setData({ showpiker: true});
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    navH:'',
    showpiker:false,
    array: [],
    index:'',
    focuspass:'',
    focususer:'',
    notshowpiker:true, //显示下面picker的内容
    focusSelect:false,
    formData:'',
    tologin:false,
    passwordInput:'',
    usernameInput:'',
    phonetest:false, //手机校验
    passwordtest:false, //密码校验
    PointTo:false , //title切换
    showLoding:true, //piker loding显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('accountType', 1) // 初始化 accountType
      // 获取手机系统信息
      wx.getSystemInfo({
        success: res => {
          //导航高度
          App.globalData.navHeight = res.statusBarHeight + 46;
        }, fail(err) {
          console.log(err);
        }
      })
      this.setData({
        navH: App.globalData.navHeight
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
    App.globalData.accountType = 1 //经销商
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