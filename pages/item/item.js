// 获取应用实例
const app = getApp()
Page({
    data: {
        message: {},
        app: app
    },
    onLoad(option) {
        this.setData({
            message: JSON.parse(option.data)
        })


        // var that = this
        // const eventChannel = that.getOpenerEventChannel()
        // eventChannel.on('acceptDataFrommain', function (data) {
        //     that.setData({
        //         item: JSON.parse(option.data)
        //     })
        // })


        // const eventChannel = this.getOpenerEventChannel()
        // eventChannel.emit('acceptDataFromOpenedPage', {
        //     data: 'test'
        // });
        // eventChannel.emit('someEvent', {
        //     data: 'test'
        // });
        // // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        // eventChannel.on('acceptDataFromOpenerPage', function (data) {
        //     console.log(data)
        // })
    },
    clickEdit() {
        wx.navigateTo({
            url: '../add/add?data=' + JSON.stringify(this.data.message),
            // url: '../item/item',
            success: (result) => {},
            fail: () => {},
            complete: () => {}
        });
    },
    clickDel() {

    }
})