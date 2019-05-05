const { version } = require('../package.json')
const $w = typeof wx !== 'undefined' && wx

const DEFAULT_TITLE = '更新提示'
const DEFAULT_CONTENT = '新版本已经准备好，是否重启应用？'

const ERROR_MESSAGE = '非微信环境'

const assert = (value, message) => {
  value = typeof value === 'boolean' ? value : false
  if (!value) {
    throw new Error(message)
  }
}
const checkValidate = ctx => {
  assert(typeof ctx.manager !== 'undefined', ERROR_MESSAGE)
}

class Manager {
  constructor () {
    this.version = version
    assert(typeof $w !== 'undefined', ERROR_MESSAGE)

    this.setTitle = (title) => {
      this.title = title || DEFAULT_TITLE
      return this
    }
    this.setContent = (content) => {
      this.content = content || DEFAULT_CONTENT
      return this
    }
    this.onMessage = (cb) => {
      checkValidate(this)
      typeof cb === 'function' && this.manager.onCheckForUpdate(cb)
      return this
    }

    this.onReady = (cb) => {
      checkValidate(this)
      if (typeof cb === 'function') {
        this.manager.onUpdateReady(cb)
      } else {
        const {
          title,
          content
        } = this
        this.manager.onUpdateReady(() => {
          $w.showModal({
            title,
            content,
            success: res => {
              if (res.confirm) {
                $w.clearStorageSync()
                this.manager.applyUpdate()
              }
            }
          })
        })
      }
      return this
    }

    this.onFail = (cb) => {
      if (typeof this.manager === 'undefined') {
        typeof cb === 'function' && cb(ERROR_MESSAGE)
      } else {
        typeof cb === 'function' && this.manager.onUpdateFailed(cb)
      }
      return this
    }

    this
    .setTitle()
    .setContent()
    this.manager = $w.getUpdateManager()
    checkValidate(this)
  }

}

module.exports = new Manager()
