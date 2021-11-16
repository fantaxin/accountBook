// 获取应用实例
const app = getApp()
Page({
    data: {
        message: {
            date: '',
            isIncome: false,
            money: 100,
            newdata: true,
            note: '',
            type: 1,
            _id: 0
        },
        date: '',
        time: '',
        // type: 8,
        // money: 0,
        // note: '',
        dateChange: false,
        timeChange: false,
        tabbar: {},
        showDialog: false,
    },
    onLoad: function (options) {
        //从item界面跳转到本界面所传递的参数
        this.setData({
            message: JSON.parse(options.data),
        })

        this.setData({
            date: app.splitDate(this.data.message.date)[0],
            time: app.splitDate(this.data.message.date)[1],
            // type: this.data.message.type,
            // money: this.data.message.money,
            // note: this.data.message.note,
        })
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value,
            dateChange: true
        })
    },
    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: app.addSec(e.detail.value),
            timeChange: true
        })
    },
    ChangeType(e) {
        this.toggleDialog();
        this.setData({
            type: e.currentTarget.dataset['index']
        });
    },
    toggleDialog() {
        if (this.data.showDialog) {
            wx.setNavigationBarColor({
                backgroundColor: '#ffffff',
                frontColor: '#000000'
            })
        } else {
            wx.setNavigationBarColor({
                backgroundColor: '#999999',
                frontColor: '#ffffff'
            })
        }
        this.setData({
            showDialog: !this.data.showDialog
        });
    },
    clickBtn: function () {
        wx.navigateBack({
            delta: 2,
        });
    }
})