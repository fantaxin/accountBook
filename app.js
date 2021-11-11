// app.js
App({
  onLaunch: function () {

    // 隐藏系统tabbar
    wx.hideTabBar();

    // 获取设备信息
    this.getSystemInfo();


    // // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },

  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },

  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },

  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },

  globalData: {
    userInfo: null,
    tabBar: {
      "color": "#707070",
      "selectedColor": "#00ce84",
      "backgroundColor": "white",
      "list": [{
          "pagePath": "/pages/main/main",
          "iconPath": "icon/main1.png",
          "selectedIconPath": "icon/main2.png",
          "text": "明细"
        },
        {
          "pagePath": "/pages/statistics/statistics",
          "iconPath": "icon/statistics1.png",
          "selectedIconPath": "icon/statistics2.png",
          "text": "统计"
        },
        {
          "pagePath": "/pages/add/add",
          "iconPath": "icon/add1.png",
          "isSpecial": true,
          "text": ""
        },
        {
          "pagePath": "/pages/setting/setting",
          "iconPath": "icon/setting1.png",
          "selectedIconPath": "icon/setting2.png",
          "text": "设置"
        },
        {
          "pagePath": "/pages/about/about",
          "iconPath": "icon/about1.png",
          "selectedIconPath": "icon/about2.png",
          "text": "关于"
        },
      ]
    }
  },
})