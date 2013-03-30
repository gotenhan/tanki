class @Renderer
  constructor: (canvas) ->
    @_context = canvas.getContext('2d')
  render: (scene, camera) ->
    #@_context.clearRect(0, 0, @_context.canvas.width,  @_context.canvas.height)
    scene.render(@_context) if scene?

class @Background
  constructor: (@_color) ->
  render: (context) ->
    oldFillStyle = context.strokeStyle
    context.fillStyle = @_color
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = oldFillStyle
