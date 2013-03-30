(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Tank = (function() {

    function Tank() {
      this.update = __bind(this.update, this);
      this.sprite = new Sprite('sprites/tank.json');
      this.sceneElement = new SceneElement(this.sprite);
      this.dir = 'none';
      this.coordinates = this.sceneElement.coordinates;
    }

    Tank.prototype.set_pos = function(pos) {
      this.coordinates.x = pos.x;
      return this.coordinates.y = pos.y;
    };

    Tank.prototype.update = function(timeDiff) {
      var deltaX, deltaY, newX, newY;
      deltaX = Tank._MOVE_SPEED * Tank._DIR_DELTAS[this.dir].x * timeDiff;
      deltaY = Tank._MOVE_SPEED * Tank._DIR_DELTAS[this.dir].y * timeDiff;
      newX = this.coordinates.x + deltaX;
      newY = this.coordinates.y + deltaY;
      this.coordinates.x = newX;
      return this.coordinates.y = newY;
    };

    Tank.prototype.changeDirection = function(dir) {
      this.dir = dir;
      if (this.dir !== 'none') {
        return this.sprite.setAnimation(dir);
      }
    };

    Tank._MOVE_SPEED = 64 / 1000;

    Tank._DIR_DELTAS = {
      left: {
        x: -1,
        y: 0
      },
      right: {
        x: 1,
        y: 0
      },
      up: {
        x: 0,
        y: -1
      },
      down: {
        x: 0,
        y: 1
      },
      none: {
        x: 0,
        y: 0
      }
    };

    return Tank;

  })();

}).call(this);
