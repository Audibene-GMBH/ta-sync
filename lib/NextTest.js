"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.next = exports["default"] = exports.wait = void 0;

require("regenerator-runtime/runtime.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  runs test functions in a sequence in spite of jest's asynchronousity, use sparingly
  useful for singletons and external libraries or any external thing where the state can be affected by concurrent tests

  usage:

    import {next,start} from 'NextTest'

    test('first test',async () => {
        await next(() => {
            // test code goes here
        })
    } )

    test('second test',async () => {
        await next(() => {
            // test code goes here
        })
    } )

    test('last test',async () => {
        await next(() => {
            // test code goes here
        })
    } )

    start() // runs them in sequence

  */
var wait = function wait(milliseconds) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, milliseconds);
  });
};

exports.wait = wait;

var NextTest = function NextTest() {
  var _this = this;

  var _ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  _classCallCheck(this, NextTest);

  _defineProperty(this, "count", 0);

  _defineProperty(this, "index", 0);

  _defineProperty(this, "doNext", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(func) {
      var ms,
          count,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ms = _args.length > 1 && _args[1] !== undefined ? _args[1] : _this.ms;
              count = ++_this.count;

            case 2:
              if (!(_this.index < count)) {
                _context.next = 7;
                break;
              }

              _context.next = 5;
              return wait(ms);

            case 5:
              _context.next = 2;
              break;

            case 7:
              // surrender this thread
              _this.index++;
              return _context.abrupt("return", func());

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "start", function () {
    return _this.index++;
  });

  this.ms = _ms;
} // starts the queue
; // copy this code into your block if you want to avoid collisions with other sequential tests


exports["default"] = NextTest;
var me = new NextTest(); // singleton

var next = me.doNext;
exports.next = next;
var start = me.start;
exports.start = start;