// app.js
wx.cloud.init({
  env: "fantasy-8gy3bgkr80ffde7e"
})
App({
  onLaunch: function () {

    // 隐藏系统tabbar
    wx.hideTabBar();

    this.setBarColor();
    // 获取设备信息
    this.getSystemInfo();

    //获取用户openid
    //查询user表，如果没有该用户，在user表中添加该用户，并添加一张以该用户openid命名的表


    //
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


  Add: function (message, openId) {
    // message._id = '';
    //初始化
    var id = {};
    wx.cloud.init()
    //调用云函数
    wx.cloud.callFunction({
      name: 'Add',
      data: message,
      success: function (res) {
        id = res.result;
        //return _id
      }
    })
    return id;
  },

  setBarColor: function () {
    wx.setNavigationBarColor({
      backgroundColor: '#00CE84',
      frontColor: '#ffffff'
    });
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

  /**
   *保留n位小数
   * @param {number} value 数字
   * @param {number} n 保留的小数位数
   * @returns {string} 小数点后有n位数字的字符串
   */
  numFixed: function (value, n) {
    return value.toFixed(n);
  },

  /**
   * 
   * @param {number} value 
   * @returns 
   */
  format: function (value) {
    return ('00' + value).slice(-2);
  },

  /**
   * 将数字型的type转换成string
   * @param {number} type
   * @returns {string}
   * type的值分别对应餐饮、购物、日用、交通、零食、娱乐、衣服、其它
          工资、理财、借款、其它
   */
  getType: function (type) {
    if (type == null) {
      return '其它';
    }
    switch (type) {
      case 1:
        return '餐饮';
      case 2:
        return '购物';
      case 3:
        return '日用';
      case 4:
        return '交通';
      case 5:
        return '零食';
      case 6:
        return '娱乐';
      case 7:
        return '衣服';
      case 8:
        return '其它支出';
      case 9:
        return '工资';
      case 10:
        return '理财';
      case 11:
        return '借款';
      default:
        return '其它收入';
    }
  },

  /**
   * 判断是否为收入项目
   * @param {number} type 
   * @returns {boolean}
   */
  isIncome: function (type) {
    if (type > 8)
      return true;
    else
      return false;
  },

  /**
   * 将字符串'2021-01-01 12:01'分割为['2021-01-01','12:01']
   * @param {string} date 
   * @returns {[]}
   */
  splitDate: function (date) {
    if (date == null)
      return ['--', '--'];
    else
      return date.split(" ");
  },

  /**
   * 根据type返回相应的图片地址
   * @param {number} type 
   * @returns {string} 图片src
   */
  getImageSrc: function (type) {
    // var img = new Image();
    // img.src = '../images/'+type+'.png';
    // return img;
    if (type == null)
      return '../../images/' + 12 + '.png';
    else
      return '../../images/' + type + '.png';
  },

  /**
   * 获取当前日期并以'yy-mm-dd'格式返回
   * @returns {string}
   */
  getNowDate: function () {
    var d = new Date();
    return [d.getFullYear(), this.format(d.getMonth() + 1), this.format(d.getDate())].join('-')
  },

  /**
   * 获取当前时间并以'hh:mm:ss'格式返回
   * @returns {string}
   */
  getNowTime: function () {
    var d = new Date();
    return [this.format(d.getHours()), this.format(d.getMinutes()), this.format(d.getSeconds())].join(':')
  },

  /**
   * 在给定的时间后加上当前的秒
   * @param {string} time 'hh:mm'
   * @returns {string} 'hh:mm:ss'
   */
  addSec: function (time) {
    var d = new Date();
    return time + ':' + this.format(d.getSeconds());
  },

  /**
   * 将日期和时间合并为一个字符串
   * @param {string} date 'yy-mm-dd'
   * @param {string}time 'hh:mm:ss'
   * @returns {string} 'yy-mm-dd hh:mm:ss'
   */
  toDate: function (date, time) {
    return date + ' ' + time;
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

  getwindowWidth: function () {
    return wx.getSystemInfoSync().windowWidth;
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
          "isStatistics": true,
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
          "text": "便利贴"
        },
      ]
    },
  },
})