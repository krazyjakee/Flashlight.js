var Flashlight;

window.FlashlightStore = {
  svgCount: 0
};

Flashlight = (function() {
  Flashlight.prototype.id = false;

  Flashlight.prototype.width = 0;

  Flashlight.prototype.height = 0;

  Flashlight.prototype.lightWidth = 0;

  Flashlight.prototype.lightHeight = 0;

  Flashlight.prototype.lights = 0;

  function Flashlight(target, properties) {
    var count, height, id, lightHeight, lightWidth, that, width;
    count = FlashlightStore.svgCount++;
    this.id = id = count;
    this.width = width = $(target).width();
    this.height = height = $(target).height();
    this.lightWidth = lightWidth = properties.width;
    this.lightHeight = lightHeight = properties.height;
    this.lights = properties.lights;
    that = this;
    $.get('template.mustache', function(res) {
      var svgElem;
      svgElem = Mustache.render(res, {
        id: id,
        count: count,
        width: width,
        height: height,
        lightWidth: lightWidth,
        lightHeight: lightHeight,
        halfWidth: lightWidth / 2,
        halfHeight: lightHeight / 2,
        gradient: that.addGradient(properties.gradient),
        filters: that.addFilter(properties.lights)
      });
      return target.append(svgElem);
    });
  }

  Flashlight.prototype.addGradient = function(gradient) {
    var gradientElem, id, index, perc, stop, _i, _len;
    id = "flashlight-gradient-" + this.id;
    gradientElem = "<radialGradient id=\"flashlight-gradient-" + this.id + "\">";
    for (index = _i = 0, _len = gradient.length; _i < _len; index = ++_i) {
      stop = gradient[index];
      perc = 100 / (gradient.length - 1) * index;
      gradientElem += "<stop offset=\"" + perc + "%\" stop-color=\"" + stop + "\" />";
    }
    gradientElem += "</radialGradient>";
    return gradientElem;
  };

  Flashlight.prototype.addFilter = function(lights) {
    var blendCount, count, dx, dy, filterElem, height, i, id, index, light, previous, width, _i, _j, _len, _ref;
    id = "flashlight-filter-" + this.id;
    width = Math.floor(this.width / this.lightWidth) + 1;
    height = Math.floor(this.height / this.lightHeight);
    filterElem = "<filter id=\"" + id + "\" x=\"0\" y=\"-10%\" width=\"" + width + "\" height=\"" + height + "\">";
    blendCount = 0;
    for (index = _i = 0, _len = lights.length; _i < _len; index = ++_i) {
      light = lights[index];
      dx = light.x - (this.lightWidth / 2);
      dy = light.y - (this.lightHeight / 2);
      filterElem += "<feOffset result=\"light" + index + "\" in=\"SourceGraphic\" dx=\"" + dx + "\" dy=\"" + dy + "\" />";
      if (index % 2) {
        blendCount++;
        previous = index - 1;
        filterElem += "<feBlend result=\"blend" + blendCount + "\" in=\"light" + previous + "\" in2=\"light" + index + "\" mode=\"multiply\" />";
      }
    }
    if (lights.length % 2 && lights.length > 1) {
      blendCount++;
      filterElem += "<feBlend result=\"blend" + blendCount + "\" in=\"blend" + (blendCount - 1) + "\" in2=\"light" + (lights.length - 1) + "\" mode=\"multiply\" />";
    }
    if (blendCount > 1) {
      count = 1;
      for (i = _j = blendCount, _ref = lights.length; blendCount <= _ref ? _j < _ref : _j > _ref; i = blendCount <= _ref ? ++_j : --_j) {
        filterElem += "<feBlend result=\"blend" + (i + 1) + "\" in=\"blend" + (i - 2 + count) + "\" in2=\"blend" + (i - 1 + count) + "\" mode=\"multiply\" />";
        count++;
      }
    }
    filterElem += "</filter>";
    return filterElem;
  };

  return Flashlight;

})();
