class @InputManager
  constructor: () ->
    @_keyEvents = []
    document.onkeydown = (e) => @_onKeyDown(e)
    document.onkeyup = (e) => @_onKeyUp(e)
    @_actions = []

  registerAction: (trigger, action) ->
    @_actions.push({ trigger: trigger, callback: action })

  unregisterAction: (trigger, action) ->
    @_actions.delete({ trigger: trigger, callback: action })

  update: () =>
    @_runActionsForEvent(event) for event in @_keyEvents
    @_keyEvents = []

  _runActionsForEvent: (event) ->
    for action in @_actions
      isTriggered =
        event.keyCode == action.trigger.key and
        event.type == action.trigger.type
      action.callback(event.timeStamp) if isTriggered

  _onKeyDown: (event) ->
    if @_isAutoRepeat(event)
      @_keyEvents.pop()
    else
      @_keyEvents.push(event)

  _onKeyUp: (event) ->
    @_keyEvents.push(event)

  _isAutoRepeat: (event) ->
    if @_keyEvents.length == 0
      false
    else
      lastKeyEvent = @_keyEvents[@_keyEvents.length - 1]
      lastKeyEvent.timeStamp == event.timeStamp &&
        lastKeyEvent.keyCode == event.keyCode
  
  @keys:
    KEY_LEFT: 37
    KEY_UP: 38
    KEY_RIGHT: 39
    KEY_DOWN: 40
    KEY_ESC: 27

