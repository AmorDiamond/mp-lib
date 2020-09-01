import {getAgentNotice} from '../../../utils/ajax'

Page({
  data: {
    info: '',
    text:'',
    time:'' 
  },
   handelgetDetail(id){
     const data = {
      agentCode:wx.getStorageSync('agentCode'),
      id
     }
    getAgentNotice(data)
       .then((resp)=>{
        if(resp.data.code==200){
           console.log(resp)
           const info = resp.data.data
           let detail = info.text
           let src = detail.replace(/data-src/g, 'src')
           let imgsrc = src.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
           this.setData({
             info,
             text:imgsrc
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

   handelgetsure(){ //点击附件下载预览
    let url = this.data.info.enclosure.url
    let lats = url.substring(url.length-3)
    let xls = url.substring(url.length-4)

     if(lats=='png' || lats=='jpg' || lats=='JPG'){
        let arr = []
        arr.push(this.data.info.enclosure.url)
        wx.previewImage({
          //当前显示图片
          current: arr[0],
          urls: arr,
        })
     }else if(lats=='pdf'|| xls=='xlsx'|| lats=='xls' || lats == 'doc' || xls=='docx'){
      wx.downloadFile({
        url: url,
        success: function(res) {
            var filePath = res.tempFilePath;
            wx.openDocument({
                filePath: filePath,
                success: function(res) {
                   
                },
                fail: function(res) {
                    wx.showToast({
                      title: '打开文档失败',
                      duration: 2000,
                      icon: 'none',
                    })
                },
                complete: function(res) {
                    console.log(res);
                }
            })
        },
        fail: function(res) {
            console.log('文件下载失败');
            wx.showToast({
              title: '文件下载失败',
              duration: 2000,
              icon: 'none',
            })
        },
        complete: function(res) {},
    })

     }else{
       wx.showToast({
         title: '该格式文件不支持预览请去电脑端查看',
         duration: 2000,
         icon: 'none',
       })
     }
  },
   
  onLoad: function (option) {
    //  console.log(option)
   this.setData({time:option.time},()=>{
    this.handelgetDetail(option.id)
   })


  },

})