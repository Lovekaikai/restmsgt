import axios from 'axios'
import qs from 'qs'
import util from './util'
console.log(util)
export default class common {
  static req (url, param, sucessCallback, errCallback) {
    param = param || {}
    let _promise = new Promise((resolve, reject) => {
      axios({
        url: url,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
          data: param
        })
      }).then((res) => {
        if (res.data.errcode === 0) {
          if (sucessCallback && typeof sucessCallback === 'function') {
            sucessCallback(res)
          } else {
            // that.error('错了哦，这是一条错误消息')
          }
          resolve(res)
        } else {
          if (errCallback && typeof errCallback === 'function') {
            errCallback(res)
          } else {
            // that.error(res.data.errmsg)
          }
        }
      }).catch((res) => {
        reject(res)
      })
    })
    return _promise
  }
  static login () {
    axios.get('/index.php?model=index').then((res) => {
      console.log(res)
    })
  }
  static test (url) {
    return url + '&test=9135567'
  }
  static translateTimeStampToLocalDate (time) {
    let date = new Date(parseInt(time) * 1000)
    // 2017-02-02 10:42
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    return `${year}-${this.add0(month + 1)}-${this.add0(day)} ${this.add0(
      hour
    )}:${this.add0(min)}:${this.add0(sec)}`
  }
  static translateTimeStampToLocalDate2 (time) {
    let date = new Date(parseInt(time) * 1000)
    // 2017-02-02 10:42
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    // let hour = date.getHours()
    // let min = date.getMinutes()
    // let sec = date.getSeconds()
    return `${year}-${this.add0(month + 1)}-${this.add0(day)}`
  }
  static add0 (num) {
    return num < 10 ? '0' + num : num
  }
}
