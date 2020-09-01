import {AgentUser} from '../../../utils/ajax.js'


Page({
  handelgetAgentUser(){
    const data = {
       page:this.data.page,
       size:10
    }
    if(this.data.page<=this.data.totalPages){
    AgentUser(data)
      .then(resp=>{
        if(resp.data.code==200){
          let staffList = resp.data.data.content
          console.log(staffList)
          for( let i in staffList){
            staffList[i].role = staffList[i].roleName&&staffList[i].roleName.split(',')
          }
          this.setData({
            staffList:this.data.staffList.concat(staffList),
            page:this.data.page+1,
            totalPages:resp.data.data.totalPages,
            
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
  lower(e){
      this.handelgetAgentUser()
   },


  data: {
    staffList: [],
    totalPages:1,
    page:1,
  },

  onLoad: function () {
      this.handelgetAgentUser()
  },

  onToUpdate: function (e) {
    console.log(e.detail)
    const id = e.detail.id
    const phone = e.detail.phone
    const name = e.detail.userName
    const roleName = e.detail.roleName
    const isValid = e.detail.isValid
    const roleId = e.detail.roleId
    wx.navigateTo({url: `/pages/StaffManage/UpdateStaff/index?name=${name}&phone=${phone}&roleName=${roleName}&isValid=${isValid}&roleId=${roleId}&id=${id}`})
  },
  
  addStaff: function () {
    wx.navigateTo({url: '/pages/StaffManage/AddStaff/index'})
  }

})