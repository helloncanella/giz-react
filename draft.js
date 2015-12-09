if (!lastPosition[id]) {
  lastPosition[id] = centroidPosition;
} else {
  displacement = {
    x: centroidPosition.x - lastPosition[id].x,
    y: centroidPosition.y - lastPosition[id].y
  }
  lastPosition[id] = centroidPosition;
}
