class @Sprite
  constructor: (@_path) ->
    @_info = loadJSON(@_path)
    @_animations = {}
    @_loadImages()
    @setAnimation(@_info.defaultAnimation)
  render: (context) ->
    frame = @_currentAnimation.frames[@_currentFrame]
    context.drawImage(@_currentAnimation.image, frame.sourceX, frame.sourceY, frame.width, frame.height, 0, 0, frame.width, frame.height)
  setAnimation: (animationName) ->
    @_currentAnimation = @_info.animations[animationName]
    @_currentFrame = 0
    @_elapsedTime = 0
  update: (timeDiff) ->
    @_elapsedTime += timeDiff
    frame = @_currentAnimation.frames[@_currentFrame]
    until frame.time == 0 || @_elapsedTime < frame.time 
      @_elapsedTime -= frame.time
      @_currentFrame = (@_currentFrame + 1) % @_currentAnimation.frames.length
      frame = @_currentAnimation.frames[@_currentFrame]

  _loadImages: () ->
    for name, animation of @_info.animations
      animation.image = new Image()
      animation.image.src = animation.imagePath
