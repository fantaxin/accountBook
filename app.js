
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
    this.getOpenId().then(res => {
      console.log(res)
      this.globalData.openid = res;
      this.newUser(this.globalData.openid);
    })
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
        console.log(res);
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
   * 将字符串'2021-01-01T12:01:00.000Z'分割为['2021-01-01','12:01']
   * @param {string} date 
   * @returns {[]}
   */
  splitDate2: function (date) {
    if (date == null)
      return ['--', '--'];
    else {
      var temp = date.split("T");
      var date1 = temp[0];
      var time = temp[1].split(".")[0]
      return [date1, time];
    }
  },

  /**
   * 将数组中的时间转换为标准时间显示
   * @param {[]} array 
   */
  myArray: function (array) {
    var temp = [];
    array.forEach((item) => {
      temp = this.splitDate2(item.date)
      item.date = this.toDate(temp[0], temp[1]);
    })
    return array;
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
   * 删除给定时间的秒
   * @param {string} time 'hh:mm:ss'
   * @returns {string} 'hh:mm'
   */
  delSec: function (time) {
    var temp = time.split(":");
    return [temp[0] + ':' + temp[1], temp[2]];
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
  sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
  },

  /**
   * 获取用户的openid
   * @returns 
   */
  async getOpenId() {
    const res = await wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getOpenId',
    })
    return res.result.openid
  },
  // getOpenId: function () {
  //   wx.cloud.callFunction({
  //     name:'getOpenId',
  //   }).then(res=>{
  //   return res.result.openid;
  //   })
  // },
  /**
   * 如果user表中没有该openid，则将其添加进去，并创建一个新的集合（表）
   * @param {string} openid 
   */
  async newUser(openid) {
    try {
      const db = wx.cloud.database()
      //添加openid
      let openId = openid
      db.collection('user').add({
        data: {
          openid: openId
        }
      }).then(ress => {
        //创建新集合  
        wx.cloud.callFunction({
          name: 'CreateTable',
          data: {
            openid: openId
          }
        })
      })
    } catch (error) {
      console.error('创建失败！', error)
    }
  },

  async Add(openid, message) {
    //初始化
    wx.cloud.init()
    //调用云函数
    const res = await wx.cloud.callFunction({
      name: 'Add',
      data: {
        message: message,
        openid: openid,
      },
    })
    return res.result._id
  },
  /**
   * 删除openid下id=id的数据
   * @param {string} id 
   * @param {string} openid 
   */
  async Delete(openid, id) {
    const res = await wx.cloud.callFunction({
      name: 'delete',
      data: {
        openid: openid,
        _id: id
      }
    })
    var t = res.result.stats.removed
    return t == 1 ? true : false
  },

  /**
   * 修改openid下数据id为message.id的数据
   * @param {string} openid 
   * @param {stirng} id 
   * @param {[]} message 
   */
  async Change(openid, message) {
    const res = await wx.cloud.callFunction({
      name: 'update',
      data: {
        openid: openid,
        message: message
      }
    })
    console.log(res);
  },

  /**
   * 获取本月支出总额
   * @returns 
   */
  async SearchExpand(openid) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var start_date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + 1 + ' ' + "00:00:00"
    var dd = new Date(year, month, 0)
    var end_date = d.getFullYear() + '-' + (d.getMonth() + 1) +
      '-' + dd.getDate() + ' ' + "23:59:59"

    const res = await wx.cloud.callFunction({
      name: 'SearchByMonth',
      data: {
        openid: openid,
        start_date: start_date,
        end_date: end_date,
      }
    })
    var Expand = res.result.list[0].Expand
    return Expand
  },

  /**
   * 获取本月收入总额
   * @returns 
   */
  async SearchIncome(openid) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var start_date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + 1 + ' ' + "00:00:00"
    var dd = new Date(year, month, 0)
    var end_date = d.getFullYear() + '-' + (d.getMonth() + 1) +
      '-' + dd.getDate() + ' ' + "23:59:59"

    const res = await wx.cloud.callFunction({
      name: 'Income',
      data: {
        openid: openid,
        start_date: start_date,
        end_date: end_date,
      }
    })
    var Income = res.result.list[0].Income
    return Income
  },

  /**
   * 获取本月的所有收入 + 支出数据，并按时间排序
   * @returns 
   */
  async showMonthData(openid) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var start_date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + 1 + ' ' + "00:00:00"
    var dd = new Date(year, month, 0)
    var end_date = d.getFullYear() + '-' + (d.getMonth() + 1) +
      '-' + dd.getDate() + ' ' + "23:59:59"

    const res = await wx.cloud.callFunction({
      name: 'showMonthData',
      data: {
        openid: openid,
        start_date: start_date,
        end_date: end_date,
      }
    })
    var data = [];
    data = res.result.data
    return data;
  },

  /**
   * 获取当月每天的支出总额，没有消费记录的记为0
   * @returns {[]}
   */
  async getcolumnData(openid) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var dd = new Date(year, month, 0)
    var daynum = dd.getDate() //当月的天数
    var start_date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + 1 + ' ' + "00:00:00"
    var end_date = d.getFullYear() + '-' + (d.getMonth() + 1) +
      '-' + dd.getDate() + ' ' + "23:59:59"

    var res = await wx.cloud.callFunction({
      name: 'SearchByDay',
      data: {
        openid: openid,
        start_date: start_date,
        end_date: end_date,
      }
    })

    var data = [daynum];
    for (var i = 0; i < daynum; i++) {
      data[i] = 0
    }
    for (var k = 0; k < res.result.list.length; k++) {
      data[res.result.list[k]._id - 1] = res.result.list[k].money
    }
    return data;
  },

  /**
   * 获取当月各个消费类别的消费总额
   *[{ value: '餐饮',ratio: 50},{},{}]
   */
  async getringData(openid) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var dd = new Date(year, month, 0)
    var start_date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + 1 + ' ' + "00:00:00"
    var end_date = d.getFullYear() + '-' + (d.getMonth() + 1) +
      '-' + dd.getDate() + ' ' + "23:59:59"

    const res = await wx.cloud.callFunction({
      name: 'SearchByType',
      data: {
        openid: openid,
        start_date: start_date,
        end_date: end_date,
      }
    })
    var length = res.result.list.length
    var data = []
    var Count = 0

    for (var t = 0; t < length; t++) {
      Count += res.result.list[t].count
    }

    for (var i = 0; i < length; i++) {
      var obj = {
        value: '',
        ratio: 0,
      }
      obj.value = this.getType(res.result.list[i]._id)
      obj.ratio = (res.result.list[i].count / Count) * 100
      data.push(obj)
    }
    return data;
  },

  globalData: {
    userInfo: null,
    openid: '0',
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
          "text": "关于"
        },
      ]
    },
  },
})