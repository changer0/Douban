// pages/detail/detail.js
var currentId = '';
var serverUrl = require('../../utils/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    currentId = options.id;
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
    var that = this;
    requestData(this, function(result) {
      that.setData({
        result: result
      });
    });
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
  
  },

})

/**
 * 请求数据
 */
function requestData(page, callBack) {

  wx.showLoading({
    title: '正在加载',
  })
  wx.request({
    url: serverUrl.MOVIE_DETAIL_BY_ID + currentId,
    //url: serverUrl.MOVIE_DETAIL_BY_ID + 4920389,
    method: 'GET',
    header: {
      "Content-Type": "json" // 默认值
    },
    success: function (res) {
      console.log("从网络获取的数据: " + res.data.title);
      callBack(res.data);
    },
    complete: function (res) {
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }
  })
}