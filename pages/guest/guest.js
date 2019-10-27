// pages/guest/guest.js
Page({
nameChange: function(e) {
  this.checkName(e.detail.value)
},
// 验证手机号
phoneChange: function(e) {
  this.checkPhone(e.detail.value)
},
// checkName()方法
checkName: function(data) {
  var reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
  return this.check(data, reg, '姓名输入错误！')
},
// checkPhone()方法
checkPhone: function(data) {
  var reg = /^(((13)|(15)|(17)|(18))\d{9})$/;
  return this.check(data, reg, '手机号码输入有误！')
},
// check()方法
check: function(data, reg, errMsg) {
  if (!reg.test(data)) {
    wx.showToast({
      title: errMsg,
      icon: 'none',
      duration: 1500
    })
  }
  return true
},
  formSubmit: function (e) {
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    if (this.checkName(name) && this.checkPhone(phone)) {
      // 在此处可编写代码将e.detail.value提交到服务器
      wx.login({
        success: res => {
          server.post({
            formId: e.detail.formId,
            code: res.code
          }, () => {
            // 将表单提交给服务器，传入formId和code
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500
            })
              server.sendTemplateMessage(res => {
                console.log('模板消息发送结果：', res.data)
              })
            })
        },
      })
    }
  }
})