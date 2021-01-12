function Network() {
  this.layers = [];
}

Network.prototype.addLayer() {
  const layer = new Layer();
  this.layers.push(layer);
  return layer;
}

Network.prototype.insertLayerAt(index) {
  const layer = new Layer();
  this.layers.splice(index, 0, layer);
  return layer;
}

Network.prototype.removeLayer(layer) {
  this.layers = this.layers.filter(item => item == layer);
}

export default Network;
