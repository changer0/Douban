// pages/search/search.js
var serverUrl = require('../../utils/server.js');

var curSearchKey = '';
var lastStart = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    isLoadMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    lastStart += 10;
    // requestSearchResuleFromNet(curSearchKey, 0, 10, function (result) {      

    //     that.setData({
    //       result: result
    //     });
      

    // });
  },

  searchInput: function (e) {
    var that = this;
    //console.log(e.detail.value);
    curSearchKey = e.detail.value;
    if (curSearchKey !== '') {
      requestSearchResuleFromNet(curSearchKey, 0, 10, function (result) {
        //console.log(result.subjects[0].title);
        console.log(e.detail.value);
        if (curSearchKey === '') {
          that.setData({
            result: []
          });
        } else {
          that.setData({
            result: result
          });
        }

      });
    } else {
      that.setData({
        result: []
      });
    }

    // console.log(curSearchKey);
    //  if (curSearchKey !== '') {
    //    console.log("不为空");
    //  } else {
    //    console.log("为空");
    //  }

  },

  //返回
  goBack: function(e) {
    wx.navigateBack();
  }
})

/**
 * 请求搜索结果
 */
function requestSearchResuleFromNet(searchKey, start, count, resultCallback) {
  wx.showNavigationBarLoading();
  wx.request({
    url: serverUrl.MOVIE_SEARCH_RESULT + searchKey + "&start=" + start + "&count=" + count,
    header: {
      "Content-Type": "json" // 默认值
    },
    method: 'GET',
    success: function (res) {
      resultCallback(res.data.subjects);
    },
    complete: function (res) {
      wx.hideNavigationBarLoading();
    }
  })
}