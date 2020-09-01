import { appCenter } from '../core/appCetner'
const _errorCode = {
  1: '抱歉，出现错误！',
  400: '请求包含不支持的参数',
  401: '未授权',
  403: '被禁止访问',
  404: '请求的资源不存在',
  500: '系统内部错误'
};

//添加事件结束
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

class HTTP {
  request({ url, data = {}, method = 'GET', header }) {

    const _request = (url, resolve, reject, data, method, header) => {
      let requestUrl = appCenter.apiBaseUrl + url;
      if (url && url.indexOf('https://') > -1) {
        requestUrl = url
      }
      header = { ...header, accountType: 1, agentCode: appCenter.getAgentCode() }
      header = requestBeforeSetToken(header)

      wx.request({
        url: requestUrl,
        method: method,
        data: data,
        header,
        success: (res) => {
          console.log(res)
          let code = res.statusCode.toString();
          // 业务返回状态
          let statusCode = res.data.code;
          if (code.startsWith(2) && statusCode == 200) {
            resolve(res.data);
          } else {
            reject()
            if(statusCode == 12004){
              wx.showToast({
                title: res.data.msg || res.data.data.msg,
                duration: 2000,
                icon: 'none',
                success:()=>{
                  wx.redirectTo({
                    url: '/pages/login/login',
                  })
                  wx.clearStorage()
                }
              })
              return
            }
            _showError(statusCode || code, res)
          }
        },
        fail: (err) => {
          reject()
          _showError(1)
        }
      })
    };
    const _showError = (errorCode, res) => {
      let errorMsg = _errorCode[errorCode] ? _errorCode[errorCode] : (res.data.data && res.data.data.msg ? res.data.data.msg : res.data.msg || res.data.message) || _errorCode[1]
      wx.showToast({
        title: errorMsg,
        icon: 'none',
        duration: 2000
      })
    }

    return new Promise((resolve, reject) => {
      _request(url, resolve, reject, data, method, header)
    })
  }
}

function requestBeforeSetToken(header) {
  const Authorization = appCenter.getToken()
  return { ...header, Authorization }
}

const http = new HTTP().request

export {
  HTTP,
  http
}