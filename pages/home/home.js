// pages/home/home.js
import {getAgentNoticeList,achieve,getAllbrand,reimCounts,getpermission} from "../../utils/ajax";
const App =getApp();
Page({
  handelnoticebar(){
    wx.navigateTo({
      url: '/pages/MyAnnouncement/List/index',
    })

  },

  /* icon菜单点击 */
  handelgtoto(e){
    let picId = e.currentTarget.dataset.id
    const menuInfo = this.data.arrimg.find(item => item.id == picId)
    if (menuInfo.disabled) {
      const menuName = menuInfo.name
      wx.showToast({
        title: menuName + '功能正在开发中。。。',
        duration: 2000,
        icon: 'none',
      })
    } else if (picId == 4) {
      // 我的费用
      this.getpermission()
    } else if (menuInfo.url) {
      wx.navigateTo({url: menuInfo.url})
    }
  },

  onChange(event) {
    this.setData({
      radio: event.detail
    });
    const oblist = this.data.companylist.filter((item)=>item.brandCode==event.detail)
    console.log(oblist)
    this.setData({oblist})    
  },


  handelgetNoticeList(){
    const data = {
      agentCode:wx.getStorageSync('agentCode'),
      // brandCode:wx.getStorageSync('agentList').brandCode,
      size:10,
      page:1,
      // status:2 //未读的
    }
    getAgentNoticeList(data)
      .then(resp=>{
        if(resp.data.code==200){
          let arrtext = resp.data.data.content
            let  noticetext = arrtext.filter(item=>item.status!=1)
          this.setData({
            noticetext
          })
        }
      })
     
  },
  handelgetachieve(BrandCodes){
    const data = {
       BrandCodes
    }
    achieve(data)
     .then(resp=>{
       if(resp.data.code==200){
         let contractde = resp.data.data
         this.setData({contractde:contractde[0]})
       }else {
         wx.showToast({
           title: resp.data.msg,
           duration: 2000,
           icon: 'none',
         })
       }

     })
  },
  handeltoContract(){ //去合成达成率页面
    wx.navigateTo({
      url: '/pages/MyContract/ContractDel/index',
    })
  },
  handelgetcompay(){
    const data ={
      agentCode:wx.getStorageSync('agentCode'),
    }
    getAllbrand(data)
       .then(resp=>{
       if(resp.data.code==200){
         const accountType = wx.getStorageSync('accountType')
         let companyList = resp.data.data
         this.setData({companyList})
          wx.setStorageSync('companyList',companyList )
          let brandCodes = companyList.map(item => item.brandCode)
          this.getreimCounts(brandCodes)
          if(accountType==1){//合同达成率
            // this.handelgetachieve(brandCodes)
          }  
       }
      })
  },
  getreimCounts(brandCodes){
    const data = {
      brandCodes
    }
    reimCounts(data)
       .then(resp=>{
          if(resp.data.code==200){
              let amout = resp.data.data.noCheckedAmout
              this.setData({amout})

          }
       })
  },
  getpermission(){
    const data = {
      agentCode:wx.getStorageSync('agentCode'),
       type:2
    }
   getpermission(data)
      .then(resp=>{
        if(resp.data.code==200){
           let tabList = resp.data.data
            if(tabList.lenght!=0){
              wx.navigateTo({url: '/pages/MyCost/MyCost'})
            }else{
              wx.showToast({
                title: '没有该功能权限!',
                duration: 2000,
                icon: 'none',
              })
            }
        }else{
          wx.showToast({
            title: resp.data.msg,
            duration: 2000,
            icon: 'none',
          })
        }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
     arrimg:[
       {id:1,img:'../../img/1pic.png',count:0,name:'我的待办', dealerShow: true, url: '/pages/MyTo-do/Myto-do' },
       {id:2,img:'../../img/2pic.png',count:0,name:'我的进货', url: '/pages/MyStock/MyStock' },
       {id:3,img:'../../img/3pic.png',count:0,name:'我的资金', url: '/pages/MyMoney/moneyall/index' },
       {id:4,img:'../../img/4pic.png',count:0,name:'我的费用'},
       {id:5,img:'../../img/5pic.png',count:0,name:'我的配额', url: '/pages/Myquota/quotaUsageList/index' },
       {id:6,img:'../../img/6pic.png',count:0,name:'我的合同', url: '/pages/MyContract/MyContract' },
       {id:9,img:'../../img/9pic.png',count:0,name:'公告查询', dealerShow: true, url: '/pages/MyAnnouncement/List/index' },
       {id:10,img:'../../img/10pic.png',count:0,name:'投诉建议', dealerShow: true, url: '/pages/complaints/complaints' },
       {id:12,img:'../../img/12pic.png',count:0,name:'库存盘点', url: '/pages/Myquota/inventory/index'},
       {id:7,img:'../../img/7pic.png', disableImg: '../../img/ws7.png',count:0,name:'渠道扫码', dealerShow: true, url: '/pages/ChannelCode/ChannelCode'},
       {id:8,img:'../../img/8pic.png', disableImg: '../../img/ws6.png',count:0,name:'我的积分', dealerShow: true, url: '/pages/MyPoints/MyPoints' },
       {id:11,img:'../../img/11pic.png', disableImg: '../../img/ws5.png',count:0,name:'数据简报', disabled: true},

     ],
     homedata:"",
     show:false,
     radio:'',
     companyName:'',
     oblist:[],//筛选过后的
     noticetext:[],
     showty:false,
     showjx:false,
     swiperSizes: `height:40px; width: 100%;`,
     swiperbox:`height:200px;`,
     companyList:[],
     contractde:"",
     amout:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handelgetcompay() //获取公司名称
    const accountType = wx.getStorageSync('accountType')
    if(accountType==1){
      this.handelgetNoticeList() //通知消息
      this.setData({
        companyName:wx.getStorageSync('brandInfoName')[0].agentName,
        showjx:true,
      })
    }else if(accountType==2){
      this.handelgetNoticeList() //通知消息
       this.setData({
         showty:true,
         companyName:wx.getStorageSync('brandInfoName')[0].agentName,

        })
       
    }
    
   


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
    this.handelgetNoticeList()
    this.handelgetcompay()
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
  onShareAppMessage: function (e) {
    
  }
})