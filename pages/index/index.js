// pages/index/index.js
var serverUrl = require('../../utils/server.js');
var constant = require('../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recentMovie: [],
    newMovie: [],
    topMovie: []
  },

  clickTest: function (e) {
    wx.showToast({
      title: '点击测试'
    });


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
    // var that = this;
    requestAllDataFromLocal(this);
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
    console.log("下拉刷新");
    requestAllDataFromNet(this);
    //wx.stopPullDownRefresh;
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


/**
 * 请求首页所有数据 从本地
 */
function requestAllDataFromLocal(page) {
  requestDataFromLocal(this, constant.MOVIE_RECENT, serverUrl.MOVIE_RECENT_URL + "?count=10", function (data) {
    //console.log("近期上映: " + data.title);
    page.setData({
      recentMovie: data
    });
  });

  requestDataFromLocal(this, constant.MOVIE_NEW, serverUrl.MOVIE_NEW_URL + "?count=10", function (data) {
    //console.log("热门电影: " + data.title);
    page.setData({
      newMovie: data
    });
  });

  requestDataFromLocal(this, constant.MOVIE_TOP250, serverUrl.MOVIE_TOP250_URL + "?count=10", function (data) {
    //console.log("TOP250: " + data.title);
    page.setData({
      topMovie: data
    });
  });
}

/**
 * 请求首页所有数据 从网络 下拉刷新时用
 */
function requestAllDataFromNet(page) {
  requestDataFromNet(this, constant.MOVIE_RECENT, serverUrl.MOVIE_RECENT_URL + "?count=10", function (data) {
    //console.log("近期上映: " + data[0].title);
    page.setData({
      recentMovie: data
    });
  });

  requestDataFromNet(this, constant.MOVIE_NEW, serverUrl.MOVIE_NEW_URL + "?count=10", function (data) {
    //console.log("热门电影: " + data[0].title);
    page.setData({
      newMovie: data
    });
  });

  requestDataFromNet(this, constant.MOVIE_NEW, serverUrl.MOVIE_TOP250_URL + "?count=10", function (data) {
    //console.log("TOP250: " + data[0].title);
    page.setData({
      topMovie: data
    });
  });
}



var requestCount = 0;//防止多次请求失败循环请求
/**
 * 从网络获取数据
 */
function requestDataFromNet(page, localKey, serverUrl, dataCallback) {
  requestCount++;
  if (requestCount > 3) {
    //网络请求次数超过三次就重置.
    return;
  }
  wx.request({
    url: serverUrl,
    method: 'GET',
    header: {
      "Content-Type": "json" // 默认值
    },
    success: function (res) {
      console.log("从网络获取的数据: " + res.data.title);
      wx.setStorageSync(localKey, res.data);
      requestDataFromLocal(page, localKey, serverUrl, dataCallback);
    },
    complete: function (res) {
      console.log("刷新完成");
      wx.stopPullDownRefresh();
    }
  })
}

/**
 * 从缓存获取
 */
function requestDataFromLocal(page, localKey, serverUrl, dataCallback) {
  requestCount = 0;
  wx.getStorage({
    key: localKey,
    success: function (res) {

      if (res.data) {
        //如果有,先使用缓存数据
        console.log("本地数据: " + res.data.subjects[0].title);
        for (var i = 0; i < res.data.subjects.length; i++) {
          //设置星星位置
          var average = res.data.subjects[i].rating.average;
          var roundAverage = Math.round(average);
          // console.log("average : " + average);
          // console.log("roundAverage : " + roundAverage);
          // console.log("(10-roundAverage) * (-11) : " + (10 - roundAverage) * (-11));
          //加个值, 将算好的starPosition放到数据源中 就是显示星星的位置
          res.data.subjects[i].starPosition = (10 - roundAverage) * (-11);
        }

        console.log((10 - Math.round(res.data.subjects[0].rating.average)) * (-11));
        dataCallback(res.data.subjects);
        // page.setData({
        //   recentMovie: res.data.subjects
        // });

      } else {
        requestDataFromNet(page, localKey, serverUrl, dataCallback);
      }
    },
    fail: function (res) {
      requestDataFromNet(page, localKey, serverUrl, dataCallback);
    }
  })
}