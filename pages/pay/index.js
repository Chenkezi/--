
import {getSetting,chooseAddress,openSetting,showModal,showToast,requestPayment} from '../../utils/asyncWx'
import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址信息
    address:{},
    // 购物车商品
    cart:[],
    // 总价格
    totalPrice:0,
    // 总数量
    totalNum:0
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取本地缓存中的地址
    const address=wx.getStorageSync("address")
    let cart=wx.getStorageSync("cart")||[]
    // 过滤后的购物车数组
    cart=cart.filter(v=>v.checked)
    
    // 计算总价格和数量
    let totalPrice=0
    let totalNum=0
    cart.forEach(v=>{
      totalPrice+=v.num*v.goods_price
      totalNum+=v.num
    })
    this.setData({
      cart,
      address,
      totalPrice,
      totalNum
    })
  },
  //点击支付
  async handleOrderPay(){
    // showToast({title:'没有企业账号无法获取'})
    // // 没有企业账号无法拿到token
    // return

    try{
      // 判断缓存中有没有token
      const token=wx.getStorageSync("token")
      if(!token){
        wx.navigateTo({
          url:'/pages/auth/index'
        })
        return
      }
      // 创建订单
      //请求参数
      const order_price=this.data.totalPrice
      const consignee_addr=this.data.address.all
      const cart=this.data.cart
      let goods=[]
      cart.forEach(v=>goods.push({
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      }))
      const orderParams={order_price,consignee_addr, goods}
      // 发送请求创建订单 获取订单编号
      const {order_number}=await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create',method:'POST',data:orderParams})
      // 发起 预支付接口
      const {pay}=await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/req_unifiedorder',method:postMessage,data:{order_number}})
      // 发起微信支付
      await requestPayment(pay)
      // 查询后台 订单状态
      const res=await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/chkOrder',method:"POST",data:{order_number}})
      await showToast({title:'支付成功'})
      // 删除缓存中已支付的商品
      let newCart=wx.getStorageSync("cart")
      newCart=newCart.filter(v=>!v.checked)
      wx.getStorageSync("cart",newCart)
      // 支付成功跳转到 订单页面
      wx.navigateTo({
        url: '/pages/order/index',
      })
    }catch(error){
      await showToast({title:'支付失败'})
      console.log(error)
    }
  }
})