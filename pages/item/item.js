// 获取应用实例
const app = getApp()
Page({
    data: {
        item: {},
        app: app
    },
    onLoad(option) {
        this.setData({
            item: JSON.parse(option.data)
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

    }
})