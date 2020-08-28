

import {request} from "../../request/index"

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
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    // 商品数据
    goods_list:[]
  },
  // 接口的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||''
    this.QueryParams.query=options.query||''
    this.getGoodsList()
  },
  // 获取商品数据
  async getGoodsList(){
    const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams})
    // 获取总商品数
    const total=res.data.message.total
    // 计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      // 拼接数据
     goods_list:[...this.data.goods_list,...res.data.message.goods]
    })
    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh()
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
  // 页面上滑触底事件
  onReachBottom(){
    // 判断有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      wx-wx.showToast({
        title: '没有下一页数据了',
      })
    }else{
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    // 重置数组
    this.setData({
      goods_list:[]
    })
    // 重置页码
    this.QueryParams.pagenum=1
    // 获取数据
    this.getGoodsList()
  }
})