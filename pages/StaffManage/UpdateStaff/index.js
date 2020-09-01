import {selectRole,AgentUserSave} from '../../../utils/ajax.js'


Page({
 handelgetrole(){
   const data = {
    agentCode: wx.getStorageSync('agentCode')
   }
  selectRole(data)
   .then(resp=>{
     if(resp.data.code==200){
       let tsroles = resp.data.data
       const userarr = this.data.roleId.split(',')
       let roles = tsroles.map(role=>{
        if (userarr.find(userRole=>userRole==role.id)) {
          role.checked = true
          
        }
        return role
      })
       this.setData({roles})
     }
   })
 },

  data: {
    roles: [],
    name:"",
    phone:"",
    roleNames:"",
    isValid:"",
    roleId:"",
    id:"",
    allData:'',
  },

  onLoad (option) {
    console.log(option)
    const {name,phone,roleName,isValid,roleId,id} = option
    let Names = roleName.split(',')
    let roleNames = Names.map(item=>{
       const arr = {
        roleName:item
       }
       return arr
    })
    this.setData({name,phone,roleNames,isValid,roleId,id,allData:option})
    this.handelgetrole()
   
  },

  onFormSubmit: function (e) {
    console.log(e.detail)
    let roleI = e.detail.userRoles.map(item=>item.id)
    if(/^1(3|5|6|7|8|9)\d{9}$/.test(e.detail.phone)){
    const data = {
      accountType:wx.getStorageSync('accountType'),
      agentName:wx.getStorageSync('companylist')[0].agentName,
      userName:e.detail.name,
      phone:e.detail.phone,
      isValid:e.detail.status,
      roleId:roleI[0]==undefined?this.data.roleId.split(","):roleI,
      id:this.data.id
    }
    AgentUserSave(data)
      .then(resp=>{
        if(resp.data.code==200){
          wx.showToast({
            title: '修改成功!',
            duration: 2000,
            icon: 'success',
            success: (res) => {
              wx.redirectTo({url: '/pages/StaffManage/MyStaffList/index'})
            },
          })
        }else{
          wx.showToast({
            title: '修改失败!',
            duration: 2000,
            icon: 'none',
          })
        }
      })
    
  }else{
    wx.showToast({
      title: '请填写正确的手机号',
      duration: 2000,
      icon: 'none',
    })
  }
}

})