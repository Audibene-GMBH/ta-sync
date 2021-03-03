"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSync = useSync;
exports["default"] = void 0;

var _react = require("react");

var _Sync = _interopRequireDefault(require("./Sync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// sync - synchronizes state variables in different components
// kinda like shared memory, this hook enables two different state variables in different components to share the same value
function useSync(name, initial, handler, options) {
  var eventName = name || "useSync";

  if (initial === undefined) {
    // get the current value prior to my instance
    var event = _Sync["default"].get(eventName) || {};
    initial = event.detail;
  } else {
    // update the subscribers with my new instance and so, use the initial value sparingly else you may over write your siblings unintentionally
    _Sync["default"].dispatch(eventName, initial);
  }

  var _useState = (0, _react.useState)(initial),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  function myHandler(e) {
    var eventData = e.detail;
    setData(eventData);
    handler && handler(eventData);
  }

  (0, _react.useEffect)(function () {
    data && _Sync["default"].dispatch(eventName, data);

    _Sync["default"].addListener(eventName, myHandler, options);

    return function () {
      _Sync["default"].removeListener(eventName, myHandler);
    };
  }, []); //eslint-disable-line

  function set(detail) {
    setData(detail);

    _Sync["default"].dispatch(eventName, detail);
  }

  return [data, set];
}

var _default = useSync;
exports["default"] = _default;