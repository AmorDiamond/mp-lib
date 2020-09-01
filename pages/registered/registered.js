// pages/registered/registered.js
const CreditCodeValid = require("../../utils/CreditCodeValid.js")
import {
  regBrandInfo,
  register,
  qualify,
  business,
  province,
  city,
  distrcit,
  matCode,
  registerst,
  loginPhone,
} from '../../utils/ajax.js'
import { ossHttp } from '../../utils/oss'

Page({
  loop(){},
  handelshowtos(){
    if(this.data.errCode){
      wx.showToast({
        title: '没有查到对应数据',
        duration: 2000,
        icon: 'none',
      })
    }
  },
  onClose(e){
    const {cityId , distrcitId,ouenId,province,distrcit,city ,selectTeeth} = this.data
    let  provinceName =province && province.filter(item=>cityId==item.code)
    let  cityName =city && city.filter(item=>distrcitId==item.code)
    let  distrcitName =distrcit && distrcit.filter(item=>ouenId==item.code)
    // console.log(provinceName,cityName,distrcitName)
    if(cityId || distrcitId || ouenId){
      let code = [cityId,distrcitId,ouenId]
      let arrdes = [
        provinceName[0].name,
        cityName[0]?cityName[0].name:'',
        distrcitName[0]?distrcitName[0].name:''
     ]

     let alladerss =distrcitName[0]?arrdes.join('-'):cityName[0]?provinceName[0].name+"-"+cityName[0].name:provinceName[0].name

      let item = 'selectTeeth['+this.data.curindex+'].name'
      let res = 'selectTeeth['+this.data.curindex+'].code'
      let resp = 'selectTeeth['+this.data.curindex+'].arrdes'

      this.setData({
        showRegion:false,
        alladerss,
        [item]:alladerss,
        [res]:code,
        [resp]:arrdes,
      })
      // console.log(selectTeeth)
       let arr = selectTeeth.map(item=>{
          let obj={
              "cityCode": item.code[1] || '' ,
              "cityName": item.arrdes[1] || '' , 
              "districtCode": item.code[2] || '' ,
              "districtName": item.arrdes[2] || '' ,
              "provinceCode": item.code[0],
              "provinceName": item.arrdes[0],
              "productList": [
                {
                  "sapMatCode":item.selectsongdong? item.selectsongdong.code:'',
                  "sapMatDescribe":item.selectsongdong?  item.selectsongdong.name:'',
                }
              ],
          }
          return obj
        
       })
       this.setData({
        productAndArea:arr
       })
      //  console.log(this.data.productAndArea)
    }else{
      wx.showToast({
        title: '请选择销售区域',
        duration: 2000,
        icon: 'none',
      })
    }
  },
  formSubmit: function (e) {
    // console.log(e.detail.value)
    this.setData({
      formSubmit:e.detail.value
    })
    if(this.registerd()){
      this.setData({pageone:false,active:'1',pagetwo:true})
      wx.setStorageSync('regester', e.detail.value)
    }
    
  },
  formSubmitpagethree(e){ //第三页提交
    // console.log(e.detail.value)
    this.setData({
      formSubmitthree:e.detail.value
    })
  },
  registerd(){//第一页的
    const {formSubmit} = this.data
    if(formSubmit.brand==null){
      wx.showToast({
        title: '请选择所属品牌',
        icon: 'none',
        duration: 2000
      })
    }else if(formSubmit.Application==null){
      wx.showToast({
        title: '请选择申请主体类型',
        icon: 'none',
        duration: 2000
      })
    }else if(formSubmit.DealerCode==null){
      wx.showToast({
        title: '请输入经销商编码',
        icon: 'none',
        duration: 2000
      })
    }else if(/^1(3|5|6|7|8|9)\d{9}$/.test(formSubmit.phoneumber)!=true){
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 2000
      })
    }else if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(formSubmit.password)==false){
      wx.showToast({
        title: '密码至少包含大写字母，小写字母，数字，且等于8位',
        icon: 'none',
        duration: 2000
      })
    }else if(formSubmit.passwordAgin==null){
      wx.showToast({
        title: '请再次输入密码',
        icon: 'none',
        duration: 2000
      })
    }else if(formSubmit.passwordAgin!=formSubmit.password){
      wx.showToast({
        title: '密码不一致,请重新输入',
        icon: 'none',
        duration: 2000
      })
    }else{
       this.setData({buttencolor:true})
      return true
    }
    return false
  },
  registerdtwo(){ //第二页的
    const {formSubmitpagetwo} = this.data
     if(formSubmitpagetwo.company==null||formSubmitpagetwo.personal==null){
      wx.showToast({
        title: '请选择资质类型',
        icon: 'none',
        duration: 2000
      })
    }else if(formSubmitpagetwo.compayName==null){
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none',
        duration: 2000
      })
    }else if(formSubmitpagetwo.creditCode==null||CreditCodeValid.CreditCodeValid(formSubmitpagetwo.creditCode)==false){
      //||CreditCodeValid.CreditCodeValid(formSubmitpagetwo.creditCode)==false
      wx.showToast({
        title: '请输入正确的统一社会信用代码',
        icon: 'none',
        duration: 2000
      })
    }else if(formSubmitpagetwo.TheContact==null){
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 2000
      })
    }else if(formSubmitpagetwo.ContactNumber==null){
      wx.showToast({
        title: '请输入联系人电话',
        icon: 'none',
        duration: 2000
      })
    }else if(formSubmitpagetwo.ContactAddress==null){
      wx.showToast({
        title: '请输入联系地址',
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.pics ==''){
      wx.showToast({
        title: '请上传营业执照！',
        icon: 'none',
        duration: 2000
      })
    }else{
      return true
    }
    return false
  },
  handeltologin(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  bindPickerChange: function(e) { //所属品牌
   
    this.setData({
      indexone: e.detail.value,
      companycode:this.data.brand[e.detail.value].brandCode,
      agentindex:'',
      angentuli:'',
      angentlist:[]
    })
    wx.setStorageSync('companycode', this.data.brand[e.detail.value].brandCode)
    this.handelgetregister(this.data.brand[e.detail.value].brandCode)
  },
  bindAppcode: function(e) { //获取经销商编码
    this.setData({
      agentindex: e.detail.value,
      parentCode:this.data.angentlist[e.detail.value].agentCode
    })
    wx.setStorageSync('parentCode', this.data.angentlist[e.detail.value].agentCode)
  },

  handelpassword(e){ //校验密码
  if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(e.detail)){
      this.setData({ispassword:true})
   }else{
    this.setData({ispassword:false})
   }
  },

  //第二页
  formSubmitpagetwo(e){
   
    this.setData({
      formSubmitpagetwo:e.detail.value
    })
  },
  handelrocom(event) {
    if(this.data.radio!=event.detail){
    this.setData({
      radio: event.detail
    });
    if(event.detail=='personal'){
        this.setData({
          pics:'',
          compayName:'',
          ContactAddress:'',
          creditCode:'',
          ContactNumber:'',
          TheContact:'',
        })
        wx.removeStorageSync('regestertwo')
        wx.removeStorageSync('business')
    }
  }
  },
  handelgetname(e){ //个人 获取姓名
    this.setData({realname:e.detail})
  },
  handelgetIdcard(e){ //个人 获取身份证
    this.setData({cardID:e.detail})
  },

  bindPickerthree(e){ 
    let code = wx.getStorageSync('companycode')
    //this.data.companycode
    if(code){
     wx.navigateTo({
       url: `/pages/registered/Area/index?brandCode=${code}`,
     })
    }else{
      wx.showToast({
        title: '请选择所属品牌!',
        duration: 2000,
        icon: 'none',
      })
    }
  },
  handelclosequyu(){
    this.setData({
      quyupickr:false
    })
  },
  bindPickerfroue(e){ //picker
    this.setData({
      busidex: e.detail.value,
      businessPerson:this.data.businList[e.detail.value].id
    })

  },

  handeltoOne(){
    this.setData({pageone:true,pagetwo:false,active:'0'})
    wx.setStorageSync('regestertwo',this.data.formSubmitpagetwo )
  },
  handeltothree(){
    if(this.registerdtwo()){
      this.setData({pageone:false,pagetwo:false,pagethree:true,active:'2'})
      this.handelgetmatCode()
      wx.setStorageSync('regestertwo',this.data.formSubmitpagetwo )
    }
  },
  handeltotwo(){
    this.setData({pageone:false,pagetwo:true,pagethree:false,active:'1'}) 
  },
  handelcompayName(e){ //公司名称
   this.setData({compayName:e.detail})
  },

  handelContact(e){ //联系人
    this.setData({TheContact:e.detail})
  },
  handelContactNumber(e){ //联系人电话
    this.setData({ContactNumber:e.detail})
  },
  handelContactAddress(e){ //联系地址
    this.setData({ContactAddress:e.detail})
  },
  handeladdSelect(){//增加
    const {selectTeeth}=this.data
    if(this.data.alladerss!=""&&selectTeeth[this.data.curindex].indexs!=0){ 
      var  lists = this.data.selectTeeth;
      var newData = {
        indexk: 0,
        indexs: 0,
        name:''
      }
      lists.push(newData);//实质是添加lists数组内容，使for循环多一次
      this.setData({
        selectTeeth: lists,
    })
    }else{
      wx.showToast({
        title: '请把信息填写完整在添加！',
        duration: 2000,
        icon: 'none',
      })
    }


 },
 handelreduce(){ //减少
  if(this.data.selectTeeth.length>1){
    var lists = this.data.selectTeeth;
    lists.pop();      //实质是删除lists数组内容，使for循环少一次
    this.setData({
      selectTeeth: lists,
    })
  }else{
    wx.showToast({
      title: '不能在减了！',
      duration: 2000,
      icon: 'none',
    })
  }

  },  
   //上传图片开始
   chooseImg: function (e) {
    var that = this

      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;

          ossHttp.put('register/business',tempFilePaths[0]).then(result=>{
          // console.log('ossImg',result)
          that.setData({
            pics:result.url ,
            upimg:true
          })
          wx.setStorageSync('business',result.url )
        }) 
        }
      });
    
  },
    // 预览图片
    previewImg: function (e) {
      //获取当前图片的下标
      let arr = []
      arr.push(this.data.pics)
      wx.previewImage({
        //当前显示图片
        current: arr[0],
        urls: arr,
      })
    },
    chooseImgperson(){
      var that = this
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;

          ossHttp.put('register/idcardone',tempFilePaths[0]).then(result=>{
          // console.log('ossImg',result)
          that.setData({
            persone:result.url ,
            showperone:true
          })
          wx.setStorageSync('idcardone',result.url )
        }) 
        }
      });
    },
      // 预览图片身份证正面
      previewidcard: function (e) {
        //获取当前图片的下标
        let arr = []
        arr.push(this.data.persone)
        wx.previewImage({
          //当前显示图片
          current: arr[0],
          urls: arr,
        })
      },

      chooseImgcardt(){
        var that = this
        wx.chooseImage({
          count: 1, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
  
            ossHttp.put('register/idcardtwo',tempFilePaths[0]).then(result=>{
            // console.log('ossImg',result)
            that.setData({
              persontw:result.url ,
              showpert:true
            })
            wx.setStorageSync('idcardtwo',result.url )
          }) 
          }
        });
      },
        // 预览图片身份证反面
        previewImgcardt: function (e) {
          //获取当前图片的下标
          let arr = []
          arr.push(this.data.persontw)
          wx.previewImage({
            //当前显示图片
            current: arr[0],
            urls: arr,
          })
        },
  
      

    bindPickerChanges(e) {
 
      const {selectTeeth} =this.data
      const curindex = e.target.dataset.current;
      this.data.selectTeeth[curindex].indexs = e.detail.value;
      this.data.selectTeeth[curindex].selectsongdong = this.data.songdong[e.detail.value]


      let arr = selectTeeth.map(item=>{
        let obj={
            "cityCode":item.code? item.code[1]:'',
            "cityName": item.code?item.arrdes[1]:'',
            "districtCode":item.code? item.code[2]:'',
            "districtName":item.code? item.arrdes[2]:'',
            "provinceCode": item.code?item.code[0]:'',
            "provinceName":item.code? item.arrdes[0]:'',
            "productList": [
              {
                "sapMatCode": item.selectsongdong.code,
                "sapMatDescribe": item.selectsongdong.name,
              }
            ],
        }
        return obj
      
     })
      this.setData({
        selectTeeth: this.data.selectTeeth,
        productAndArea:arr
      })
      
    },
    handelgetBrandInfo(brandCode){ //获取所属品牌
      regBrandInfo()
        .then(resp=>{
         if(resp.data.code==200){
           let brand = resp.data.data
           if(brandCode){
             brand.map(item=>{
               let arr = brandCode.split(',')
                arr.map(res=> {
                 if(item.brandCode == res){
                   let compnyls = []
                    compnyls.push(item)
                    this.setData({brand:compnyls,readonley:false})
                    console.log(compnyls)
                    if(compnyls.length==1){
                       this.handelgetregister(compnyls[0].brandCode)
                      this.setData({
                        brandes:compnyls[0].brandInfoName
                      })
                    }
                 }
               })
                 
             })
            
           }else{
            this.setData({brand,readonley:true})
           }
            
         }
        })
    },
    handelgetregister(brandCode){ //获取经销商编码
      const data = {
        brandCode
      }
      const {scene} =this.data
      register(data)
         .then(resp=>{
           if(resp.data.code==200){
             let angentlist = resp.data.data.agentListDTOList
             let organiList = resp.data.data.organizationByBrandCodeListDTOList.child
            if(scene){
              angentlist.map(item=>{
                if(item.agentCode==scene[0]){
                    this.setData({
                      angentlist,
                      organiList,
                      angentuli:item.agentName
                    })
                    wx.setStorageSync('parentCode', item.agentCode)
                }
              })
               
            }else{
              this.setData({angentlist,organiList})
            }
              
             
           }else{
             wx.showToast({
               title: resp.data.msg,
               duration: 2000,
               icon: 'none',
             })
             this.setData({errCode:resp.data.code})
           }
         })
    },
    hdchangecode(e){ //后面需要改 
     if(CreditCodeValid.CreditCodeValid(e.detail)){
       this.handelgetqualify(e.detail)
       this.setData({creditCode:e.detail})
     }
    },
    handelgetqualify(socialCode){
      const data = {
        socialCode
      }
      qualify(data)
         .then(resp=>{
           if(resp.data.code==200){
            let TwoData=resp.data.data
            if(TwoData){
              this.setData({
                compayName:TwoData.companyName,
                ContactAddress:TwoData.address,
                creditCode:TwoData.socialCode,
                ContactNumber:TwoData.phone,
                TheContact:TwoData.contact,
                radio:TwoData.qualifType==0?"company":"personal",
              })
           }
          }
         })
    },
    handelgetbusiness(code){
      const data = {
        code
      }
      business(data)
        .then(resp=>{
           if(resp.data.code==200){
              let businList = resp.data.data
              this.setData({businList})
           }

        })
    },
        // 点击地址编辑
        chooseRegion(e) {
          let indec = e.currentTarget.dataset.current
          this.setData({
              showRegion: true,
              curindex:indec
          });
      },
      handelgetprovince(){
        province()
          .then(resp=>{
            if(resp.data.code==200){
              this.setData({province:resp.data.data})
            }
          })
      },
      handlgetcity(e){
        const data = {
          id:e.currentTarget.dataset.code
        }
        this.setData({cityId:data.id})
        city(data)
          .then(resp=>{
            if(resp.data.code==200){
               this.setData({city:resp.data.data,distrcit:[],ouenId:''})
            }
          })
      },
      handelgetdistrcit(e){
        const data = {
          id:e.currentTarget.dataset.code
        }
        this.setData({distrcitId:data.id})
        distrcit(data)
          .then(resp=>{
            if(resp.data.code==200){
              this.setData({distrcit:resp.data.data})
            }
          })
      },
      handelgetaladdes(e){
        const data = {
          id:e.currentTarget.dataset.code
        }
        this.setData({ouenId:data.id})

      },
      handelgetmatCode(){
        //this.data.companycode
        const data = {
           id:this.data.companycode||wx.getStorageSync('companycode')
        }
        matCode(data)
          .then(resp=>{
            if(resp.data.code==200){
                this.setData({
                  songdong:this.data.songdong.concat(resp.data.data)
                })
            }else if(resp.data.code==11111){
              wx.showToast({
                title: resp.data.msg,
                duration: 2000,
                icon: 'none',
              })
            }else if(resp.data.code==40102){
              wx.showToast({
                title: '没有找到销售物料对应数据',
                duration: 2200,
                icon: 'none',
              })
            }
          })
      },
      handelregisterst(){ //注册
        let pageone = wx.getStorageSync('regester')||{}
        let pagetwo = wx.getStorageSync('regestertwo')||{}
        let personal = wx.getStorageSync('personal')|| {}
        const data = {
          "address":pagetwo.ContactAddress||"",
          "agentType": 1,
          "belongAreaCode": this.data.belongAreaCode||"", //所属区域
          "brandCode":wx.getStorageSync('companycode')||"", //所属品牌
          "businessLicense": this.data.pics, //图片
          "businessPerson": this.data.businessPerson||'',
          "companyName":pagetwo.compayName|| personal.compayName ||'',
          "contact":pagetwo.TheContact||"",
          "idCard": personal.cardID||'', //身份证
          "idCardUrlOne": this.data.persone||'', //身份证正面
          "idCardUrlTwo": this.data.persontw ||'',
          "loginPhone":pageone.phoneumber||"" ,
          "name":personal.realname || '' ,//现在个人时候的名字
          "parentCode":wx.getStorageSync('parentCode')|| '', //经销商编码
          "password":pageone.password ||"",
          "phone":pagetwo.ContactNumber||"",
          "productAndArea": this.data.productAndArea || [],
          "qualifType":this.data.radio=='company'?0:1,
          "socialCode":pagetwo.creditCode||''
        }
        registerst(data)
            .then(resp=>{
              if(resp.data.code==200){
                wx.showToast({
                  title: '注册成功！',
                  duration: 2000,
                  icon: 'success',
                  success: (res) => {
                    wx.reLaunch({
                      url: '/pages/login/login',
                    })
                  },
                })

                 wx.removeStorageSync('idcardone')
                 wx.removeStorageSync('idcardtwo')
                 wx.removeStorageSync('regester')
                 wx.removeStorageSync('regestertwo')
                 wx.removeStorageSync('personal')
                 wx.removeStorageSync('addess')
                 wx.removeStorageSync('parentCode')


              }else {
                wx.showToast({
                  title: resp.data.msg,
                  duration: 2000,
                  icon: 'none',
                })
              }
            })
      },
      viliter(){
        const {organame,alladerss,selectTeeth,businList} =this.data
        if(organame==""){
            wx.showToast({
              title: '请选所属管理区域',
              duration: 2000,
              icon: 'none',
            })
        }else if(businList[this.data.busidex]==undefined||businList[this.data.busidex].name==''){
          wx.showToast({
            title: '请选择关联业务人员',
            duration: 2000,
            icon: 'none',
          })
        }else if(alladerss==''){
          wx.showToast({
            title: '请选销售区域',
            duration: 2000,
            icon: 'none',
          })
        }else if(selectTeeth[this.data.curindex]==undefined||selectTeeth[this.data.curindex].indexs==0){
          wx.showToast({
            title: '请选择销售物料号',
            duration: 2000,
            icon: 'none',
          })
        }else{
          return true
        }
        return false
      },
      handeltoupok(){ //提交
       if(this.viliter()){
        this.handelregisterst()
       }
       
      },
      handeltosetpass(){
         wx.navigateTo({
           url: '/pages/upDatapassword/upDatapassword',
         })
      },

      handeltotperson(){// 选个人的时候的校验 下一步
        if(this.viltperson()){
          this.setData({pageone:false,pagetwo:false,pagethree:true,active:'2'})
           wx.setStorageSync('personal', this.data.formSubmitpagetwo)
        }
      },

    viltperson(){// 选个人的时候的校验
      const {formSubmitpagetwo} =this.data
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if(formSubmitpagetwo.realname==null){
        wx.showToast({
          title: '请输入姓名',
          duration: 2000,
          icon: 'none',
        })
      }else if(formSubmitpagetwo.cardID==null||reg.test(formSubmitpagetwo.cardID) == false){
        wx.showToast({
          title: '请输入正确的身份证号',
          duration: 2000,
          icon: 'none',
        })
      }else if(formSubmitpagetwo.compayName==null){
        wx.showToast({
          title: '请输入公司名称',
          duration: 2000,
          icon: 'none',
        })
      }else if(this.data.persone==''){
        wx.showToast({
          title: '请输上传身份证正面照',
          duration: 2000,
          icon: 'none',
        })
      }else if(this.data.persontw==""){
        wx.showToast({
          title: '请输上传身份证反面照',
          duration: 2000,
          icon: 'none',
        })
      }else{
        return true
      }
      return false
    },



      handelphone(e){ //验证手机号
        this.setData({phoneumber:e.detail})
        if(/^1(3|5|6|7|8|9)\d{9}$/.test(e.detail)){
          loginPhone({loginPhone:e.detail})
             .then(resp=>{
               if(resp.data.code==200){
                   if(resp.data.data==1){
                     wx.showToast({
                       title: '该手机号已注册过主账号!',
                       duration: 2000,
                       icon: 'none',
                     })
                     this.setData({disabled:true,phoneumber:''})
                   }else if(resp.data.data==2){
                      wx.showToast({
                        title: '该手机号已注册过请换手机号!',
                        duration: 2000,
                        icon: 'none',
                      })
                      this.setData({disabled:true,phoneumber:''})
                   }else {
                    this.setData({disabled:false})
                   }
               }
             })
        }
      },
  /**
   * 页面的初始数据
   */
  data: {
    pics:"",
    brand:[], //所属品牌
    province:[], //省份
    city:[], //城市
    cityId:'',
    disabled:false, //密码是否能输入
    ouenId:'',
    distrcitId:'',
    parentCode:'', //属实上级经销商编码
    belongAreaCode:'',//所属区域code
    distrcit:[], //区域
    angentlist:[], //获取经销商编码
    upimg:false,
    showperone:false, //上传图片是否显示
    showpert:false,
    persone:'', //身份证照片正面
    persontw:'', //身份证照片反面
    TwoData:"",  //第二页的数据 通过信用码请求的
    organiList:[],// 所属管理区域
    businList:[], //关联业务人员
    indexone:'',
    organindex:'',
    curindex:'', //选择的下表
    companycode:'', //选择所属品牌公司的code
    busidex:'',
    businessPerson:'', //关联业务人员code
    quyuindex:'',
    radio:"company",
    buttencolor:false, //button的颜色
    selectTeeth: [{indexk: 0,indexs: 0,name:''}],
    songdong: [{name:"请选择销售物料号",code:-100}], //物料
    fileList: [], //上传的图片
    ispassword:false,
    nextpage:false,
    pageone:false,
    pagetwo:false,
    pagethree:false,
    errCode:'', //点击经销商编码 错误返回
    active:'0',
    showRegion:false, 
    alladerss:'', //销售区域
    areaAll:[], //销售区域集合
    productAndArea:[],
    steps: [
      {
        desc: '基本信息'
      },
      {
        desc: '资质上传'
      },
      {
        desc: '其他信息'
      }
    ],
    formSubmit:'',
    readonley:true, //经销商是否可以选
    formSubmitpagetwo:'',
    formSubmitthree:'',
    organame:'', //所属管理区域
    brandes:'',//回显品牌内容
    angentuli:'', //回显内容经销商编码
    fooyter:false, //忘记密码显示
    scene:'', //二维码数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.scene){
      const scene = decodeURIComponent(options.scene)
      console.log('options==========>',scene)
      let brandes = scene.split(",")
      this.setData({scene:brandes}) //保存二维码数据
      console.log(brandes[1])
      this.handelgetBrandInfo(brandes[1])
    }else{
      this.handelgetBrandInfo()
    }
  
    const {code,name} =options
     let adcodes = wx.getStorageSync('addess').code
     this.handelgetprovince()
     this.handelgetmatCode()
     if(code||adcodes){
        this.handelgetbusiness(code||adcodes)
      }

     if(code&&name){ //重选择区域过来
      this.setData({pageone:false,pagetwo:false,pagethree:true,active:'2',fooyter:true})
      wx.setStorageSync('addess', {code:code,name:name}) 
     }else{
      this.setData({pageone:true,fooyter:true})
     }
     this.setData({
      belongAreaCode:code||wx.getStorageSync('addess').code||'', 
      organame:name||wx.getStorageSync('addess').name||'', 
     })
    //  ========
     if(wx.getStorageSync('business')){
      this.setData({
        upimg:true,
        pics:wx.getStorageSync('business'),
       })
     }
    //  ==========
     if(wx.getStorageSync('idcardone')){
      this.setData({
        showperone:true,
        persone:wx.getStorageSync('idcardone'),
       })
     }
    //  ============
     if(wx.getStorageSync('idcardtwo')){
      this.setData({
        showpert:true,
        persontw:wx.getStorageSync('idcardtwo'),
       })
     }
     if(wx.getStorageSync('regester')){ //第一页的回显
       let pageone = wx.getStorageSync('regester')
       this.setData({
         brandes:pageone.brand,
         angentuli:pageone.DealerCode,
         phoneumber:pageone.phoneumber,
         password:pageone.password,
         passwordAgin:pageone.passwordAgin
       })
     }
     if(wx.getStorageSync('regestertwo')){
      let pagetwo = wx.getStorageSync('regestertwo')
      this.setData({
        radio:pagetwo.company=="company"?"company":"personal",
        compayName:pagetwo.compayName||"",
        ContactAddress:pagetwo.ContactAddress||"",
        creditCode:pagetwo.creditCode||"",
        ContactNumber:pagetwo.ContactNumber||"",
        TheContact:pagetwo.TheContact||"",
      })

     }
     if(wx.getStorageSync('personal')){
      let personal = wx.getStorageSync('personal')
      this.setData({
        radio:personal.company=="company"?"company":"personal",
        realname:personal.realname,
        cardID:personal.cardID,
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