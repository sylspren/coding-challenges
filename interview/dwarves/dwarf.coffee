_ = require 'underscore'
startingPosition = [0, 0]

NUM_STEPS = 3

positions = []
nextPositions = []

positions.push startingPosition

dedupLocations = (locations) ->
  _(locations).uniq((a, b) ->
    "#{a[0]}#{a[1]}"
  )

drawGrid = (size, locations) ->
  transformedLocations = locations.map (location) ->
    offset = Math.floor(size / 2)
    [location[0] + offset, location[1] + offset].join(',')

  for row in [0...size]
    out = ""
    for col in [0...size]
      if "#{row},#{col}" in transformedLocations
        out += "*"
      else
        out += "_"
    console.log out



for i in [0...NUM_STEPS]
  drawGrid(11, positions)
  # places the dwarf could be as of step i - 1
  for currentPosition in positions
    # up
    nextPositions.push [ currentPosition[0], currentPosition[1] + 1 ]
    # down
    nextPositions.push [ currentPosition[0], currentPosition[1] - 1 ]
    # left
    nextPositions.push [ currentPosition[0] - 1, currentPosition[1] ]
    # right
    nextPositions.push [ currentPosition[0] + 1, currentPosition[1] ]

  nextPositions = dedupLocations(nextPositions)

  positions = nextPositions
  nextPositions = []

drawGrid(11, positions)
