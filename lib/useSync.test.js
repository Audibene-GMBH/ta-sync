"use strict";

require("react");

require("react-dom");

require("react-test-renderer");

var _reactHooks = require("@testing-library/react-hooks");

var _useSync = _interopRequireDefault(require("./useSync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

describe("useSync", function () {
  test("initializes correctly", function () {
    var _renderHook = (0, _reactHooks.renderHook)(function () {
      return (0, _useSync["default"])();
    }),
        current = _renderHook.result.current;

    var _current = _slicedToArray(current, 2),
        data = _current[0],
        setData = _current[1];

    expect(data).toEqual(undefined);
    expect(setData).not.toBeNull();
  });
  test("updates data correctly", function () {
    var _renderHook2 = (0, _reactHooks.renderHook)(function () {
      return (0, _useSync["default"])();
    }),
        result = _renderHook2.result;

    (0, _reactHooks.act)(function () {
      return result.current[1]("test");
    });
    expect(result.current[0]).toEqual("test");
  });
  test("will sync values between two instances", function () {
    var _renderHook3 = (0, _reactHooks.renderHook)(function () {
      return (0, _useSync["default"])();
    }),
        a = _renderHook3.result;

    var _renderHook4 = (0, _reactHooks.renderHook)(function () {
      return (0, _useSync["default"])();
    }),
        b = _renderHook4.result;

    (0, _reactHooks.act)(function () {
      return a.current[1]("test a");
    });
    expect(a.current[0]).toEqual("test a");
    expect(b.current[0]).toEqual("test a");
    (0, _reactHooks.act)(function () {
      return b.current[1]("test b");
    });
    expect(a.current[0]).toEqual("test b");
    expect(b.current[0]).toEqual("test b");
  });
});