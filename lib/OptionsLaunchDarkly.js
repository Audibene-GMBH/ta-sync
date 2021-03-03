"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.theOptionsLaunchDarkly = exports.OptionsLaunchDarkly = void 0;

var _Options2 = require("./Options");

var LDClient = _interopRequireWildcard(require("launchdarkly-js-client-sdk"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('dotenv').config({
  path: __dirname + '/../.env'
});

var config = {
  id: process.env.REACT_APP_LAUNCHDARKLY_CLIENT_ID,
  user: {
    firstName: 'tasty',
    lastName: 'tester',
    key: 'testing@hear.com',
    custom: {
      groups: 'testing'
    }
  },
  // eslint-disable-next-line no-console
  log: console.log // can be overloaded by the consumer below with props.log

}; // console.log(config)

var OptionsLaunchDarkly = /*#__PURE__*/function (_Options) {
  _inherits(OptionsLaunchDarkly, _Options);

  var _super = _createSuper(OptionsLaunchDarkly);

  function OptionsLaunchDarkly() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, OptionsLaunchDarkly);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleLaunchDarklyUpdates", function () {
      if (!_this.ldclient) return;
      _this.allFlags = _this.ldclient.allFlags();

      _this.log({
        allFlags: _this.allFlags
      });

      _this.update(_this.allFlags); // this may trump query strings


      _this.addQueryString(); // so we have to add them back

    });

    _this.log = props.log || config.log;
    config.user = props.user || config.user;
    var id = config.id,
        user = config.user;
    if (!user || !id) return _possibleConstructorReturn(_this);
    _this.ldclient = LDClient.initialize(id, user);

    _this.ldclient.on('initialized', _this.handleLaunchDarklyUpdates);

    _this.ldclient.on('change', _this.handleLaunchDarklyUpdates);

    return _this;
  }

  return OptionsLaunchDarkly;
}(_Options2.Options);

exports.OptionsLaunchDarkly = OptionsLaunchDarkly;
var theOptionsLaunchDarkly = new OptionsLaunchDarkly(); // singleton

exports.theOptionsLaunchDarkly = theOptionsLaunchDarkly;
var _default = theOptionsLaunchDarkly;
exports["default"] = _default;