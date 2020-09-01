class AppCenter {

  /* 开发环境 */
  apiBaseUrl = 'http://10.0.48.27:9999'
  /* 测试环境 */
  // apiBaseUrl = 'https://jxsmhtest.lzlj.com'
  /* 生产环境 */
  // apiBaseUrl = 'https://jxsmh-gateway.lzlj.com'
  /* UAT环境 */
  // apiBaseUrl = 'https://jxsmh-gateway-uat.lzlj.com'

  getToken() {
    return wx.getStorageSync('token')
  }

  getAgentCode() {
    return wx.getStorageSync('agentCode')
  }

  getAgentType() {
    return wx.getStorageSync('accountType')
  }

  getAccountInfo() {
    return wx.getStorageSync('realName')
  }

  getBrandList() {
    return wx.getStorageSync('companyList')
  }

}

const appCenter = new AppCenter()

export { appCenter }