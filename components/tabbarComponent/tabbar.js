// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
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
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickItem() {
      console.log("点击成功");
      wx.switchTab({
        url: '/pages/statistics/statistics',
        success() {
          let page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onReady();
          console.log("跳转成功")
        }
      });
    }

  },

})