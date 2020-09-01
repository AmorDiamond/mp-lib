// pages/registered/Area/index.js
import {
  register,
} from '../../../utils/ajax.js'
Page({
  handelgetregister(brandCode){ //获取经销商编码
    const data = {
      brandCode
    }
    register(data)
       .then(resp=>{
         if(resp.data.code==200){
           let organiList = resp.data.data.organizationByBrandCodeListDTOList.child
           let setorgani = resp.data.data.organizationByBrandCodeListDTOList.child

           this.setData({organiList,setorgani})
         }
       })
  },
  handelcheck(event) {
    //console.log(event)
    this.setData({
      radio: event.detail
    });
  },
  handeltonext(e){
    // console.log(e)
    const {titelarr} =this.data
    this.setData({radio:''})

    let name  = e.currentTarget.dataset.name
    let code = e.currentTarget.dataset.code
    let index = e.currentTarget.dataset.idx

// console.log(titelarr)
    let ast  = this.data.organiList.map(item=>{
      if(code==item.code){
        return item
      }
    })
    console.log(ast[index].child)

    if(ast[index].child.length!=0){
      titelarr.push({name:name,code:code})
    let arr = this.findPathByLeafId(code, this.data.organiList)
    console.log(arr)
    let organiList =arr&&arr.map(res=>{
      // console.log('=============',res)
      if(res.child.length!=0||res.child[0]!=undefined){
        this.setData({
          titelarr:this.data.titelarr.concat(titelarr)
        })
        return res.child
      }else{
        wx.showToast({
          title: '没有更多了...',
          duration: 2000,
          icon: 'none',
        })
  
      }
    })

    this.setData({titelarr,organiList:organiList[0]})
  }else{
    wx.showToast({
      title: '没有更多了！',
      duration: 2000,
      icon: 'none',
    })
    
  }

  },
  findPathByLeafId(leafId, nodes, path) {
    if(path === undefined) {
      path = [];
    }
    if(nodes==undefined){
      nodes=[];
    }
    for(var i = 0; i < nodes.length; i++) {
        var tmpPath = path.concat();
        tmpPath.push(nodes[i]);
        if(leafId == nodes[i].code) {
           return tmpPath;
        }
        if(nodes[i].child) {
          var findResult = this.findPathByLeafId(leafId, nodes[i].child, tmpPath);
          if(findResult) {
            return findResult;
          }
        }
    }
  },
  handeltobac(){
    let am = this.data.radio.split(",")
    let name = am[1]
    let code = am[0]
    // console.log(name,code)
     wx.reLaunch({
       url: `/pages/registered/registered?name=${name}&code=${code}`,
     })
    
  },
  handeltocom(){
    const {brandCode} =this.data
    this.handelgetregister(brandCode)
    this.setData({titelarr:[]})
  },
  handeltotitle(e){ //点击titile
    let code = e.currentTarget.dataset.code
    this.setData({toView:code}) //锚点滑动
    let funfist = this.data.titelarr
    let funlast = funfist.slice()
    let arrlast =funlast.pop()

    if(funfist[0].code==code||arrlast.code!=code){

      let arr = this.findPathByLeafId(code, this.data.setorgani)
       
        this.data.titelarr.filter((item,index)=>{
        if(item.code==code){
            this.data.titelarr.splice(index+1)     
           this.setData({
            titelarr:this.data.titelarr
           })
        }
     })

      let organiList =arr&&arr.map(res=>{
        if(res.child.length!=0||res.child[0]!=undefined){
          this.setData({organiList:res.child})
        }
      })
    }

    
  },
  /**
   * 页面的初始数据
   */
  data: {
    organiList:[],
    radio:'',
    titelarr:[],
    brandCode:'',
    setorgani:[],//用来炒作的数据
    toView:'', //header scoll的滑动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {brandCode} =options
    this.setData({brandCode})
    this.handelgetregister(brandCode)
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