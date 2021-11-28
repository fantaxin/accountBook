// main.js
// 获取应用实例
const app = getApp()
// const db = wx.cloud.database()
Page({
    data: {
        tabbar: {},
        expand: 0,
        income: 0,
        budget: 0,
        itemtime: '0',
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
        array: [],
        result: [],
    },
    // 事件处理函数
    clickTotal() {
        wx.switchTab({
            url: '../statistics/statistics'
        })
    },
    clickitem(e) {
        wx.navigateTo({
            url: '../item/item?data=' + JSON.stringify(e.currentTarget.dataset['index']),
            // url: '../item/item',
            success: (result) => {},
            fail: () => {},
            complete: () => {}
        });
    },
    onLoad() {
        app.editTabbar();
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
        app.getOpenId().then(openid => {
            app.SearchExpand(openid).then(res => {
                this.setData({
                    expand: res
                })
            })
            app.SearchIncome(openid).then(res => {
                this.setData({
                    income: res
                })
            })
            app.showMonthData(openid).then(res => {
                this.setData({
                    array: app.myArray(res)
                })
            })
        })
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        console.log(e)
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    //生命周期函数--监听页面初次渲染完成
    onReady: function () {},
    //生命周期函数--监听页面显示
    onShow: function () {},
    //生命周期函数--监听页面隐藏
    onHide: function () {},
    //生命周期函数--监听页面卸载
    onUnload: function () {},
    //页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh: function () {},
    //页面上拉触底事件的处理函数
    onReachBottom: function () {},
    //用户点击右上角分享
    onShareAppMessage: function () {}
})