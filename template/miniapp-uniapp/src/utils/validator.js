const specialCharValidator = (rule, value, callback) => {
  const regex = /^[^%#&<>\\\/\|"',;=?$\x22]+$/
  if (!value) {
    return
  }
  if (regex.test(value)) {
    callback()
  } else {
    callback(new Error('不能含有特殊字符'))
  }
}
