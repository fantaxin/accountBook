// 获取应用实例
const app = getApp()
Page({
    data: {
        tabbar: {},
    },
    onLoad: function (options) {
        app.editTabbar();
    },
})