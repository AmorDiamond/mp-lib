// pages/MyStock/MyStock.js
import {orderList} from '../../utils/ajax.js'

Page({
  loop(){}, //防止穿透
  handemroeall(e){ //导航全部
    console.log(e)
    this.setData({
      orderList:[],page:1,totalPages:1,
      checkId:e.detail.index,
      typeid:e.detail.name,
      inputvalue:'',
      name:e.detail.name
    })
    let checkztId = this.viter(this.data.checkztId)
    let brands = this.data.checkzzId==1?"":[this.data.checkzzId]
    let name = e.detail.name=='all'?"":e.detail.name
    this.hadnelgetorder(name,this.data.inputvalue,checkztId,brands)
  },
  
  handelsreach(e){
    this.setData({orderList:[],page:1,totalPages:1,inputvalue:e.detail.value})

    let checkztId = this.viter(this.data.checkztId)
    let brands = this.data.checkzzId==1?"":[this.data.checkzzId]
    let name = this.data.name=='all'?"":this.data.name
    this.hadnelgetorder(name,this.data.inputvalue,checkztId,brands)
  },

  handelshowmodel() {
    this.setData({ showmodel: true });
  },

  onClose() {
    this.setData({ showmodel: false });
  },
  handelcheckdd(e){
    const checkId = e.currentTarget.dataset.id
    this.setData({name : e.currentTarget.dataset.name})
    console.log(checkId)
    if(checkId==1){
      this.setData({
        active:'INITIAL_CREATION'
      })
    }else if(checkId==2){
      this.setData({
        active:'SEND_ERP_AND_LOGISTICS'
      })
    }else if(checkId==3){
      this.setData({
        active:'SEND_ERP'
      })
    }else if(checkId==4){
      this.setData({
        active:'REVOKED'
      })
    }else if(checkId==0){
      this.setData({
        active:'all'
      })
    }
    this.setData({
      checkId,
    })

  },
  handelcheckzt(e){
    const checkztId = e.currentTarget.dataset.id
    this.setData({checkztId})
  },
  handelreset(){//筛选重置
    const {checkId} =this.data
    if(checkId==1){
      this.setData({
        active:'INITIAL_CREATION'
      })
    }else if(checkId==2){
      this.setData({
        active:'SEND_ERP_AND_LOGISTICS'
      })
    }else if(checkId==3){
      this.setData({
        active:'SEND_ERP'
      })
    }else if(checkId==4){
      this.setData({
        active:'REVOKED'
      })
    }else if(checkId==0){
      this.setData({
        active:'all'
      })
    }
   this.setData({
    checkId:0,
    checkztId:1,
    checkzzId:wx.getStorageSync('companyList')[0].brandCode,
    active: "all"
   })
  },
  handelok(){//筛选确定
   this.setData({showmodel:false,orderList:[],page:1,totalPages:1,inputvalue:""})

    let checkztId = this.viter(this.data.checkztId)
    let brands = this.data.checkzzId==wx.getStorageSync('companyList')[0].brandCode?"":[this.data.checkzzId]
    let name = this.data.name =='all'?"":this.data.name
    this.hadnelgetorder(name,this.data.inputvalue,checkztId,brands)
  },
  viter(data){
    switch(data){
      case 1 :
      return ""
      case 2:
        return "NOT_ENTERED"
      case 3:
        return "IN_PROCESS"
      case 4:
        return "TERMINATED" 
       case 5:
         return "COMPLETED"
      default:
        return ""
    }
  },

  handeltoDetail(e){ //去详情页面
    console.log(e)
    let Number = e.currentTarget.dataset.number
    let type = e.currentTarget.dataset.type

    wx.navigateTo({url: `/pages/orderDetails/orderDetails?Number=${Number}&type=${type}`});
  },
  handeltowul(){ //物流跟踪
    //  wx.navigateTo({url: '/pages/LogisticsTracking/LogisticsTracking'});
    wx.showToast({
      title: '物流跟踪功能正在开发中...',
      duration: 2000,
      icon: 'none',
    })
  },
  handeltojhuo(){ //交货单
    // wx.navigateTo({url: '/pages/DeliveryOrder/DeliveryOrder'});
    wx.showToast({
      title: '交货单功能正在开发中...',
      duration: 2000,
      icon: 'none',
    })
 },
 steamroller(arr){ // 扁平化
  while(arr.some(item=> Array.isArray(item))){
    arr=[].concat(...arr)
  }
  return arr
},
  hadnelgetorder(OrderStatus="",inputvalue="",TaskLevelStatus="",brands=""){
    let companyList = wx.getStorageSync('companyList')
     let brandCodes = companyList.map(item => item.brandCode)
    const datats = {
       page:this.data.page,
       size:10,
       TaskLevelStatus,
       OrderStatus,
       NumberOrProductName:inputvalue,
       brandCodes: brands ||  brandCodes
    }
    let data = {}
    for(let i in datats){
      if(datats[i]){
        data[i] = datats[i]
      }
    }
    if(this.data.page<=this.data.totalPages){
    orderList(data)
       .then(resp=>{
         if(resp.data.code==200){
            let orderList = resp.data.data.content
            let ItemList =  orderList.map(item=>{
              let num = 0
              let nums = 0
                let a = item.ItemList.map(res=>res.Price)
                let b = a.map(res=>num+=res)

                let con = item.ItemList.map(res=>res.Amount)
                let cont = con.map(res=>nums+=res)
                item.price=b.pop()
                item.count=cont.pop()
                return orderList
            })
            console.log(orderList)

            this.setData({
              orderList:this.data.orderList.concat(orderList),
              page:this.data.page+1,
              totalPages:resp.data.data.totalPages,
              allprice:ItemList
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

  handelorgan(e){
   let checkzzId = e.currentTarget.dataset.id
    this.setData({checkzzId})
  },

  scollower(e){ //上拉加载跟多
    let checkztId = this.viter(this.data.checkztId)
    let brands = this.data.checkzzId==wx.getStorageSync('companyList')[0].brandCode?"":[this.data.checkzzId]
    let name = this.data.name =='all'?"":this.data.name
    this.hadnelgetorder(name,this.data.inputvalue,checkztId,brands)
  },
  /**
   * 页面的初始数据
   */
  data: {
    showmodel:false,
    active:"all",
    inputvalue:"",
    xuanxingtext:[
      {id:0,name:"all",title:"全部"},
      {id:1,name:'INITIAL_CREATION',title:'初始状态'},
      {id:2,name:'SEND_ERP_AND_LOGISTICS',title:"发送物流系统"},
      {id:3,name:'SEND_ERP',title:"已发送到ERP"},
      {id:4,name:'REVOKED',title:"订单已撤销"},
    ], //订单状态
    xuanxingtexts:[
      {id:1,name:'全部'},
      {id:2,name:'未进入'},
      {id:3,name:'流程中'},
      {id:4,name:'被终止'},
      {id:5,name:'已完成'}], //审批状态
      checkId:0,
      checkztId:1,
      checkzzId:'',
      orderList:[],
      totalPages:1,
      page:1,
      name:"",
      allprice:[],
      typeid:'',
      costockList:[],//销售组织
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hadnelgetorder()
    let brands = wx.getStorageSync('companyList')
    this.setData({
      costockList:brands,
      checkzzId:brands[0].brandCode
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