Page({
    data: {
        roomId: '', // 房间号，用于标识当前通话的唯一房间
        userSig: '', // 用户签名，用于腾讯云 TRTC 通话鉴权
        doctorName: '', // 医生姓名，显示在通话界面
        callStartTime: null, // 通话开始时间，用于计算通话时长
        duration: 0, // 通话时长，单位为秒
        cost: 0, // 通话费用
        rate: 2, // 每分钟收费标准
    },

    onLoad(options) {
        console.log('[通话页面] 页面加载，接收到参数:', options);
        // 从页面参数中获取房间号、用户签名和医生姓名
        const { roomId, userSig, doctorName } = options;
        this.setData({ roomId, userSig, doctorName });

        try {
            console.log('[通话页面] 开始初始化通话...');
            this.startCall(); // 开始通话
        } catch (error) {
            console.error('[通话页面] 通话初始化失败:', error);
        }
    },

    startCall() {
        console.log('[通话页面] 正在启动通话功能...');
        const { roomId, userSig } = this.data;

        // 引入腾讯云 TRTC 插件，初始化音视频通话
        const trtc = requirePlugin('trtc');
        trtc.init({
            sdkAppId: YOUR_SDK_APP_ID, // 腾讯云应用 SDKAppID
            roomId: roomId, // 通话房间号
            userId: wx.getStorageSync('userId'), // 当前用户 ID
            userSig: userSig, // 腾讯云用户签名
        });

        // 启动本地视频和音频
        trtc.startLocalVideo();
        trtc.startLocalAudio();
        console.log('[通话页面] 视频和音频已启动');

        // 记录通话开始时间
        this.setData({ callStartTime: Date.now() });
        console.log('[通话页面] 通话开始时间已记录');

        // 开始时长和费用计时器
        this.startDurationTimer();
    },

    startDurationTimer() {
        console.log('[通话页面] 开启时长和费用计时器');
        // 每秒更新通话时长和费用
        this.durationTimer = setInterval(() => {
            const duration = Math.floor((Date.now() - this.data.callStartTime) / 1000); // 计算通话时长
            const cost = ((duration / 60) * this.data.rate).toFixed(2); // 按分钟计算费用
            console.log(`[通话页面] 通话时长: ${duration} 秒, 当前费用: ¥${cost}`);
            this.setData({ duration, cost });
        }, 1000);
    },

    endCall() {
        console.log('[通话页面] 用户挂断通话，正在结束...');
        // 退出腾讯云 TRTC 通话房间
        const trtc = requirePlugin('trtc');
        trtc.exitRoom();
        clearInterval(this.durationTimer); // 清除计时器
        console.log('[通话页面] 通话已结束，计时器已清除');

        // 跳转到挂断确认页面，传递通话时长和费用
        wx.navigateTo({
            url: `/pages/call/confirmEnd?duration=${this.data.duration}&cost=${this.data.cost}`,
        });
    },

    onUnload() {
        console.log('[通话页面] 页面卸载，确保通话结束...');
        this.endCall(); // 确保页面卸载时结束通话
    },
});
