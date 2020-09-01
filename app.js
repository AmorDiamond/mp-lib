//app.js
App({
  onLaunch: function () {
        // 登录
        wx.login({
          success: res => {
              // console.log(res)
              var code = res.code;
              var appId = "wx482c8ac8db768a85";
              var secret = "39c155d647fbcb9fded83ce5ed919ea3";
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if (res.code) {
                  wx.request({
                      url:
                          "https://api.weixin.qq.com/sns/jscode2session?appid=" +
                          appId +
                          "&secret=" +
                          secret +
                          "&js_code=" +
                          code +
                          "&grant_type=authorization_code",
                      data: {
                          code: res.code,
                          appid: "wx482c8ac8db768a85",
                          secret: "39c155d647fbcb9fded83ce5ed919ea3"
                      },
                      method: "POST",
                      success: res => {
                          this.globalData.openid = res.data.openid;
                          // console.log("openid:"+res.data.openid)
                      }
                  });
              }
          }
      });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: "",
    navHeight: 0,
    Authorization:'', //token
    accountType: 1, // 登录类型
    companylist:[],
    userole:[]
  },
  inventory:{
    cycle:[],
    selectList:[],
    selectitem:'',
    addsearch:[]
  }
})