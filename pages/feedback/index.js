// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'体交问题',
        isActive:true
      },
      {
        id:1,
        value:'商品、商家投诉',
        isActive:false
      }
    ],
    chooseImgs:[],
    textVal:''
  },
  // 标题点击事件,子组件传递过来
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    const {index}=e.detail
    // 修改原数组
    let {tabs}=this.data
    tabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false)
    // 赋值到data中
    this.setData({
      tabs
    })
  },
  // 点击加号选择图片
  handleChooseImg(){
    // 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片数量
      count: 9,
      // 图片的格式、原图、压缩
      sizeType:['original','compressed'],
      // 图片的来源 相册 相机
      sourceType:['album','camera'],
      success:(result)=>{
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      }
    })
  },
  // 点击自定义图片组件
  handleRemoveImg(e){
    // 获取被点击的组件索引
    const {index}=e.currentTarget.dataset
    // 获取data中的图片数组
    let {chooseImgs}=this.data
    // 删除元素
    chooseImgs.splice(index,1)
    this.setData({
      chooseImgs
    })
  },
  // 文本域事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  // 提交按钮的点击
  handleFormSubmit(){
    // 获取文本域的内容
    const {textVal}=this.data
    // 合法性的验证
    if(!textVal.trim()){
      // 不合法
      wx.showToast({
        title:'输入不合法',
        icon:'none',
        mask:true
      })
      return
    }
    let {chooseImgs}=this.data
    // 上传图片
    chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
        // 图片上传的地址
        url:'https://images.ac.cn/Home/Index/UploadAction/',
        // 被上传的文件路
        filePath:v,
        // 上传的文件名称 后台来获取文件 file
        name:"file",
        // 顺带的文本信息
        formData:{},
        success:(result)=>{
          console.log(result)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})