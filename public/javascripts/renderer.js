(function() {

  this.Renderer = (function() {

    function Renderer(canvas) {
      this._context = canvas.getContext('2d');
    }

    Renderer.prototype.render = function(scene, camera) {
      if (scene != null) {
        return scene.render(this._context);
      }
    };

    return Renderer;

  })();

  this.Background = (function() {

    function Background(_color) {
      this._color = _color;
    }

    Background.prototype.render = function(context) {
      var oldFillStyle;
      oldFillStyle = context.strokeStyle;
      context.fillStyle = this._color;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      return context.fillStyle = oldFillStyle;
    };

    return Background;

  })();

}).call(this);
