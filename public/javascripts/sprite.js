(function() {

  this.Sprite = (function() {

    function Sprite(_path) {
      this._path = _path;
      this._info = loadJSON(this._path);
      this._animations = {};
      this._loadImages();
      this.setAnimation(this._info.defaultAnimation);
    }

    Sprite.prototype.render = function(context) {
      var frame;
      frame = this._currentAnimation.frames[this._currentFrame];
      return context.drawImage(this._currentAnimation.image, frame.sourceX, frame.sourceY, frame.width, frame.height, 0, 0, frame.width, frame.height);
    };

    Sprite.prototype.setAnimation = function(animationName) {
      this._currentAnimation = this._info.animations[animationName];
      this._currentFrame = 0;
      return this._elapsedTime = 0;
    };

    Sprite.prototype.update = function(timeDiff) {
      var frame, _results;
      this._elapsedTime += timeDiff;
      frame = this._currentAnimation.frames[this._currentFrame];
      _results = [];
      while (!(frame.time === 0 || this._elapsedTime < frame.time)) {
        this._elapsedTime -= frame.time;
        this._currentFrame = (this._currentFrame + 1) % this._currentAnimation.frames.length;
        _results.push(frame = this._currentAnimation.frames[this._currentFrame]);
      }
      return _results;
    };

    Sprite.prototype._loadImages = function() {
      var animation, name, _ref, _results;
      _ref = this._info.animations;
      _results = [];
      for (name in _ref) {
        animation = _ref[name];
        animation.image = new Image();
        _results.push(animation.image.src = animation.imagePath);
      }
      return _results;
    };

    return Sprite;

  })();

}).call(this);
