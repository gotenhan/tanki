class @Tanki
  constructor: () ->
  init: () =>
    canvas = document.getElementById('canvas')
    @_renderer = new Renderer(canvas)
    @_input = new InputManager(canvas)
    @_prepareScene()
  start: () ->
    @_registerKeys()
    @_lastUpdateTime = new Date().getTime()
    @_run = true
    @_update()

  _requestAnimFrame: (() ->
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
     (callback) => setTimeout(callback, 1000 / 60);
    )()

  _update: () ->
    time = new Date().getTime()
    timeDiff = time - @_lastUpdateTime
    @_lastUpdateTime = time

    @_input.update()
    @_tank.update(timeDiff)
    @_scene.update(timeDiff)
    @_renderer.render(@_scene, null)

    nextRunTime = Tanki._FRAME_TIME
    nextRunTime -= timeDiff if timeDiff < Tanki._FRAME_TIME
    @_requestAnimFrame(=> @_update()) if @_run

  _prepareScene: () ->
    map = Map.fromStub()
    mapToSceneElementConverter = new MapToSceneElementConverter
    scene = map.convert(mapToSceneElementConverter)
    @_tank = new Tank()
    startPos = map.startPos()
    startPos.x *= 32
    startPos.y *= 32
    @_tank.set_pos(startPos)
    scene.addElement(@_tank.sceneElement)
    @_scene = scene

  _registerKeys: () ->
    @_input.registerAction(
      { key: InputManager.keys.KEY_UP, type: 'keydown' },
      () => @_tank.changeDirection('up'))
    @_input.registerAction(
      { key: InputManager.keys.KEY_UP, type: 'keyup'},
      () => (@_tank.changeDirection('none') if @_tank.dir == 'up'))
    @_input.registerAction(
      { key: InputManager.keys.KEY_DOWN, type: 'keydown' },
      () => @_tank.changeDirection('down'))
    @_input.registerAction(
      { key: InputManager.keys.KEY_DOWN, type: 'keyup' },
      () => (@_tank.changeDirection('none') if @_tank.dir == 'down'))
    @_input.registerAction(
      { key: InputManager.keys.KEY_LEFT, type: 'keydown' },
      () => @_tank.changeDirection('left'))
    @_input.registerAction(
      { key: InputManager.keys.KEY_LEFT, type: 'keyup' },
      () => (@_tank.changeDirection('none') if @_tank.dir == 'left'))
    @_input.registerAction(
      { key: InputManager.keys.KEY_RIGHT, type: 'keydown' },
      () => @_tank.changeDirection('right'))
    @_input.registerAction(
      { key: InputManager.keys.KEY_RIGHT, type: 'keyup' },
      () => (@_tank.changeDirection('none') if @_tank.dir == 'right'))
    @_input.registerAction(
      { key: InputManager.keys.KEY_ESC, type: 'keydown' },
      () => @_run = false)

  @_FRAME_TIME: 1000/60

window.onload = ->
  tanki = new Tanki()
  tanki.init()
  tanki.start()

