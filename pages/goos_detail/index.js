// pages/goos_detail/index.js
import {request} from '../../request/index'
import {showToast} from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:[],
    // 商品是否被收藏过
    isCollect:false
  },
  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options
    this.getGoodsDetail(goods_id) 
  },
  onShow:function(){
    let pages=getCurrentPages()
    let currentPage=pages[pages.length-1]
    let options=currentPage.options
    const {goods_id}=options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',data:{goods_id}})
    this.GoodsInfo=goodsObj.data.message
    //获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[]
    //判断商品是否被收藏
    let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    this.setData({
      goodsObj:{
        goods_name:goodsObj.data.message.goods_name,
        goods_price:goodsObj.data.message.goods_price,
        //iPhone部分手机不识别webp格式图片
        //临时自己更改
        goods_introduce:goodsObj.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.data.message.pics
      },
      isCollect
    })
  },
  //点击轮播图放大预览
  handlePrevewImage(e){
    //构造要预览的图片数组
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current=e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击加入购物车
  handleCartAdd(){
    //获取缓存中的购物车数组
    let cart=wx.getStorageSync("cart")||[]
    // 判断商品对象是否存在购物车
    let index=cart.findIndex(v=>v.goods_id==this.GoodsInfo.goods_id)
    if(index===-1){
      // 不存在
      this.GoodsInfo.num=1
      this.GoodsInfo.checked=true
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num++
    }
    // 把购物车重新添加到缓存中
    wx.setStorageSync("cart",cart)
    // 弹窗提醒
    wx.showToast({
      title:'加入成功',
      icon:'success',
      mask:false
    })
  },
  // 点击商品收藏
  handleCollect(){
    let isCollect=false
    // 获取缓存中收藏的数组
    let collect=wx.getStorageSync("collect")||[]
    // 判断当前商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index!==-1){
      // 已收藏，删除商品
      collect.splice(index,1)
      isCollect=false
      // 提示
      showToast({title:'取消收藏'})
    }else{
      // 没有收藏，添加商品
      collect.push(this.GoodsInfo)
      isCollect=true
      // 提示
      showToast({title:'成功收藏'})
    }
    // 把数组存入缓存
    wx.setStorageSync('collect', collect)
    // 修改收藏状态
    this.setData({
      isCollect
    })
  },
})