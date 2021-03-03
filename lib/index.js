"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sync = require("./Sync");

Object.keys(_Sync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Sync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Sync[key];
    }
  });
});

var _useSync = require("./useSync");

Object.keys(_useSync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useSync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useSync[key];
    }
  });
});