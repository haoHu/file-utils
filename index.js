"use strict";

/**
 *
 * 使用canvas方法转化图片为base64编码
 * @param  {[type]}   url          [description]
 * @param  {Function} callback     [description]
 * @param  {[type]}   outputFormat [description]
 * @return {[type]}                [description]
 */
exports.convertImgToDataURLviaCanvas = function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}

/**
 *
 * 通过FileReader转换文件为dataurl
 * @param  {[type]}   url      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.convertFileToDataURLviaFileReader = function convertFileToDataURLviaFileReader(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var reader = new FileReader();
    render.onloaded = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.send();
}

/**
 * 压缩图片
 *
 * @param  {[type]} options 图片操作选项
 *         url : 图片地址
 *         outputFormat : 输出图片格式
 *         callback : 回调
 *         scale : 缩放比例
 * @return {[type]}         [description]
 */
exports.scaleImgToDataURLviaCanvas = function scaleImgToDataURLviaCanvas(options) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    options = Object.assign({
      url: '',
      outputFormat: 'image/png',
      callback: function() {},
      scale: 1
    }, options);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var dataURL;
    var scale = options.scale;
    var width = img.width * scale;
    var height = img.height * scale;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    dataURL = canvas.toDataURL(options.outputFormat);
    typeof options.callback == 'function' && options.callback(dataURL);
    canvas = null;
  };
  img.src = options.url;
}
