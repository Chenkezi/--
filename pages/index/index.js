
import {request} from '../../request/index'

Page({
  data: {
    //轮播图数据
    swiperList:[],
    // 导航数据
    catesList:[],
    //楼层数据
    floorList:[]
  },
  //页面加载就会触发
  onLoad: function () {
    //发送异步请求获取轮播图数据 
    this.getSwiperList()
    //获取导航数据
    this.getCateList()
    //获取楼层数据
    this.getFoorList()
  },
  getSwiperList(){
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'}).then((result)=>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  getCateList(){
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'}).then((result)=>{
      this.setData({
        catesList:result.data.message
      })
    })
  },
  getFoorList(){
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'}).then((result)=>{
      this.setData({
        floorList:result.data.message
      })
    })
  }
})
