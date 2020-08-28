// pages/category/index.js
import {request} from '../../request/index.js'
Page({ 
  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    //记录被点击的菜单选项
    currentIndex:0,
    // 右侧滚动置顶
    scrollTop:0
  },
  //接口返回的数据
  Cates:[],

  onReady: function () {
    
    // 判断本地是否存有数据
    const Cates=wx.getStorageSync("cates")
    if(!Cates){
      this.getCates()
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCates()
      }else{
        this.Cates=Cates.data
        let leftMenuList=this.Cates.map(v=>v.cat_name)
        let rightContent=this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    
  },
  getCates(){
    request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then(res=>{
      this.Cates=res.data.message
      // 把接口数据存入本地
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})

      //构造左侧数据
      let leftMenuList=this.Cates.map(v=>v.cat_name)
      let rightContent=this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  // 左侧菜单的点击事件并展示相应的数据
  handleItemTap(e){
    const {index}=e.currentTarget.dataset
    let rightContent=this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})