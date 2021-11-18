// 获取应用实例
const app = getApp()
Page({
    data: {
        message: {
            _id: '',
            date: '',
            isIncome: false,
            type: 8,
            money: 0,
            note: '',
            newdata: true,
        },
        money: 0,
        oldMoney: 0,
        note: '',
        date: '',
        time: '',
        tabbar: {},
        showDialog: false,
        fromEdit: false,
    },
    onLoad: function (options) {
        //从item界面跳转到本界面所传递的参数
        try {
            this.setData({
                message: JSON.parse(options.data),
                fromEdit: options.fromEdit,
            })
            var old = 0;
            if (app.isIncome(this.data.message.type)) {
                old = this.data.message.money;
            } else {
                old = 0 - this.data.message.money;
            }
            this.setData({
                date: app.splitDate(this.data.message.date)[0],
                time: app.splitDate(this.data.message.date)[1],
                money: this.data.message.money,
                oldMoney: old,
                note: this.data.message.note,
            })
        } catch (error) {
            var d = new Date();
            this.setData({
                date: app.getNowDate(),
                time: app.getNowTime()
            })
            this.setData({
                ['message.date']: [this.data.date, this.data.time].join(' ')
            })
        }
    },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value,
        });
        this.setData({
            ['message.date']: [this.data.date, this.data.time].join(' ')
        });
    },
    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: app.addSec(e.detail.value),
        });
        this.setData({
            ['message.date']: [this.data.date, this.data.time].join(' ')
        });
    },
    ChangeType(e) {
        this.toggleDialog();
        this.setData({
            ['message.type']: e.currentTarget.dataset['index']
        });
    },
    inputMoneyCheck(e) {
        var num1 = new RegExp(/^[0]{1}[1-9]{1}$/); //0开头的多位数字
        var num2 = new RegExp(/^[1-9]+[0-9]+([.]{1}[0-9]*)?$/);
        var num3 = new RegExp(/^[0-9]{1}([.]{1}[0-9]*)?$/);
        if (num1.test(e.detail.value)) {
            return e.detail.value.substring(1);
        }
        if (!num2.test(e.detail.value) && !num3.test(e.detail.value)) {
            return e.detail.value.substring(0, e.detail.value.length - 1);
        } else {
            return e.detail.value.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1');
        }
    },
    inputMoneyBlur(e) {
        this.setData({
            ['message.money']: parseFloat(e.detail.value),
        })
    },
    inputNoteBlur(e) {
        this.setData({
            ['message.note']: e.detail.value,
        })
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
        let pages = getCurrentPages(); // 当前页，
        let prevPage = pages[pages.length - 2]; // 上一页
        this.setData({
            ['message.money']: parseFloat(this.data.money),
            ['message.note']: this.data.note,
        })

        let preprevPage = pages[pages.length - 3];
        //修正支出收入
        var oldmoney = this.data.oldMoney;
        var newmoney = 0;
        var income = 0;
        var expand = 0;
        if (app.isIncome(this.data.message.type)) {
            newmoney = this.data.message.money;
        } else {
            newmoney = 0 - this.data.message.money;
        }
        if (oldmoney > 0) {
            income -= oldmoney;
            if (newmoney > 0) {
                income += newmoney;
            } else {
                expand += newmoney;
            }
        } else {
            expand -= oldmoney;
            if (newmoney > 0) {
                income += newmoney;
            } else {
                expand += newmoney;
            }
        }

        if (this.data.fromEdit) {
            /**
             * TODO：
             * 在数据库中更新该条记录
             */
            prevPage.setData({
                message: this.data.message,
            });
            preprevPage.data.array.forEach((item, index) => {
                if (item._id == this.data.message._id) {
                    preprevPage.setData({
                        ['array[' + index + ']']: this.data.message,
                        income: preprevPage.data.income + income,
                        expand: preprevPage.data.expand - expand,
                    });
                }
            });
        } else {
            /**
             * TODO：
             * 在数据库中添加该条记录，并返回一个新的_id
             */
            app.Add(this.data.message, '');
            this.setData({
                ['message._id']: '_' + Math.random(), //临时用的id
            })
            prevPage.data.array.unshift(this.data.message);
            prevPage.setData({
                array: prevPage.data.array,
                income: prevPage.data.income + income,
                expand: prevPage.data.expand - expand,
            });
        }
        wx.navigateBack({
            delta: pages.length - 2,
        });
    }
})