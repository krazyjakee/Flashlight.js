window.activeFlashlight = 0

$(window).load ->
  fl = new Flashlight $('#flashlight'),
    width: 210
    height: 200
    gradient: ["#888", "#aaa", "white"]
    lights: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]

  $('#flashlight').click (e) ->
     x = e.offsetX
     y = e.offsetY + $(window).scrollTop()
     $("[result=\"light#{activeFlashlight}\"]").attr('dx',  x - 100)
     $("[result=\"light#{activeFlashlight}\"]").attr('dy',  y - 100)
     window.activeFlashlight++
     window.activeFlashlight = 0 if window.activeFlashlight > fl.lights.length-2

  $('#flashlight').mousemove (e) ->
    x = e.offsetX
    y = e.offsetY + $(window).scrollTop()
    $('[result="light'+(fl.lights.length-1)+'"]').attr('dx',  x - 100)
    $('[result="light'+(fl.lights.length-1)+'"]').attr('dy',  y - 100)