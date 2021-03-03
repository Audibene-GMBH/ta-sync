"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Sync = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Sync - simplifies events for synchronizing state
 */
var log = function log(msg) {}; // msg => {console.log(msg)}


var Sync = /*#__PURE__*/function () {
  function Sync(node) {
    _classCallCheck(this, Sync);

    this.node = node || this.node || window;
    this.cache = {}; // old events
  } //returns the last time this event was dispatched - even prior to your "listener"


  _createClass(Sync, [{
    key: "get",
    value: function get(event) {
      return this.cache[event];
    }
  }, {
    key: "echo",
    value: function echo(event) {
      this.dispatch(this.get(event));
    }
  }, {
    key: "addListener",
    value: function addListener(event, handler, options) {
      if (!event) return;

      handler = handler || function (e) {
        return e ? e.detail : null;
      };

      this.node.addEventListener(event, handler, options);
    }
  }, {
    key: "removeListener",
    value: function removeListener(event, handler) {
      if (event) {
        this.node.removeEventListener(event, handler);
      }
    }
  }, {
    key: "dispatch",
    value: function dispatch(event, params) {
      if (!event) return;

      if (!event.type) {
        var e = event;
        var n = e.event || e.name || e;
        var p = e.params || e.data || params;

        if (_typeof(p) === 'object') {
          p = Object.assign({}, e.params, e.data, params);
        }

        event = new CustomEvent(n, {
          detail: p
        });
      } //debugger;


      log({
        Sync: 'dispatch',
        event: event
      });
      this.node.dispatchEvent(event);
      this.cache[event.type] = event;
    }
  }]);

  return Sync;
}();

exports.Sync = Sync;

var _default = new Sync();

exports["default"] = _default;