import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    // 按钮是否显示
    isFocus:false,
    // 输入框的值
    inpValue:""
  },
  TimeId:-1,
  // 监听输入框值变化
  handleInput(e){
    // 获取输入框的值
    const {value}=e.detail
    // 检查合法性
    if(!value.trim()){
      this.setData({
        isFocus:false,
        goods:[]
      })
      // 值不合法
      return
    }
    // 显示按钮
    this.setData({
      isFocus:true
    })
    // 设置防抖
    clearTimeout(this.TimeId)//清除定时器
    this.TimeId=setTimeout(()=>{
      this.qsearch(value)
    },1000)
  },
  // 发送请求获取数据
  async qsearch(query){
    const res=await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',data:{query}})
    this.setData({
      goods:res.data.message.goods
    })
    console.log(this.data.goods)
  },
  // 点击取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
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