(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Tanki = (function() {

    function Tanki() {
      this.init = __bind(this.init, this);

    }

    Tanki.prototype.init = function() {
      var canvas;
      canvas = document.getElementById('canvas');
      this._renderer = new Renderer(canvas);
      this._input = new InputManager(canvas);
      return this._prepareScene();
    };

    Tanki.prototype.start = function() {
      this._registerKeys();
      this._lastUpdateTime = new Date().getTime();
      this._run = true;
      return this._update();
    };

    Tanki.prototype._requestAnimFrame = (function() {
      var _this = this;
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return setTimeout(callback, 1000 / 60);
      };
    })();

    Tanki.prototype._update = function() {
      var nextRunTime, time, timeDiff,
        _this = this;
      time = new Date().getTime();
      timeDiff = time - this._lastUpdateTime;
      this._lastUpdateTime = time;
      this._input.update();
      this._tank.update(timeDiff);
      this._scene.update(timeDiff);
      this._renderer.render(this._scene, null);
      nextRunTime = Tanki._FRAME_TIME;
      if (timeDiff < Tanki._FRAME_TIME) {
        nextRunTime -= timeDiff;
      }
      if (this._run) {
        return this._requestAnimFrame(function() {
          return _this._update();
        });
      }
    };

    Tanki.prototype._prepareScene = function() {
      var map, mapToSceneElementConverter, scene, startPos;
      map = Map.fromStub();
      mapToSceneElementConverter = new MapToSceneElementConverter;
      scene = map.convert(mapToSceneElementConverter);
      this._tank = new Tank();
      startPos = map.startPos();
      startPos.x *= 32;
      startPos.y *= 32;
      this._tank.set_pos(startPos);
      scene.addElement(this._tank.sceneElement);
      return this._scene = scene;
    };

    Tanki.prototype._registerKeys = function() {
      var _this = this;
      this._input.registerAction({
        key: InputManager.keys.KEY_UP,
        type: 'keydown'
      }, function() {
        return _this._tank.changeDirection('up');
      });
      this._input.registerAction({
        key: InputManager.keys.KEY_UP,
        type: 'keyup'
      }, function() {
        if (_this._tank.dir === 'up') {
          return _this._tank.changeDirection('none');
        }
      });
      this._input.registerAction({
        key: InputManager.keys.KEY_DOWN,
        type: 'keydown'
      }, function() {
        return _this._tank.changeDirection('down');
      });
      this._input.registerAction({
        key: InputManager.keys.KEY_DOWN,
        type: 'keyup'
      }, function() {
        if (_this._tank.dir === 'down') {
          return _this._tank.changeDirection('none');
        }
      });
      this._input.registerAction({
        key: InputManager.keys.KEY_LEFT,
        type: 'keydown'
      }, function() {
        return _this._tank.changeDirection('left');
      });
      this._input.registerAction({
        key: InputManager.keys.KEY_LEFT,
        type: 'keyup'
      }, function() {
        if (_this._tank.dir === 'left') {
          return _this._tank.changeDirection('none');
        }
      });
      this._input.registerAction({
        key: InputManager.keys.KEY_RIGHT,
        type: 'keydown'
      }, function() {
        return _this._tank.changeDirection('right');
      });
      this._input.registerAction({
        key: InputManager.keys.KEY_RIGHT,
        type: 'keyup'
      }, function() {
        if (_this._tank.dir === 'right') {
          return _this._tank.changeDirection('none');
        }
      });
      return this._input.registerAction({
        key: InputManager.keys.KEY_ESC,
        type: 'keydown'
      }, function() {
        return _this._run = false;
      });
    };

    Tanki._FRAME_TIME = 1000 / 60;

    return Tanki;

  })();

  window.onload = function() {
    var tanki;
    tanki = new Tanki();
    tanki.init();
    return tanki.start();
  };

}).call(this);
