function toast(title, icon = 'none', duration, options = {}) {
  return new Promise((resolve, reject) => {
    const params = {
      title: title || '',
      icon: icon,
      image: options.image || '',
      duration: duration || 1500,
      mask: options.mask === true ? true : false,
      success: options.success,
      fail: options.fail
    }
    params.complete = function () {
      setTimeout(function () {
        resolve();
      }, params.duration - 500)
    }
    uni.showToast(params)
  })
}

toast.$success = function (title, options = {}) {
  return toast(title, 'success', options.duration, options)
}

toast.$error = function (title, options = {}) {
  return toast(title, 'error', options.duration, options)
}

function modal(title, content, options = {}) {
  return new Promise((resolve, reject) => {
    const params = {
      title: title || '',
      content: content || '',
      showCancel: options.showCancel === false ? false : true,
      confirmText: options.confirmText || '确定',
      success: options.success,
      fail: options.fail
    }
    if (params.showCancel) {
      params.cancelText = options.cancelText || '取消'
    }
    params.success = res => {
      if (res.confirm) {
        resolve()
      } else if (res.cancel) {
        reject()
      }
    }
    uni.showModal(params)
  })
}

modal.$confirm = function (title, content, options = {}) {
  options.showCancel = false
  return modal(title, content, options)
}

function loading(title) {
  uni.showLoading({
    title: title || '加载中',
    mask: true
  })
}

function loadingOff() {
  uni.hideLoading()
}

function navigate(url) {
  uni.navigateTo({
    url: url
  })
}

function safeNavigate(url) {
  const pages = getCurrentPages()
  if (pages.length > 8) {
    toast('因小程序层级限制，请在网页端完成操作')
    return
  }
  uni.navigateTo({
    url: url
  })
}

function goBack(delta) {
  uni.navigateBack({
    delta: delta || 1
  })
}

export default {
  toast,
  modal,
  loading,
  loadingOff,
  navigate,
  safeNavigate,
  goBack
}
