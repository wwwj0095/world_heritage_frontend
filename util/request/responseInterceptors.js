/**
 * 响应拦截
 * @param {Object} http
 */
import Store from "@/store"
module.exports = (vm) => {
    uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
        const data = response.data
        return response.data || {}
    }, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
        switch (response.statusCode) {
            case 404:
                // 跳转到404页面
                break;
            case 401:
                // 过期或者未登录
                Store.dispatch('notLogin')
                uni.showToast({
                    title: '現在未ログイン',
                    icon: 'none',
                    duration: 1000
                });
                break;
            case 422:
                // 数据验证错误
                let error_obj = response.data.errors; //定义对象（data为获取到的对象，在这里定义）
                let result = Object.values(error_obj); //对象转化为数组
                uni.showToast({
                    title: result[0][0],
                    icon: 'none',
                    duration: 1000
                });
                break;
            case 500:
                // 日文消息提示
                uni.showToast({
                    icon: 'none',
                    title: 'ヒント',
                    content: 'サーバーエラーが発生しました。',
                    showCancel: false,
                });
                uni.hideLoading();
                break;
            default:
                break;
        }
        return Promise.reject(response)
    })
}
