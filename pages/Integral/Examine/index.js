
import {performCase} from '../../../utils/ajax.js'
Page({
  handelsreach(e){
    if(this.data.showBorder){
      this.setData({page:1,List:[],totalPages:1})
      this.showList("未确认",this.data.inputValue)
    }else if(this.data.showBorder==false){
      this.setData({page:1,List:[],totalPages:1})
      this.showList("已确认",this.data.inputValue)
    }

   },
   handelinpValue(e){
     this.setData({inputValue:e.detail.value})
   },
   handeldchul(){ //待处理
     this.setData({showBorder:true,List:[],inputValue:"",page:1,totalPages:1})
     this.showList("未确认")
   },
   handelychul(){ //已处理
     this.setData({showBorder:false,List:[],inputValue:"",page:1,totalPages:1})
     this.showList("已确认")
   },

   showList(statusC="未确认",code=""){
     const data = {
       name: code,
       statusC:statusC,
       page:this.data.page,
       size:10
     }
    //  console.log(this.data.page,this.data.totalPages)
    if(this.data.page<=this.data.totalPages){
    performCase(data)
     .then((res)=>{
        // console.log(res)
        if(res.data.code == 200){
           this.setData({
             List:this.data.List.concat(res.data.data.content),
             totalPages:res.data.data.totalPages,
             page:this.data.page+1
           })
        }
     })
    }else{
      wx.showToast({
        title: '没有更多了...',
        duration: 2000,
        icon: 'none',
      })
    }
   },

   handeltoDetail(e){
    //  console.log(e)
     let costTypeC = e.currentTarget.dataset.name
     let code = e.currentTarget.dataset.code
     let content = e.currentTarget.dataset.content
     let id = e.currentTarget.dataset.id
     let checkTime = e.currentTarget.dataset.checktime
     wx.navigateTo({
       url: `/pages/performDetail/performDetail?name=${costTypeC}&code=${code}&content=${content}&id=${id}&checkTime=${checkTime}`
     })

   },
   lower(e){
    if(this.data.showBorder){
      this.showList("未确认",this.data.inputValue)
    }else if(this.data.showBorder==false){
      this.showList("已确认",this.data.inputValue)
    }
   },
  /**
   * 页面的初始数据
   */
  data: {
    showBorder:true,
    List:[],
    inputValue:'',
     page:1,
     totalPages:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.showList()
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