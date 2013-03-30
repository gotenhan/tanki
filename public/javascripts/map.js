(function() {

  this.Map = (function() {

    Map.fromStub = function() {
      var map;
      map = new Map;
      map._tiles = ["xxxxxxxxxxxxxxxxxxxx".split(''), "x..................x", "x..................x".split(''), "x..................x".split(''), "x..................x".split(''), "xwwww.wwwww.wwww.wwx".split(''), "x..................x".split(''), "xxxxxxxxxxxxxxxxxxxx".split(''), "x..................x".split(''), "x..................x".split(''), "x..................x".split(''), "x..................x".split(''), "x.......xxx........x".split(''), "x......sxox........x".split(''), "xxxxxxxxxxxxxxxxxxxx".split('')];
      return map;
    };

    function Map() {
      this._tiles = [];
    }

    Map.prototype.convert = function(converter) {
      var row, tile, x, y, _i, _j, _len, _len1, _ref;
      _ref = this._tiles;
      for (y = _i = 0, _len = _ref.length; _i < _len; y = ++_i) {
        row = _ref[y];
        for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
          tile = row[x];
          converter.addTile(tile, x, y);
        }
      }
      return converter.result();
    };

    Map.prototype.startPos = function() {
      var pos, row, tile, x, y, _i, _j, _len, _len1, _ref;
      pos = {
        x: 0,
        y: 0
      };
      _ref = this._tiles;
      for (y = _i = 0, _len = _ref.length; _i < _len; y = ++_i) {
        row = _ref[y];
        for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
          tile = row[x];
          if (tile === 's') {
            pos = {
              x: x,
              y: y
            };
          }
        }
      }
      return pos;
    };

    return Map;

  })();

  this.MapToSceneElementConverter = (function() {

    function MapToSceneElementConverter() {
      this._scene = new SceneElement(new Background('black'));
    }

    MapToSceneElementConverter.prototype.result = function() {
      return this._scene;
    };

    MapToSceneElementConverter.prototype.addTile = function(tile, x, y) {
      var drawable, element, position;
      drawable = this._drawableFor(tile);
      position = {
        x: x * MapToSceneElementConverter.TILE_WIDTH,
        y: y * MapToSceneElementConverter.TILE_HEIGHT,
        angle: 0
      };
      if (drawable != null) {
        return element = this._scene.addDrawable(drawable, position);
      }
    };

    MapToSceneElementConverter.prototype._drawableFor = function(tile) {
      switch (tile) {
        case 'o':
          return new Sprite('sprites/orzel.json');
        case 'x':
          return new Sprite('sprites/mur.json');
        case 'w':
          return new Sprite('sprites/woda.json');
        default:
          return null;
      }
    };

    MapToSceneElementConverter.TILE_WIDTH = 32;

    MapToSceneElementConverter.TILE_HEIGHT = 32;

    return MapToSceneElementConverter;

  })();

}).call(this);
