// 获取应用实例
const app = getApp()
Page({
    data: {
        message: {
            _id: '_',
            date: '',
            isIncome: false,
            type: 8,
            money: 0,
            note: '',
            newdata: true,
        },
        app: app
    },
    onLoad(option) {
        app.setBarColor();
        this.setData({
            message: JSON.parse(option.data)
        })
    },
    clickEdit() {
        wx.navigateTo({
            url: '../add/add?data=' + JSON.stringify(this.data.message) + '&fromEdit=' + true,
            // url: '../item/item',
            success: (result) => {},
            fail: () => {},
            complete: () => {}
        });
    },
    clickDel() {
        var income = 0;
        var expand = 0;
        if (app.isIncome(this.data.message.type)) {
            income -= this.data.message.money;
        } else {
            expand -= this.data.message.money;
        }

        console.log('弹出模态框')
        let pages = getCurrentPages(); // 当前页，
        let prevPage = pages[pages.length - 2]; // 上一页
        var that = this;
        wx.showModal({
            content: '确认要删除该项吗？',
            confirmColor: '#FF0000',
            success: function (res) {
                if (res.confirm) {
                    /**
                     * 此处添加云数据库删除函数
                     */
                    app.Delete('',that.data.message._id)
                    prevPage.data.array.forEach((item, index) => {
                        if (item._id == that.data.message._id) {
                            prevPage.data.array.splice(index, 1);
                            prevPage.setData({
                                array: prevPage.data.array,
                                income: prevPage.data.income + income,
                                expand: prevPage.data.expand + expand,
                            })
                        }
                    })
                    wx.navigateBack({
                        delta: pages.length - 2,
                    });
                    return;
                } else {
                    return;
                }
            }
        })
    }
})