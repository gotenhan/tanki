class @SceneElement
  constructor: (@drawable, @coordinates = { x: 0, y: 0, angle: 0}) ->
    @_children = []
    @width = if drawable? then @drawable.width else 0
    @height = if drawable? then @drawable.height else 0
  render: (canvas) ->
    canvas.save()
    @_transformCanvas(canvas)
    @drawable.render(canvas) if @drawable?
    child.render(canvas) for child in @_children
    canvas.restore()
  addDrawable: (drawable, coordinates) ->
    sceneElement = new SceneElement(drawable, coordinates)
    @_children.push(sceneElement)
    sceneElement
  addElement: (sceneElement) ->
    @_children.push(sceneElement)
    sceneElement
  update: (timeDiff) ->
    @drawable.update(timeDiff) if @drawable? and @drawable.update?
    child.update(timeDiff) for child in @_children
  _transformCanvas: (canvas)->
    canvas.translate(@coordinates.x, @coordinates.y)
    canvas.rotate(@coordinates.angle)

