// pages/Myquota/createtory/index.js
import { ossHttp } from '../../../utils/oss'
import {getAllmatByDealer ,nextTask,checkStockSave}from '../../../utils/ajax.js'
const app =getApp();
const setlist = []
Page({
  afterRead(event) {
    console.log(event)
    const { file } = event.detail;
    let index = event.currentTarget.dataset.index
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
         // 上传完成需要更新 fileList
        ossHttp.put('Myquota/createtory',file.path).then(result=>{
        console.log('ossImg',result)
         const { fileList = [] } = this.data;
         fileList[index] = [{ ...file, url: result.url }];
         this.setData({ fileList ,indeximg:index});
         wx.setStorageSync('fileList', fileList)
         console.log(this.data.fileList)

      }) 
  },
  handelDelete(e){
    
    const index = e.currentTarget.dataset.index
    this.data.fileList.splice(index,1,[])
    this.setData({
       fileList:this.data.fileList
     })
     wx.setStorageSync('fileList', this.data.fileList)
 },
 handeltoDetails(e){
   let prodBarcode = e.currentTarget.dataset.id
   let index = e.currentTarget.dataset.index
   let brandCode = e.currentTarget.dataset.brandcode
    
   this.setData({prodBarcode})
   wx.navigateTo({
     url: `/pages/Myquota/Myquota/index?id=${prodBarcode}&idx=${index}&brandCode=${brandCode}`,
   })
 },
 handeltonewspage(e){

   let id = e.currentTarget.dataset.id
   let brandCode = e.currentTarget.dataset.brandcode
   let ids = JSON.stringify(id)
  wx.navigateTo({
    url: `/pages/Myquota/createtory/choosePage/index?id=${ids}&brandCode=${brandCode}`,
  })
 },
 haneltootherpage(e){
 
   let index = e.currentTarget.dataset.index
   wx.navigateTo({
     url: `/pages/Myquota/SearchMaterial/index?index=${index}`,
   })
 },

 handellong(){
  this.setData({material:!this.data.material})
 },
 newgetAllmatByDealer(brandCode,EndTime){
   const {weaperList,addindex } =this.data
   const data = {
     brandCode,
    "dealerCode": wx.getStorageSync('agentCode'),
    inventoryEndTime:EndTime
   }
  getAllmatByDealer(data)
    .then(resp=>{
      if(resp.data.code==200){
        const {dataObj} =this.data
         let value = resp.data.data
         
          let index = weaperList.findIndex(item => item.brandCode == brandCode)
          console.log(index,addindex)
          if (index > -1 && addindex == index) {
            app.inventory.selectList =  value
            let newdata =  app.inventory.selectitem
            weaperList[index].arrList = newdata || value

          }
          this.setData({
            weaperList,
            oldvalue:value
          })
          


          this.funnextTask(brandCode)

     
      }
    })
 },
 handelgetcompany(){
  const {checkItem,temporary} =this.data
      let valList = []
      temporary.map(item=>{
          checkItem.filter(res=>{
              if(res!=null&&res.brandCode==item){
                valList.push(res)
            }        
       
      })
    })
   this.setData({
    weaperList: valList
  })
 },
 handelDelper(e){
   let weaperList = [ ...this.data.weaperList ]
   const brandCode = e.currentTarget.dataset.brandcode
   // 删除对应品牌的审批人
   weaperList = weaperList.map(item => {
     if (item.brandCode == brandCode) {
       item.userole = []
     }
     return item
   })
   this.setData({weaperList})
 },
 funnextTask(brandCode){ //end
   nextTask({brandCode})
    .then(resp=>{
      const {weaperList,addsearch,addindex} = this.data
      console.log(1212,addindex)

      if(resp.data.code==200){
        let value = resp.data.data
        console.log(this.data.arrList)
         weaperList.map((item,index)=>{
          // 匹配选择的审批人
          let approverInfo = app.userole && app.userole[item.brandCode]
          let approverData = approverInfo ? [{ id: approverInfo.split(',')[0], name: approverInfo.split(',')[1], }] : undefined
          /* let useName = app.userole && app.userole.map(item=>{
            const data = {
            id: item.split(',')[0],
            name: item.split(',')[1],
            }
            return data
          }) */
          if(item.brandCode == brandCode){
           item.nextTask = value
           item.userole = approverData || []
           item.arrList= item.arrList?item.arrList.concat(addsearch[addindex] || []) : []
           return item
          }else{
            
            return item
          }
        })
      
      }      
      let index = weaperList.findIndex(item => item.brandCode == brandCode)
      if (index > -1 && addindex == index) {
        weaperList[index].arrList = weaperList[index].arrList.concat(addsearch[addindex] || [])
        wx.setStorageSync('checkItem', weaperList)
        
      }
     
      this.setData({weaperList})
    })
 },
 checkStockSave(){
  const {weaperList,indeximg,fileList} = this.data

 console.log(weaperList)
  const data = weaperList.map(item=>{
   let value = 
      {
        "brandCode": item.brandCode,
        "brandName": item.brandName,
        "checkStockSaveDetailReqVos": item.arrList,
        "dataSource": "DEALER",
        "dealerCode": wx.getStorageSync('agentCode'),
        "dealerName":this.data.agenName,
        "description": item.times,
        "inventoryBegineTime": item.monthStartTime,
        "inventoryEndTime": item.monthEndTime,
        "stockCertificate": fileList[indeximg]?fileList[indeximg][0].url:'',
        "workflowReqVos": {
          "name": 'candidateUsers',
          "userId": item.userole?item.userole.map(item=>item.id):[]
        }
      }

    return value
  })
  

  checkStockSave(data)
    .then(resp=>{
      if(resp.data.code==200){
         wx.navigateTo({
           url: '/pages/Myquota/inventory/index',
         })
         wx.removeStorageSync('checkItem')
      }else{
        wx.showToast({
          title: resp.data.msg,
          duration: 2000,
          icon: 'none',
        })
      }
    })
   
 },
 handelgetSave(){
   this.checkStockSave()
 },
 handelDetail(e){
   const {weaperList}=this.data
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index

    weaperList[index].arrList = weaperList[index].arrList.filter(item=>item.prodBarcode!=id)

    wx.setStorageSync('checkItem', weaperList)

    this.setData({weaperList})
 },

  /**
   * 页面的初始数据
   */
  data: {
    fileList:[],
    arrList:[],
    rovalname:[],
    addindex:'',
    prodBarcode:'',
    material:false,
    agenName:'',
    indeximg:'',
    temporary:[],
    weaperList:[], //最外层循环
    checkItem:[],
    oldvalue:[],
    dataObj:'',
    nextMonthOrderNum:'',
    moveNum:'',
    nowRealStock:'',
    overNum:'',
    addsearch:[],//新整加物料
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(app)
     let agenName = wx.getStorageSync('brandInfoName')[0].agentName
     let checkItem = wx.getStorageSync('checkItem')
     let temporary = wx.getStorageSync('temporary')
     let fileList = wx.getStorageSync('fileList')
     /* let rovename = app.userole&&app.userole.map(item=>{
      const data = {
      id: item.split(',')[0],
      name: item.split(',')[1],
      }
      return data
}) */
    
     this.setData({
      agenName,
      checkItem,
      temporary,
      fileList,
      // rovalname:rovename || [],
      addsearch:app.inventory.addsearch,
      addindex: options.index || ''
    })
    this.handelgetcompany()
    if(!options.index){
      temporary.map((item,index)=>(
        this.newgetAllmatByDealer(item,checkItem[index].weekEndTime||checkItem[index].monthEndTime)
       ))
    }

     if(options.data){ //保存盘点返回来的数据
      let dataObj = JSON.parse(options.data)
      console.log(dataObj)
       this.setData({
        dataObj,
        nextMonthOrderNum:dataObj.nextMonthOrderNum,
        moveNum:dataObj.allnum,
        nowRealStock:dataObj.nowRealStock,
        overNum:dataObj.overNum
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