"use strict";

var _Sync = _interopRequireDefault(require("./Sync"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NODE = window;
var EVENT_TYPE = 'test';
var handler;
var event;
var eventParams;
beforeEach(function () {
  handler = jest.fn();
  eventParams = {
    name: 'Test event',
    date: new Date()
  };
  event = new CustomEvent(EVENT_TYPE, {
    detail: eventParams
  });
  NODE.__addEventListener = NODE.addEventListener;
  NODE.__dispatchEvent = NODE.dispatchEvent;
  NODE.__removeEventListener = NODE.removeEventListener;
  NODE.addEventListener = jest.fn();
  NODE.dispatchEvent = jest.fn();
  NODE.removeEventListener = jest.fn();
});
afterEach(function () {
  _Sync["default"].cache = {};
  NODE.addEventListener = NODE.__addEventListener;
  NODE.dispatchEvent = NODE.__dispatchEvent;
  NODE.removeEventListener = NODE.__removeEventListener;
});
test('initializes correctly', function () {
  expect(_Sync["default"]).not.toBeNull();
  expect(_Sync["default"].cache).not.toBeNull();
  expect(_Sync["default"].node).not.toBeNull();
  expect(_Sync["default"].node).toEqual(NODE);
});
test('will successfully register event listener', function () {
  _Sync["default"].addListener(EVENT_TYPE, handler);

  expect(NODE.addEventListener).toHaveBeenCalled();
  expect(NODE.addEventListener).toHaveBeenCalledWith(EVENT_TYPE, handler, undefined);
});
test('will successfully dispatch event when called with (type, params)', function () {
  _Sync["default"].dispatch(EVENT_TYPE, eventParams);

  expect(NODE.dispatchEvent).toHaveBeenCalled();
  expect(NODE.dispatchEvent).toHaveBeenCalledTimes(1);
  var params = NODE.dispatchEvent.mock.calls[0];
  expect(params).toHaveLength(1);
  expect(params[0]).toBeInstanceOf(CustomEvent);
  expect(params[0].type).toEqual(EVENT_TYPE);
  expect(params[0].detail).toEqual(expect.objectContaining(eventParams));
});
test('will successfully dispatch event when called with ({ name, params })', function () {
  _Sync["default"].dispatch({
    name: EVENT_TYPE,
    params: eventParams
  });

  expect(NODE.dispatchEvent).toHaveBeenCalled();
  expect(NODE.dispatchEvent).toHaveBeenCalledTimes(1);
  var params = NODE.dispatchEvent.mock.calls[0];
  expect(params).toHaveLength(1);
  expect(params[0]).toBeInstanceOf(CustomEvent);
  expect(params[0].type).toEqual(EVENT_TYPE);
  expect(params[0].detail).toEqual(expect.objectContaining(eventParams));
});
test('will successfully dispatch event when called with ({ name, data })', function () {
  _Sync["default"].dispatch({
    name: EVENT_TYPE,
    data: eventParams
  });

  expect(NODE.dispatchEvent).toHaveBeenCalled();
  expect(NODE.dispatchEvent).toHaveBeenCalledTimes(1);
  var params = NODE.dispatchEvent.mock.calls[0];
  expect(params).toHaveLength(1);
  expect(params[0]).toBeInstanceOf(CustomEvent);
  expect(params[0].type).toEqual(EVENT_TYPE);
  expect(params[0].detail).toEqual(expect.objectContaining(eventParams));
});
test('will successfully dispatch event when called with ({ event, params })', function () {
  _Sync["default"].dispatch({
    event: EVENT_TYPE,
    params: eventParams
  });

  expect(NODE.dispatchEvent).toHaveBeenCalled();
  expect(NODE.dispatchEvent).toHaveBeenCalledTimes(1);
  var params = NODE.dispatchEvent.mock.calls[0];
  expect(params).toHaveLength(1);
  expect(params[0]).toBeInstanceOf(CustomEvent);
  expect(params[0].type).toEqual(EVENT_TYPE);
  expect(params[0].detail).toEqual(expect.objectContaining(eventParams));
});
test('will successfully dispatch event when called with ({ event, data })', function () {
  _Sync["default"].dispatch({
    event: EVENT_TYPE,
    data: eventParams
  });

  expect(NODE.dispatchEvent).toHaveBeenCalled();
  expect(NODE.dispatchEvent).toHaveBeenCalledTimes(1);
  var params = NODE.dispatchEvent.mock.calls[0];
  expect(params).toHaveLength(1);
  expect(params[0]).toBeInstanceOf(CustomEvent);
  expect(params[0].type).toEqual(EVENT_TYPE);
  expect(params[0].detail).toEqual(expect.objectContaining(eventParams));
});
test('will successfully dispatch event when called with (event)', function () {
  _Sync["default"].dispatch(event);

  expect(NODE.dispatchEvent).toHaveBeenCalled();
  expect(NODE.dispatchEvent).toHaveBeenCalledTimes(1);
  expect(NODE.dispatchEvent).toHaveBeenCalledWith(event);
});
test('will cache event after successfully dispatching it', function () {
  _Sync["default"].dispatch(EVENT_TYPE, eventParams);

  var dispatchedEvent = NODE.dispatchEvent.mock.calls[0][0];
  expect(_Sync["default"].cache[EVENT_TYPE]).toEqual(dispatchedEvent);
});
test('will retrieve requested cached event', function () {
  _Sync["default"].cache[EVENT_TYPE] = event;
  expect(_Sync["default"].get(EVENT_TYPE)).toEqual(event);
});
test('will successfully remove event listener', function () {
  _Sync["default"].removeListener(EVENT_TYPE, handler);

  expect(NODE.removeEventListener).toHaveBeenCalled();
  expect(NODE.removeEventListener).toHaveBeenCalledTimes(1);
  expect(NODE.removeEventListener).toHaveBeenCalledWith(EVENT_TYPE, handler);
});
test('will successfully echo cached event', function () {
  _Sync["default"].cache[EVENT_TYPE] = event;

  _Sync["default"].echo(EVENT_TYPE);

  expect(NODE.dispatchEvent).toHaveBeenCalled();
  expect(NODE.dispatchEvent).toHaveBeenCalledTimes(1);
  expect(NODE.dispatchEvent).toHaveBeenCalledWith(event);
});