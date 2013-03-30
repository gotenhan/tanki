class @Map
  @fromStub: () ->
    map = new Map
    map._tiles = [
      "xxxxxxxxxxxxxxxxxxxx".split(''),
      "x..................x",
      "x..................x".split(''),
      "x..................x".split(''),
      "x..................x".split(''),
      "xwwww.wwwww.wwww.wwx".split(''),
      "x..................x".split(''),
      "xxxxxxxxxxxxxxxxxxxx".split(''),
      "x..................x".split(''),
      "x..................x".split(''),
      "x..................x".split(''),
      "x..................x".split(''),
      "x.......xxx........x".split(''),
      "x......sxox........x".split(''),
      "xxxxxxxxxxxxxxxxxxxx".split('')
    ]
    map

  constructor: () ->
    @_tiles = []
  convert: (converter) ->
    for row,y in @_tiles
      converter.addTile(tile, x, y) for tile,x in row
    converter.result()
  startPos: () ->
    pos =
      x: 0
      y: 0
    for row, y in @_tiles
      for tile, x in row
        pos = {x: x, y: y} if tile == 's'
    pos

class @MapToSceneElementConverter
  constructor: () ->
    @_scene = new SceneElement(new Background('black'))
  result: -> @_scene
  addTile: (tile, x, y) ->
    drawable = @_drawableFor(tile)
    position =
      x: x * MapToSceneElementConverter.TILE_WIDTH
      y: y * MapToSceneElementConverter.TILE_HEIGHT
      angle: 0
    element = @_scene.addDrawable(drawable, position) if drawable?


  _drawableFor: (tile) ->
    switch tile
      when 'o' then new Sprite('sprites/orzel.json')
      when 'x' then new Sprite('sprites/mur.json')
      when 'w' then new Sprite('sprites/woda.json')
      else null

  @TILE_WIDTH = 32
  @TILE_HEIGHT = 32
