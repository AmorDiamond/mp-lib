Component({
  properties: {
    userInfo: {
      type: Object,
      value: {},
    },
    roles: {
      type: Array,
      value: [],
    }
  },
  data: {
  },
  methods: {
    // 这里是一个自定义方法
    clickHandle: function(){
      const userInfo = this.data.userInfo
      console.log(userInfo)
      this.triggerEvent("click",userInfo)
    }
  }
})