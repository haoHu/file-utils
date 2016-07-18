"use strict";
var fs = require('fs');
var path = require('path');

exports.mkdirSync = function (url, mode, callback) {
  var paths = url.split("/");
  if (typeof mode === "function") {
    callback = mode;
    mode = '0755';
  }
  mode = mode || '0755';
  if (paths[0] === ".") {
    paths.shift();
  }
  if (paths[0] === "..") {
    paths.splice(0, 2, paths[0] + "/" + paths[1]);
  }
  function mkdir(cur) {
    console.log(cur);
    if (!fs.existsSync(cur)) {
      fs.mkdirSync(cur, mode);
    }
    if (paths.length) {
      mkdir(cur + "/" + paths.shift());
    } else {
      callback();
    }
  }
  paths.length && mkdir(paths.shift());
};

exports.rmdirSync = (function () {
  function iterator(url, dirs) {
    var stat = fs.statSync(url);
    if (stat.isDirectory()) {
      dirs.unshift(url);
      rmdir(url, dirs);
    } else if (stat.isFile()) {
      fs.unlinkSync(url);
    }
  }
  function rmdir(path, dirs) {
    var arr = fs.readdirSync(path);
    for (var i = 0, el ; el = arr[i++];) {
      iterator(path + "/" + el, dirs);
    }
  }
  return function (dir, callback) {
    var dirs = [];
    try {
      iterator(dir, dirs);
      for (var i = 0, el ; el = dirs[i++];) {
        fs.rmdirSync(el);
      }
      callback();
    } catch (err) {
      err.code ==- "ENOENT" ? callback() : cb(err);
    }
  };
})();

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
