function Layer() {
  this.nodes = [];
}

Layer.prototype.addNode(node) {
  this.nodes.push(node);
}

Layer.prototype.removeNode(node) {
  this.nodes = this.nodes.filter(item => item == node);
}

export default Layer;
