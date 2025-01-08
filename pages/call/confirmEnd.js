Page({
  data: {
    duration: 0, // 通话时长
    cost: 0, // 通话费用
  },

  onLoad(options) {
    console.log('[挂断确认页面] 页面加载，接收到参数:', options);
    // 从页面参数中获取通话时长和费用
    const { duration, cost } = options;
    this.setData({ duration, cost });
    console.log('[挂断确认页面] 通话信息已初始化:', { duration, cost });
  },

  confirm() {
    console.log('[挂断确认页面] 用户确认通话结束，正在提交数据...');
    // 提交订单状态更新请求
    wx.request({
      url: `${YOUR_BACKEND_URL}/updateOrderStatus`, // 后端订单更新接口
      method: 'POST',
      data: {
        orderId: wx.getStorageSync('orderId'), // 当前订单 ID
        status: '待确认', // 更新订单状态为待确认
      },
      success: (res) => {
        console.log('[挂断确认页面] 通话状态更新成功，后端返回:', res);
        wx.showToast({ title: '已确认', icon: 'success' });
        wx.navigateBack(); // 返回上一页
      },
      fail: (error) => {
        console.error('[挂断确认页面] 通话状态更新失败:', error);
      },
    });
  },
});
