'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('../package.json'),
    version = _require.version;

var $w = typeof wx !== 'undefined' && wx;

var DEFAULT_TITLE = '更新提示';
var DEFAULT_CONTENT = '新版本已经准备好，是否重启应用？';

var ERROR_MESSAGE = '非微信环境';

var assert = function assert(value, message) {
  value = typeof value === 'boolean' ? value : false;
  if (!value) {
    throw new Error(message);
  }
};
var checkValidate = function checkValidate(ctx) {
  assert(typeof ctx.manager !== 'undefined', ERROR_MESSAGE);
};

var Manager = function Manager() {
  var _this = this;

  _classCallCheck(this, Manager);

  this.version = version;
  assert(typeof $w !== 'undefined', ERROR_MESSAGE);

  this.setTitle = function (title) {
    _this.title = title || DEFAULT_TITLE;
    return _this;
  };
  this.setContent = function (content) {
    _this.content = content || DEFAULT_CONTENT;
    return _this;
  };
  this.onMessage = function (cb) {
    checkValidate(_this);
    typeof cb === 'function' && _this.manager.onCheckForUpdate(cb);
    return _this;
  };

  this.onReady = function (cb) {
    checkValidate(_this);
    if (typeof cb === 'function') {
      _this.manager.onUpdateReady(cb);
    } else {
      var title = _this.title,
          content = _this.content;

      _this.manager.onUpdateReady(function () {
        $w.showModal({
          title: title,
          content: content,
          success: function success(res) {
            if (res.confirm) {
              $w.clearStorageSync();
              _this.manager.applyUpdate();
            }
          }
        });
      });
    }
    return _this;
  };

  this.onFail = function (cb) {
    if (typeof _this.manager === 'undefined') {
      typeof cb === 'function' && cb(ERROR_MESSAGE);
    } else {
      typeof cb === 'function' && _this.manager.onUpdateFailed(cb);
    }
    return _this;
  };

  this.setTitle().setContent();
  this.manager = $w.getUpdateManager();
  checkValidate(this);
};

module.exports = new Manager();
