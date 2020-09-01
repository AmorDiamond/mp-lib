import {selectRole,addAgentUser} from '../../../utils/ajax.js'

Page({

  handelgetrole(){
    const data = {
      agentCode: wx.getStorageSync('agentCode')
    }
   selectRole(data)
    .then(resp=>{
      if(resp.data.code==200){
        let tsroles = resp.data.data
        this.setData({roles:tsroles})
      }
    })
  },




  data: {
    roles: [],
  },

  onLoad () {
    this.handelgetrole()

  },

  onFormSubmit: function (e) {
    console.log(e.detail)
    let roleI = e.detail.userRoles.map(item => item.id)
    const data = {
      accountType:wx.getStorageSync('accountType'),
      phone:e.detail.phone,
      userName:e.detail.name,
      isValid:e.detail.status,
      agentName:wx.getStorageSync('companylist')[0].agentName,
      agentCode:wx.getStorageSync('agentCode'),
      roleId:roleI
    }
    addAgentUser(data)
      .then(resp=>{
        if(resp.data.code==200){
          wx.showToast({
            title: '新增成功!',
            duration: 2000,
            icon: 'success',
            success: (res) => {
              wx.redirectTo({url: '/pages/StaffManage/MyStaffList/index'})
            },
          })
        }else{
          wx.showToast({
            title: resp.data.msg,
            duration: 2000,
            icon: 'none',
          })
        }
      })

  },

})