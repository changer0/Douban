// pages/moreList/moreList.js
var serverUrl = require('../../utils/server.js');
var curUrl = '';
const SEARCH_COUNT = 15;
var lastStart = 0;
var total = -1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList: [],
    isHideLoadMore: true,
    isNeedLoadingMore: false,
    loadingText: "上拉加载更多",
    isHiddenLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    lastStart = 0;
    curUrl = serverUrl.ROOT_URL + options.url;
    //curUrl = serverUrl.MOVIE_RECENT_URL;//先用这个代替, 回头改回来.
    console.log(curUrl);
    // wx.setNavigationBarTitle({
    //   title: options.title,
    // })
    var that = this;

    //请求数据
    requestListData(this, 0, SEARCH_COUNT, function (result) {
      total = result.total;
      console.log("total: " + total);
      parseData(that, result);
    });

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
    var that = this;
    console.log("上拉加载..");
    if (total == -1 || !total) {
      console.log("total: " + total);
      this.setData({
        isHideLoadMore: false,
        isNeedLoadingMore: false,
        loadingText: "已显示全部"
      });
      return;
    }
    lastStart += SEARCH_COUNT;
    if (total < lastStart) {//加载完成搜索数据
      this.setData({
        isHideLoadMore: false,
        isNeedLoadingMore: false,
        loadingText: "已显示全部"
      });
    } else {//加载下一页
      this.setData({
        isHideLoadMore: false,
        isNeedLoadingMore: true,
        loadingText: "正在加载"
      });
      //请求数据
      requestListData(this, lastStart, SEARCH_COUNT, function (result) {
        var oldResultSubjects = [];
        var index = 0;
        for (var i = 0; i < that.data.resultList.length; i++) {
          for (var j = 0; j < that.data.resultList[i].length; j++) {
            oldResultSubjects[index] = that.data.resultList[i][j]; 
            index++;
          }
        }
        
        var oldSize = oldResultSubjects.length;
        for (var i = 0; i < result.subjects.length; i++) {
          oldResultSubjects[i + oldSize] = result.subjects[i];
        }

        result.subjects = oldResultSubjects;

        parseData(that, result);


      });
    }
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
 * 数据请求
 */
function requestListData(page, start, count, resultCallback) {
  wx.showNavigationBarLoading();
  wx.request({
    url: curUrl + "?start=" + start + "&count=" + count,
    method: 'GET',
    header: {
      "Content-Type": "json" // 默认值
    },
    success: function (res) {
      resultCallback(res.data);
    },
    complete: function (res) {
      console.log("请求完成");
      wx.hideNavigationBarLoading();
    }
  })
}
/**
 * 解析数据
 */
function parseData(page, data) {
  //星星位置
  var size = data.subjects.length;
  console.log("size : " + size);
  for (var i = 0; i < size; i++) {
    var average = data.subjects[i].rating.average;
    var roundAverage = Math.round(average);
    data.subjects[i].starPosition = (10 - roundAverage) * (-11);
  }


  var resultList = new Array();

  for (var i = 0; i < size; i += 3) {
    var resultItem = new Array();
    resultItem[0] = data.subjects[i];
    if (i + 1 < size) {
      resultItem[1] = data.subjects[i + 1];
    }
    if (i + 2 < size) {
      resultItem[2] = data.subjects[i + 2];
    }
    resultList[i / 3] = resultItem;
    // console.log("i / 3: " + i / 3);
    // console.log("resultItem: " + resultItem[0].title);
    // console.log("resultList[0][0]: " + resultList[0][0].title);
  }
  page.setData({
    resultList: resultList,
    isHideLoadMore: false,
    isNeedLoadingMore: false,
    loadingText: "已显示全部"
  });
  // console.log("数组结果: " + resultList[0][0].title);
  // console.log("数组结果: ");
  // for(var i = 0; i < resultList.length; i++) {
  //   for (var j = 0; j < resultList[i].length; j++) {
  //     console.log(resultList[i][j].title);
  //   }
  // }
}