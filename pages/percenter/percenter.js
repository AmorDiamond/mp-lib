// pages/percenter/percenter.js

Page({

  onChange(event) {
    this.setData({
      radio: event.detail
    });
    const oblist = this.data.companylist.filter((item)=>item.brandCode==event.detail)
    this.setData({oblist})
  },
  handeltologin(){
     wx.navigateTo({
       url: '/pages/login/login',
     })
     wx.clearStorageSync()
  },
 

  handeltopage(e){
   let picId = e.currentTarget.dataset.id
  //  跳转的页面
   switch(picId){
      case 1:
        return wx.navigateTo({url: '/pages/MyInformation/MyInformation'})

      case 2:
        return wx.navigateTo({url: '/pages/MyClient/MyClient'})

      case 3:
          return wx.navigateTo({url: '/pages/StaffManage/MyStaffList/index'})
      case 4:
        return wx.navigateTo({url: '/pages/MyQrCode/MyQrCode'})

   }
  },
  handeltoMessage(){
    wx.navigateTo({
      url: '/pages/messageCenter/messageCenter',
    })
  },
  handeltosetup(){
    wx.navigateTo({
      url: '/pages/SetUp/SetUp',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    radio:'',
    oblist:[],
    person:"",
    companyall:[],
    arrpic:[
      {id:1,pic:'../../img/startbook.png',name:'我的信息'},
      {id:2,pic:'../../img/minebook.png',name:'我的客户'},
      {id:3,pic:'../../img/minep.png',name:'我的员工'},
      {id:4,pic:'../../img/codemi.png',name:'我的二维码'},
    ],
    accountType:'',
    companylist:[],
    brandInfoName:'',
    avatarUrl : "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let companyList = wx.getStorageSync('companyList')
    const brandName =  wx.getStorageSync('brandInfoName')[0]
    const person =  wx.getStorageSync('realName')
    const accountType = wx.getStorageSync('accountType')
    const brandInfoName = brandName.agentName

      this.setData({
        accountType,
        brandInfoName,   
        person,
        companyall:companyList
      })
      let that = this
      wx.downloadFile({
        url: wx.getStorageSync('userInfo').avatarUrl || '',
        success: function (res) {
          that.setData({
            avatarUrl:res.tempFilePath,
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