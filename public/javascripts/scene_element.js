(function() {

  this.SceneElement = (function() {

    function SceneElement(drawable, coordinates) {
      this.drawable = drawable;
      this.coordinates = coordinates != null ? coordinates : {
        x: 0,
        y: 0,
        angle: 0
      };
      this._children = [];
      this.width = drawable != null ? this.drawable.width : 0;
      this.height = drawable != null ? this.drawable.height : 0;
    }

    SceneElement.prototype.render = function(canvas) {
      var child, _i, _len, _ref;
      canvas.save();
      this._transformCanvas(canvas);
      if (this.drawable != null) {
        this.drawable.render(canvas);
      }
      _ref = this._children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        child.render(canvas);
      }
      return canvas.restore();
    };

    SceneElement.prototype.addDrawable = function(drawable, coordinates) {
      var sceneElement;
      sceneElement = new SceneElement(drawable, coordinates);
      this._children.push(sceneElement);
      return sceneElement;
    };

    SceneElement.prototype.addElement = function(sceneElement) {
      this._children.push(sceneElement);
      return sceneElement;
    };

    SceneElement.prototype.update = function(timeDiff) {
      var child, _i, _len, _ref, _results;
      if ((this.drawable != null) && (this.drawable.update != null)) {
        this.drawable.update(timeDiff);
      }
      _ref = this._children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.update(timeDiff));
      }
      return _results;
    };

    SceneElement.prototype._transformCanvas = function(canvas) {
      canvas.translate(this.coordinates.x, this.coordinates.y);
      return canvas.rotate(this.coordinates.angle);
    };

    return SceneElement;

  })();

}).call(this);
