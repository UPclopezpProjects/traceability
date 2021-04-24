var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductorSchema = new Schema({
  id: {type: String, required: true, max: 100},
  fid: {type: String, required: true, max: 100},
  ubication: {type: String, required: true, max: 100},
  name: {type: String, required: true, max: 100},
  previousStage: {type: String, required: true, max: 100},
  currentStage: {type: String, required: true, max: 100}
});

module.exports = mongoose.model('Productor', ProductorSchema);
