// 获取应用实例
const app = getApp()
Page({
    data: {
        tabbar: {},
        openid: '1',
    },
    onLoad: function (options) {
        app.setBarColor();
        app.editTabbar();
        console.log(app.getOpenId())
        app.getOpenId().then(openid => {
            this.setData({
                openid: openid,
            })
        });

    },
})