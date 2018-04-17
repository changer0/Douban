// pages/search/search.js
var serverUrl = require('../../utils/server.js');

var curSearchKey = '';
var lastStart = 0;
var total = -1;
const SEARCH_COUNT = 15;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultSubjects: [],
    isHideLoadMore: true,
    isNeedLoading: true,
    loadingText: "正在加载"
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
    var that = this;
    lastStart += SEARCH_COUNT;
    if (total == -1) {
      return;
    }
    console.log("total: " + total);
    console.log("lastStart: " + lastStart);
    if (total < lastStart) {//加载完成搜索数据
      this.setData({
        isHideLoadMore: false,
        isNeedLoading: false,
        loadingText: "已显示全部"
      });
    } else {//加载下一页
      this.setData({
        isHideLoadMore: false,
        isNeedLoading: true,
        loadingText: "正在加载"
      });
      requestSearchResuleFromNet(curSearchKey, lastStart, SEARCH_COUNT, function (result) {
        
        var oldResultSubjects = that.data.resultSubjects;
        console.log("oldResultSubjects.length: " + oldResultSubjects.length);
        var oldSize = oldResultSubjects.length;
        for (var i = 0; i < result.subjects.length; i++ ) {
          oldResultSubjects[i + oldSize] = result.subjects[i];
        }
        var newResultSubjects = oldResultSubjects;
        that.setData({
          isHideLoadMore: true,
          resultSubjects: newResultSubjects
        });
        
        console.log("newResult.length: " + newResultSubjects.length);
      });
    }
    console.log("加载更多....");
  },

  searchInput: function (e) {
    var that = this;
    lastStart = 0;
    total = -1;
    //console.log(e.detail.value);
    curSearchKey = e.detail.value;
    if (curSearchKey !== '') {
      requestSearchResuleFromNet( curSearchKey, 0, SEARCH_COUNT, function (result) {
        //console.log(result.subjects[0].title);
        console.log(e.detail.value);
        if (curSearchKey === '') {
          that.setData({
            resultSubjects: [],
            isHideLoadMore: true
          });
        } else {
          total = result.total;
          that.setData({
            resultSubjects: result.subjects,
            isHideLoadMore: true,
            isNeedLoading: true,
            loadingText: "正在加载"
          });
        }

      });
    } else {
      that.setData({
        resultSubjects: [],
        isHideLoadMore: true
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
      resultCallback(res.data);
    },
    complete: function (res) {
      wx.hideNavigationBarLoading();
    }
  })
}