// pages/moreList/moreList.js
var serverUrl = require('../../utils/server.js');
var curUrl = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //curUrl = serverUrl.ROOT_URL + options.url;
    curUrl = serverUrl.MOVIE_NEW_URL;//先用这个代替, 回头改回来.
    console.log(curUrl);
    // wx.setNavigationBarTitle({
    //   title: options.title,
    // })
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
  
  },
  goSearch: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  }
})
