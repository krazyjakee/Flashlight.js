window.activeFlashlight = 0;

$(window).load(function() {
  var fl;
  fl = new Flashlight($('#flashlight'), {
    width: 210,
    height: 200,
    gradient: ["#888", "#aaa", "white"],
    lights: [
      {
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }
    ]
  });
  $('#flashlight').click(function(e) {
    var x, y;
    x = e.offsetX;
    y = e.offsetY + $(window).scrollTop();
    $("[result=\"light" + activeFlashlight + "\"]").attr('dx', x - 100);
    $("[result=\"light" + activeFlashlight + "\"]").attr('dy', y - 100);
    window.activeFlashlight++;
    if (window.activeFlashlight > fl.lights.length - 2) {
      return window.activeFlashlight = 0;
    }
  });
  return $('#flashlight').mousemove(function(e) {
    var x, y;
    x = e.offsetX;
    y = e.offsetY + $(window).scrollTop();
    $('[result="light' + (fl.lights.length - 1) + '"]').attr('dx', x - 100);
    return $('[result="light' + (fl.lights.length - 1) + '"]').attr('dy', y - 100);
  });
});
