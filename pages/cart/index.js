
import {getSetting,chooseAddress,openSetting,showModal,showToast} from '../../utils/asyncWx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址信息
    address:{},
    // 购物车商品
    cart:[],
    // 全选
    allChecked:false,
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
  // 点击收货地址
  async handleChooseAddress(){
    // 获取权限状态
    try{
      const res1=await getSetting()
      const scopeAddress=res1.authSetting["scope.address"]
      // 判断权限状态
      if(scopeAddress===false){
        await openSetting()
      }
      // 调用获取地址api
      const address=await chooseAddress()
      // 地址存入缓存
      wx.setStorageSync("address",address)
    }catch(error){
      console.log(error)
    }
  },
  // 点击商品选中
  handeItemCh(e){
    // 获取商品的id
    const goods_id=e.currentTarget.dataset.id
    // 获取购物车数组
    let {cart}=this.data
    const index=cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].checked=!cart[index].checked
    wx.setStorageSync("cart",cart)

    this.setCart(cart)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取本地缓存中的地址
    const address=wx.getStorageSync("address")
    const cart=wx.getStorageSync("cart")||[]

    this.setData({address})
    this.setCart(cart)
  },
  // 封装计算底部各种值
  setCart(cart){
    // 计算全选
    let allChecked=true
    // 计算总价格和数量
    let totalPrice=0
    let totalNum=0
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price
        totalNum+=v.num
      }else{
        allChecked=false
      }
    })
    allChecked=cart.length!==0?allChecked:false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart",cart)
  },
  // 全选
  handleItemAllCheck(){
    //获取data中的值
    let {cart,allChecked}=this.data
    //修改值
    allChecked=!allChecked
    cart.forEach(v=>v.checked=allChecked)
    this.setCart(cart)
  },
  // 商品数量编辑
  async handleItemNumEdit(e){
    // 获取传过来的值
    const {operation,id}=e.currentTarget.dataset
    //获取购物车数组
    let {cart}=this.data
    //找到要编辑商品的索引
    const index=cart.findIndex(v=>v.goods_id===id)
    //判断是否要执行删除
    if(cart[index].num===1&&operation===-1){
      //弹窗提示
      const res=await showModal({content:'是否删除'})
      if(res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
    }else{
      cart[index].num+=operation
      //保存数据
      this.setCart(cart)
    }
  },
  // 点击结算
  async handlePay(){
    //判断收货地址
    const {address,totalNum}=this.data
    if(!address.userName){
      await showToast({title:'您还没有填写收货地址'})
      return
    }
    //判断用户是否选择商品
    if(totalNum===0){
      await showToast({title:'您还有选择商品'})
      return
    }
    //跳转到商品页面
    wx.navigateTo({
      url:'/pages/pay/index'
    })
  },
})