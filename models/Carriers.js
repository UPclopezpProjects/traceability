var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarrierSchema = new Schema({
  id: {type: String, required: true, max: 100},
  fid: {type: String, required: true, max: 100},
  ubication: {type: String, required: true, max: 100},
  name: {type: String, required: true, max: 100},
  previousStage: {type: String, required: true, max: 100},
  currentStage: {type: String, required: true, max: 100},
  image: {type: String, required: true, max: 100}
  /*fid: [{
    id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Carrier'
    }
  }],*/
});

module.exports = mongoose.model('Carrier', CarrierSchema);
