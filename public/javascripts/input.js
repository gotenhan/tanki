(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.InputManager = (function() {

    function InputManager() {
      this.update = __bind(this.update, this);

      var _this = this;
      this._keyEvents = [];
      document.onkeydown = function(e) {
        return _this._onKeyDown(e);
      };
      document.onkeyup = function(e) {
        return _this._onKeyUp(e);
      };
      this._actions = [];
    }

    InputManager.prototype.registerAction = function(trigger, action) {
      return this._actions.push({
        trigger: trigger,
        callback: action
      });
    };

    InputManager.prototype.unregisterAction = function(trigger, action) {
      return this._actions["delete"]({
        trigger: trigger,
        callback: action
      });
    };

    InputManager.prototype.update = function() {
      var event, _i, _len, _ref;
      _ref = this._keyEvents;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this._runActionsForEvent(event);
      }
      return this._keyEvents = [];
    };

    InputManager.prototype._runActionsForEvent = function(event) {
      var action, isTriggered, _i, _len, _ref, _results;
      _ref = this._actions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        isTriggered = event.keyCode === action.trigger.key && event.type === action.trigger.type;
        if (isTriggered) {
          _results.push(action.callback(event.timeStamp));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    InputManager.prototype._onKeyDown = function(event) {
      if (this._isAutoRepeat(event)) {
        return this._keyEvents.pop();
      } else {
        return this._keyEvents.push(event);
      }
    };

    InputManager.prototype._onKeyUp = function(event) {
      return this._keyEvents.push(event);
    };

    InputManager.prototype._isAutoRepeat = function(event) {
      var lastKeyEvent;
      if (this._keyEvents.length === 0) {
        return false;
      } else {
        lastKeyEvent = this._keyEvents[this._keyEvents.length - 1];
        return lastKeyEvent.timeStamp === event.timeStamp && lastKeyEvent.keyCode === event.keyCode;
      }
    };

    InputManager.keys = {
      KEY_LEFT: 37,
      KEY_UP: 38,
      KEY_RIGHT: 39,
      KEY_DOWN: 40,
      KEY_ESC: 27
    };

    return InputManager;

  })();

}).call(this);
