
 import {
  getAgentNoticeList
} from '../../../utils/ajax'

Page({
  data: {
    list: [],
    pagenum: 1,
    chooseType: 1,
    page:1,
    totalPages:1,
    showSide:false,
    tabList:[
      {brandName:"全部",brandCode:1},
    ],
    statusList:[
      {name:"全部",id:1},
      {name:"已读",id:2},
      {name:"未读",id:3},
    ],
    inputValue:'',
    brandCode:''
  },

   showMessgeList(status,brandCode="",title=""){
     if(status==2){
      const data ={
        agentCode:wx.getStorageSync('agentCode'),
        size:10,
        page:this.data.page,
        brandCode,
        title
       }
       if(this.data.page<=this.data.totalPages){
      getAgentNoticeList(data)
         .then((res)=>{
           if(res.data.code==200){
             this.setData({
               list:res.data.data.content,
               page:this.data.page+1,
               totalPages:res.data.data.totalPages,
             })
           }else{
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: 'none',
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
      
     }else{
      const data ={
        agentCode:wx.getStorageSync('agentCode'),
        size:10,
        page:this.data.page,
        status:status,
        brandCode,
        title
       }
      if(this.data.page<=this.data.totalPages){
      getAgentNoticeList(data)
         .then((res)=>{
           console.log(res)
           if(res.data.code==200){
             this.setData({
               list:res.data.data.content,
               page:this.data.page+1,
               totalPages:res.data.data.totalPages,
             })
           }else{
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: 'none',
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
    }
   },
   hanonClosedelok(e){ //side 的确定按钮
    this.setData({
      list: [],
      page:1,
      totalPages:1,
      showSide:false,
      brandCode:e.detail,
      inputValue:""
    })
    if(this.data.chooseType==1){
      this.showMessgeList(2,e.detail==1?'':e.detail)
    }else if(this.data.chooseType==2){
      this.showMessgeList(1,e.detail==1?'':e.detail)
    }else if(this.data.chooseType==3){
      this.showMessgeList(0,e.detail==1?'':e.detail)
    }
    
   },

   handelsreach(){
     const {brandCode } = this.data
    this.setData({
      list: [],
      page:1,
      totalPages:1,

    })
    console.log(brandCode)
    if(this.data.chooseType==1){
      this.showMessgeList(2,brandCode==1?'':brandCode,this.data.inputValue)
    }else if(this.data.chooseType==2){
      this.showMessgeList(1,brandCode==1?'':brandCode,this.data.inputValue)
    }else if(this.data.chooseType==3){
      this.showMessgeList(0,brandCode==1?'':brandCode,this.data.inputValue)
    }
     
   },
   inputValue(e){
      this.setData({inputValue:e.detail.value})
   },

  onLoad: function () {
    const list = []
    this.showMessgeList(2)
    let company = wx.getStorageSync('companyList')
    this.setData({
      list,
      tabList:this.data.tabList.concat(company)
    })
  },

  onReachBottom () {

  },

  filterChoose (e) {
    const {brandCode } = this.data
    const chooseType = e.currentTarget.dataset.id || e.detail
    this.setData({
      chooseType,
      list: [],
      page:1,
      totalPages:1,
      inputValue:''
    })
    if(this.data.chooseType==1){
      this.showMessgeList(2,brandCode==1?'':brandCode)
    }else if(this.data.chooseType==2){
      this.showMessgeList(1,brandCode==1?'':brandCode)
    }else if(this.data.chooseType==3){
      this.showMessgeList(0,brandCode==1?'':brandCode)
    }
    
  },

  onToDetail: function (e) {
    console.log(e)
    const id = e.detail.id
    const time = e.currentTarget.dataset.time
    wx.navigateTo({url: `/pages/MyAnnouncement/Detail/index?id=${id}&time=${time}`})
  },

  handelshowmodel(){
    this.setData({showSide:true})
  },

})
