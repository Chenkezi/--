// 同时发送异步代码次数
let ajaxTimes=0

export const request=(params)=>{
  // 判断url中是否带有/my/  请求的是私有路劲带上header token
  let header={...params.header}
  if(params.url.includes("/my?")){
    //拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token")
  }

  ajaxTimes++
  // 显示加载动画
  wx.showLoading({
    title:"加载中",
    mask:true
  })

  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      header,
      success:(result)=>{ 
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        ajaxTimes--
        if(ajaxTimes==0){
          // 关闭加载动画
          wx.hideLoading()
        }
      }
    })
  })
}