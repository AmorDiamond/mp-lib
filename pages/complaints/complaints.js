// pages/complaints/complaints.js
import {searchAgent,searchAgentApp} from '../../utils/ajax.js'
Page({
  handelsreach(){
    const data ={
      agentCode:wx.getStorageSync('agentCode'),
      id:this.data.inputValue
    }
    searchAgentApp(data)
      .then((resp)=>{
        if(resp.data.code==200){
          const list = resp.data.data
          this.setData({arrList:list})
        }

      })
  },
  hanonClosedelok(){
    const data ={
      agentCode:wx.getStorageSync('agentCode'),
      brandCode:wx.getStorageSync('agentList')?wx.getStorageSync('agentList').brandCode:'',
      startTime:this.data.dateStart,
      endTime:this.data.dateEnd,
      status:this.data.checkId==3?'':this.data.checkId
    }
    searchAgentApp(data)
      .then((resp)=>{
        if(resp.data.code==200){
          const list = resp.data.data
          this.setData({arrList:list,show:false})
        }
      })
  },
  inputValue(e){
   this.setData({inputValue:e.detail.value})
   
  },
  handelshowmodel() {
    this.setData({ show: true ,inputValue:''});
  },

  onClose() {
    this.setData({ show: false,checkId:3,dateEnd:'' });
    this.pickerinitDate()
  },
  bindDateChangestr(e){
    this.setData({dateStart:e.detail.value})
    if(e.detail.value>this.data.dateEnd&&this.data.dateEnd){
      this.setData({dateEnd:''})
      wx.showToast({
        title: '结束时间不能小于开始时间',
        duration: 2000,
        icon: 'none',
      })
    }

  },
  bindDateChangeEnd(e){
  if(e.detail.value>=this.data.dateStart){
    this.setData({dateEnd:e.detail.value})
  }else{
    this.setData({dateEnd:''})
    wx.showToast({
      title: '结束时间不能小于开始时间',
      duration: 2000,
      icon: 'none',
    })
  }

  },
  pickerinitDate(){
    var nowDate = new Date();
    var year = nowDate.getFullYear(), month = nowDate.getMonth() + 1, day = nowDate.getDate()
    this.setData({
      // dateStart: `${year}-${month<10?'0'+month:month}-${day<10?'0'+day:day}`
      dateStart:''
    })
  },
  handelreset(){
   this.setData({checkId:3,dateEnd:''})
   this.pickerinitDate()
  },
  handelcheckdd(e){
    const checkId = e.currentTarget.dataset.id
    this.setData({checkId})
  },
   RequestSeverList(){
     const data ={
      agentCode:wx.getStorageSync('agentCode'),
      brandCode:wx.getStorageSync('agentList')?wx.getStorageSync('agentList').brandCode:'',
      page:this.data.pages,
      size:10
     }
     
     if(this.data.pages<=this.data.totalPages){
    searchAgent(data)
      .then((res)=>{
        this.setData({
          arrList:this.data.arrList.concat(res.data.data.content),
          totalPages:res.data.data.totalPages,
          pages:this.data.pages+1
        })

      })
    }else{
      wx.showToast({
        title: '没有更多了...',
        duration:2000,
        icon:'none'
      })
    }
   },
   lower(e) { //滑动到底部
    this.RequestSeverList()
  },

  handeltoNext(){ //新增投诉建议
    wx.navigateTo({
      url: '/pages/Addcomplaints/Addcomplaints'
    })
  },
  handeltopage(e){
    const currentId = e.currentTarget.dataset.id
    const  typeId = e.currentTarget.dataset.type
    const  status =  e.currentTarget.dataset.status
    wx.navigateTo({
      url: `/pages/RespondFeedback/RespondFeedback?id=${currentId}&type=${typeId}&status=${status}`
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    inputValue:'', //搜索框里面的值
    showBorder:'checkone',
    totalPages:1, //页数
    pages:1,
    xuanxingtext:[
      {id:3,name:'全部'},
    {id:2,name:'已处理'},
    {id:0,name:'待处理'},
    {id:1,name:'处理中'}], //订单状态
      checkId:3,
      heights:'', //滑动高度
      dateStart: '',
      dateEnd: '',
      arrList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
     this.pickerinitDate()
  
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
    this.setData({arrList:[],pages:1,totalPages:1})
    this.RequestSeverList()
      
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