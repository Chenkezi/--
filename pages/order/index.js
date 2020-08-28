// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 标题栏
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'待付款',
        isActive:false
      },
      {
        id:2,
        value:'待发货',
        isActive:false
      },
      {
        id:3,
        value:'退款/退货',
        isActive:false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    //获取当前的小程序页面栈-数组 长度最大为10 最大索引为当前页面
    let pages=getCurrentPages()
    // 获取当前页面
    let currentPage=pages[pages.length-1]
    // 获取url上面的参数
    const {type}=currentPage.options
    console.log(type)
    let {tabs}=this.data
    tabs.forEach(v=>{
      if(v.id+1==type){
        v.isActive=true
      }else{
        v.isActive=false
      }
    })
    this.setData({
      tabs
    })
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