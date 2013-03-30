class @Tank
  constructor: () ->
    @sprite = new Sprite('sprites/tank.json')
    @sceneElement = new SceneElement(@sprite)
    @dir = 'none'
    @coordinates = @sceneElement.coordinates
  set_pos: (pos) ->
    @coordinates.x = pos.x
    @coordinates.y = pos.y
  update: (timeDiff) =>
    deltaX = Tank._MOVE_SPEED * Tank._DIR_DELTAS[@dir].x * timeDiff
    deltaY = Tank._MOVE_SPEED * Tank._DIR_DELTAS[@dir].y * timeDiff
    newX = @coordinates.x + deltaX
    newY = @coordinates.y + deltaY
    @coordinates.x = newX
    @coordinates.y = newY
  changeDirection: (dir) ->
    @dir = dir
    @sprite.setAnimation(dir) if @dir != 'none'

  @_MOVE_SPEED: 64/1000
  @_DIR_DELTAS:
    left:  { x: -1, y:  0 }
    right: { x:  1, y:  0 }
    up:    { x:  0, y: -1 }
    down:  { x:  0, y:  1 }
    none:  { x:  0, y:  0 }
