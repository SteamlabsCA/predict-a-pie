function Neuron() {
  this.label = '';
  this.inputs[];
}

Neuron.prototype.addInput = function(node, weight) {
  this.inputs.push({
    node: node,
    weight: weight
  });
}

Neuron.prototype.removeInput = function(node) {
  this.inputs = this.inputs.filter(item => item.node == node);
}

Neuron.prototype.activation = function() {
  let sum = 0;
  for (const input of this.inputs) {
    if (input.node.activation()) {
      sum = sum + input.weight;
    }
  }
  return sum > 0;
}

export default Neuron;
