import Request from "@/library/luch-request/index";
import {loginByWxApi} from "@/api/auth"
// import wxRealLog from "@/utils/wx-log";

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = process.env.VUE_APP_BASE_URL
  config.header['X-App-Version'] = process.env.VUE_APP_VERSION
  // config.custom = { auth: true }
  return config
})

let isRefreshing = false
let requests = []
let modalShow = false

http.interceptors.request.use((config, cancel) => {
  const token = wx.getStorageSync('token')
  config.header['X-Token'] = token || ''
  return config
})

http.interceptors.response.use((response) => {
  if (response.data.code === 1) {
    // token不存在或失效
    const config = response.config
    if (!isRefreshing) {
      isRefreshing = true
      // important 注意return
      return loginByWeixin().then(data => {
        requests.forEach(cb => cb(data.token))
        requests = []
        isRefreshing = false
        return http.request(config)
      })
    } else {
      // 正在登录，其他请求存起来
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push((token) => {
          config.header['X-Token'] = token
          resolve(http.request(config))
        })
      })
    }
  } else {
    if (response.data.code === 0) {
      return response.data
    } else {
      modalTip()
      // wxRealLog.warn('API接口code不为0', response.data)

      return Promise.reject(response.data)
    }
  }
}, (response) => {
  // response.statusCode 此处该code不为200
  // wxRealLog.error('API接口异常', response)
  return response.data
})

const loginByWeixin = () => {
  return new Promise(resolve => {
    uni.login({provider: 'weixin'}).then(data => {
      const code = data[1].code
      loginByWxApi({code}).then(res => {
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('uid', res.data.uid)
        resolve(res.data)
      })
    })
  })
}

// 服务异常提示，只提示一次
const modalTip = (msg = '服务异常，请稍后重试') => {
  if (!modalShow) {
    modalShow = true
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success() {
        modalShow = false
      }
    })
  }
}

export default http
