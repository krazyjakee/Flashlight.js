window.FlashlightStore = 
  svgCount: 0
  template: '<svg id="flashlight-svg-{{count}}" width="{{width}}" height="{{height}}" xmlns="http://www.w3.org/2000/svg"><defs>{{{gradient}}}<mask id="mask1" x="0" y="0" width="{{width}}" height="{{height}}"><rect x="0" y="0" width="{{width}}" height="{{height}}" fill="white" /><ellipse filter="url(#flashlight-filter-{{count}})" ry="{{halfHeight}}" rx="{{halfWidth}}" cy="122.5" cx="101.5" stroke-width="none" fill="url(#flashlight-gradient-{{count}})"/></mask>{{{filters}}}</defs><g><rect x="0" y="0" width="{{width}}" height="{{height}}" mask="url(#mask1)" fill="black" /></g></svg>'

class Flashlight

  id: false
  width: 0
  height: 0
  lightWidth: 0
  lightHeight: 0
  lights: 0

  constructor: (target, properties) ->
    count = FlashlightStore.svgCount++
    @id = id = count
    @width = width = $(target).width()
    @height = height = $(target).height()
    @lightWidth = lightWidth = properties.width
    @lightHeight = lightHeight = properties.height
    @lights = properties.lights

    that = @

    svgElem = Mustache.render FlashlightStore.template,
      id: id
      count: count
      width: width
      height: height
      lightWidth: lightWidth
      lightHeight: lightHeight
      halfWidth: lightWidth / 2
      halfHeight: lightHeight / 2
      gradient: that.addGradient(properties.gradient)
      filters: that.addFilter(properties.lights)

    target.append svgElem

  addGradient: (gradient) ->
    id = "flashlight-gradient-#{@id}"
    gradientElem = "<radialGradient id=\"flashlight-gradient-#{@id}\">"
    for stop, index in gradient
      perc = 100 / (gradient.length - 1) * index
      gradientElem += "<stop offset=\"#{perc}%\" stop-color=\"#{stop}\" />"
    gradientElem += "</radialGradient>"
    gradientElem

  addFilter: (lights) ->
    id = "flashlight-filter-#{@id}"
    width = Math.floor(@width / @lightWidth) + 1
    height = Math.floor(@height / @lightHeight)
    filterElem = "<filter id=\"#{id}\" x=\"0\" y=\"-10%\" width=\"#{width}\" height=\"#{height}\">"

    blendCount = 0

    for light, index in lights
      dx = light.x - (@lightWidth / 2)
      dy = light.y - (@lightHeight / 2)
      filterElem += "<feOffset result=\"light#{index}\" in=\"SourceGraphic\" dx=\"#{dx}\" dy=\"#{dy}\" />"

      if index % 2
        blendCount++
        previous = index - 1
        filterElem += "<feBlend result=\"blend#{blendCount}\" in=\"light#{previous}\" in2=\"light#{index}\" mode=\"multiply\" />"

    if lights.length % 2 and lights.length > 1
      blendCount++
      filterElem += "<feBlend result=\"blend#{blendCount}\" in=\"blend#{blendCount-1}\" in2=\"light#{lights.length-1}\" mode=\"multiply\" />"

    if lights.length > 2
      count = 0
      for i in [blendCount...lights.length]
        filterElem += "<feBlend result=\"blend#{i+1}\" in=\"blend#{i-1+count}\" in2=\"blend#{i+count}\" mode=\"multiply\" />"

    filterElem += "</filter>"
    filterElem