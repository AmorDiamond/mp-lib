import { formatTimeItem } from './util'
import { baseURL } from './ajax'

const ossConfig = {
  /* 泸州老窖OSS */
  // region: 'oss-cn-shanghai',
  region: 'oss-accelerate',
  bucket: 'lzlj-jxsmh',
}

const fileKeyFormat = (modelPath,file,key) => {
  const { name } = file
  const {year, month, day, hour, minute, second} = formatTimeItem()
  const date = year+'-'+month+'-'+day
  const time = year+''+month+''+day+''+hour+''+minute+''+second
  console.log(date,time)
  let fileName = key?('/'+key):time+name
  if (!name) {
    // const index = imgsrc.lastIndexOf("\.")
    // const imgExtension = imgsrc.substring(index + 1, imgsrc.length)
    const prefixIndex = file.indexOf("://")
    const imgName = file.substring(prefixIndex+3)
    // const imgPath = imgName + "." + imgExtension
    fileName = imgName
  }
  let pathName = modelPath
  key = pathName+'/'+date+'/'+fileName
  // key为oss里文件保存路径，oss里的资源大小写敏感，key尽量使用全小写，多个单词可以用 - 分隔。
  return key
}
// 获取policy和signaturebuild
const applySignatureDo = () => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL+'/api/v1/user/aliyunoss/credentials/policy',
      method: 'GET',
      header:{
        Authorization:wx.getStorageSync('token'),
        accountType :wx.getStorageSync('accountType'),
      },
      success: function(res) {
        const statusCode = res.statusCode.toString()
        if (statusCode.startsWith(2)) {
          resolve(res.data.data)
        } else {
          reject(res)
        }
      },
      fail: function(res) {
        reject(res)
      },
    })
  })
}

const showToast = ({icon='success',title,duration=1000}) => {
  wx.showToast({
    icon,
    title,
    duration,
  })
}

const ossHttp = {
  put: (modelPath,file,key) => {
    wx.showLoading({
      title: "加载中...",
      mask: true
  })
    const ossUrl = 'https://'+ossConfig.bucket+'.'+ossConfig.region+'.aliyuncs.com'
    return new Promise((resolve,reject)=>{
      key = fileKeyFormat(modelPath,file,key)
      applySignatureDo().then(result=>{
        const { policy,signature,accessKeyId } = result
        wx.uploadFile({
          url: ossUrl,//上传的路径
          filePath: file,
          name: 'file',
          formData: {
            name: file,
            key: key, //上传图片的名字和路径（默认路径根目录，自定义目录：xxx/xxx.png）
            policy: policy,
            OSSAccessKeyId: accessKeyId,
            success_action_status: '200',
            signature: signature,
          },
          success: function (res) {
            console.log('chooseImage success, temp path is: ', file,res)
            let imgUrl = ossUrl + "/"+key
            const result = {url:imgUrl,...res}
            resolve(result)
          },
          fail: function (err) {
            reject(err)
            console.log('upladImage fail, errMsg is: ', err.errMsg)
            showToast({icon:'none',title:'上传失败'})
          },
          complete:function(){
            wx.hideLoading();
          },
        })
      }).catch(err=>{
        const title = err.data.msg||err.errMsg
        showToast({
          icon:'none',
          title
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/login/login',
          })
          wx.removeStorageSync('token')
          wx.removeStorageSync('brandInfoName')
        }, 1000);
      })
    })
  },
}

export {ossHttp}

// success:()=>{
//   setTimeout(() => {
//     wx.redirectTo({
//       url: '/pages/login/login',
//     })
//     wx.removeStorageSync('token')
//     wx.removeStorageSync('brandInfoName')
//   }, 1000);
// }