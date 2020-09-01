Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
    phone: {
      type: String,
      value: '',
    },
    userRoles: {
      type: Array,
      value: [],
    },
    status: {
      type: String,
      value: '',
    },
    roles: {
      type: Array,
      value: [],
    },
    allData: {
      type: Boolean
    }
  },
  data: {
    // name: '',
    // phone: '',
     //userRoles: [], // 用户拥有的角色信息、已选择的角色信息
    statusIndex: 0, // 状态索引，默认启用
    statusText: '启用', // 界面显示状态文本
    result:[],
    openRoleModal: false,
    statusOptions: [
      {
        id: 1,
        name: '启用'
      },
      {
        id: 0,
        name: '禁用'
      },
    ],
    /* roles: [
      {
        value: 1,
        name: '财务',
      },
      {
        value: 2,
        name: '库管',
      }
    ] */
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  observers: {
    "status": function(status) { // 动态获取父级组件数据进行处理

      this.initStatusInof()
      //  if (status!==this.data.status) {
      //   this.setData({
      //     status,
      //   },()=>this.initStatusInof())
      // } 
    }
  },

  methods: {
    initStatusInof: function () {
      let { status, statusOptions, statusIndex, statusText } = this.data
    
      if (!status) {
        return
      }
      statusIndex = statusOptions.findIndex(option=>option.id==status)
      const statusData = statusOptions.find(option=>option.id==status)
      statusText = statusData?statusData.name:statusText
 
      this.setData({
        statusIndex,
        statusText,
      })
    },

    nameInputChange: function (e) {
      const name = e.detail.value
      this.setData({
        name,
      })
    },
    noop() {},
    onChange(event) {
    
      this.setData({
        result: event.detail
      });
    },
  
    // toggle(event) {
    //   // console.log(event)
    //   const { index } = event.currentTarget.dataset;
    //   const checkbox = this.selectComponent(`.checkboxes-${index}`);
    //   checkbox.toggle();
    // },
    phoneInputChange: function (e) {
      const phone = e.detail.value
      this.setData({
        phone,
      })
    },
    bindPickerChange: function (e) {
      const index = e.detail.value
      const status = this.data.statusOptions[index].id
      const statusText = this.data.statusOptions[index].name
   
      this.setData({
        status,
        statusText,
      })
    },
    rolesChooseChange: function (e) {
      const roleIds = e.detail.value
     
      let { roles } = this.data
      // console.log(roleIds,roles)
      const userRoles = roles.filter(role=>roleIds.includes(String(role.id)))
      roles = roles.map(role=>{
        if (roleIds.includes(String(role.id))) {
          role.checked = true
        } else {
          role.checked = false
        }
        return role
      })
 
      this.setData({
        userRoles,
        roles,
        result: e.detail
      })
    },
    openRoleModalHandle: function () {
      this.setData({
        openRoleModal: true,
      })
    },
    closeRoleModalHandle: function () {
      this.setData({
        openRoleModal: false,
      })
    },

 vliter(){
  const { name, phone,userRoles } = this.data
  if(name==""){
    wx.showToast({
      title: '请填员工姓名',
      duration: 2000,
      icon: 'none',
    })
  } else if(!(/^1(3|5|6|7|8|9)\d{9}$/.test(phone))){
    wx.showToast({
      title: '请填写正确的手机号',
      duration: 2000,
      icon: 'none',
    })
   }else if(userRoles.length==0){
    wx.showToast({
      title: '请选择员工角色',
      duration: 2000,
      icon: 'none',
    })
   }else{
     return true
   }
   return false
 },

    formSubmit: function(){
      const { name, phone, statusOptions, statusIndex, userRoles } = this.data
    if(this.vliter()){
      const status = statusOptions[statusIndex].id
      const userInfo = {name, phone, status, userRoles}
      this.triggerEvent("formSubmit",userInfo)
    }
  }
  }
})