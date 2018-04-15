//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hotList: [
      {
        pic: '/images/example2.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '/images/example2.png',
        title: '玻璃棧道2',
        desc: '22W人去過'
      }, {
        pic: '/images/example2.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: '/images/example2.png',
        title: '玻璃棧道3',
        desc: '22W人去過'
      }, {
        pic: '/images/example2.png',
        title: '玻璃棧道4',
        desc: '22W人去過'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 跳转到豆瓣页面
  clickToDouban: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
