// pages/components/sideSearch/sideSearch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    companyList: {
      type: Array,
      value: [],
    },
    title:{
      type:String,
      value:''
    },
    showSide:{
       type:Boolean,
    },
    titleT:{
      type:String,
      value:''
    },
    statusList:{
      type: Array,
      value: [],
    },
    statusId:{
      type: String,
    },
    showStaut:{
       type:Boolean
    },
    pdcompany:{
      type:Boolean
   },
    pdweek:{
    type:Boolean
   },
   hasall:{
    type:Boolean
   },
    searchData:{
      type: Array,
      value: [],
    },
    searchCompany:{
      type:Array,
      value:[]
    },
    libsId:{
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    checkId:1,
    showSide:false,
    statusId:'1',
    showsect:false,
    actions:[],
    showeek:false,
    showcompany:false,
    value:'',
    dateStart:'',
    valuesrc:'',
    dateEnd:'',
    libsId:"",
    timestr:'',
    timeEnd:'',
    valueWeek:"",
    brandCode:'',
    selfsetArr:['按周','按月']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handelcheckdd(e){
      let id = e.currentTarget.dataset.id
      this.setData({checkId:id,libsId:id})
    },
    handelreset(){
      let libsId = wx.getStorageSync('companyList')[0].brandCode
      this.setData({checkId:1,statusId:'1',libsId,value:'',valueWeek:'',dateEnd:'',dateStart:'',brandCode:''})
      this.triggerEvent("handelstatus", '1')
    },

    hanonClosedelok(){
      const data = {
        statusId:this.data.statusId,
        brandCode:this.data.brandCode,
        valueWeek:this.data.valueWeek,
        timestr:this.data.timestr,
        timeEnd:this.data.timeEnd,
        dateStart:this.data.dateStart,
        dateEnd:this.data.dateEnd,
      }
       let brandCode = this.data.hasall?this.data.checkId:this.data.libsId
       this.triggerEvent("hanonClosedelok",brandCode)
       this.triggerEvent("handelpandok",data)
    },
    handelshowModel(){ //盘点周期
       this.setData({showeek:true})
    },
    handelshowModelcompany(){
      this.setData({showcompany:true})
    },
    handselect(){this.setData({showsect:true})},
    onClickHide(){//盘点周期
      this.setData({showeek:false,showcompany:false,showsect:false})
    },
    handelshoWeek(e){//盘点周期
      console.log(e)
      this.setData({
         showeek:false,
         valueWeek:e.currentTarget.dataset.name,
         timeEnd:e.currentTarget.dataset.timeend,
         timestr:e.currentTarget.dataset.timestr
      })
      
    },
    handelgetser(e){
      this.setData({
        showsect:false,
        valuesrc:e.currentTarget.dataset.name,
        valueWeek:''
      })
      console.log(e.currentTarget.dataset.name)
      this.triggerEvent("handelzouqi",e.currentTarget.dataset.name)
    },
    handelshowcompany(e){//盘点公司
      this.setData({
        showcompany:false,
        value:e.currentTarget.dataset.name,
        brandCode:e.currentTarget.dataset.code
     })
    },

    onClose(){
      this.setData({showSide:false})
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
    handelstatus(e){
      let id = e.currentTarget.dataset.id
      this.triggerEvent("handelstatus",id)
      this.setData({statusId:id})
    }
  }
})
