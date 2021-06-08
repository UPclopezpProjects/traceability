var axios = require('axios');
var Productor = require('../models/Productors');
var Acopio = require('../models/Acopios');
var Carrier = require('../models/Carriers');
var Merchant = require('../models/Merchants');

function endRequest(datas, res) {
  for(var data of datas){
    data.image = 'http://'+host.aws+':'+port.aws+''+path.images+''+data.image+'';
  }
  //var jsonData = JSON.stringify(data);
  res.status(200).send({message: datas});
}

async function traceability(req, res) {
  var query = { code: req.body.QR, id: req.body.ID };
  var data = [];
  return new Promise(function(resolve, reject) {
    Merchant.findOne(query)
    .then(merchantStored => {
      data.push(merchantStored);
      switch (merchantStored.previousStage) {
        case 'Merchant':
          searchInMerchant(merchantStored.fid, data, res);
          break;
        case 'Carrier':
          searchInCarrier(merchantStored.fid, data, res);
          break;
        case 'Acopio':
          searchInAcopio(merchantStored.fid, data, res);
          break;
        case 'Productor':
          searchInProductor(merchantStored.fid, data, res);
          break;
        case null:
        case 'null':
          endRequest(data, res);
          //res.status(200).send({message: data});
          break;
        default:
          res.status(404).send({message: 'default case in function traceability'});
          break;
      }
    })
    .then(undefined, function(err){
      reject(err);
    })
    .catch(err => {
      console.log(err);
      return res.status(505).json({message: "Error 505"});
    });
  });
  /*var split = qr.split('-');
  console.log(split[0]);
  if(req.body.QR){
    res.status(200).send({message: jsonData});
  }else {
    res.status(500).send({message: false});
  }
  try {
    //const resMerchant = await axios.post(`http://host.docker.internal:3002/getData/?code=${split[3]}`, { code: split[3]});
    const resMerchant = await axios.post('http://host.docker.internal:3002/getData', { code: split[0] });
    const resCarrier = await axios.post('http://host.docker.internal:3003/getData', { code: split[1] });
    const resAcopio = await axios.post('http://host.docker.internal:3004/getData', { code: split[2] });
    const resProductor = await axios.post('http://host.docker.internal:3005/getData', { code: split[3] });
    res.status(200).send({ A:  JSON.parse(resMerchant.data.message), B:  JSON.parse(resCarrier.data.message), C:  JSON.parse(resAcopio.data.message), D:  JSON.parse(resProductor.data.message) });
  } catch (error) {
    //console.log(error);
    console.log(error.response);
  }*/

}

function searchInMerchant(fid, data, res) {
  return new Promise(function(resolve, reject) {
    Merchant.findOne({ id: fid})
    .then(merchantStored => {
      data.push(merchantStored);
      switch (merchantStored.previousStage) {
        case 'Merchant':
          searchInMerchant(merchantStored.fid, data, res);
          break;
        case 'Carrier':
          searchInCarrier(merchantStored.fid, data, res);
          break;
        case 'Acopio':
          searchInAcopio(merchantStored.fid, data, res);
          break;
        case 'Productor':
          searchInProductor(merchantStored.fid, data, res);
          break;
        case null:
        case 'null':
          endRequest(data, res);
          //res.status(200).send({message: data});
          break;
        default:
          res.status(404).send({message: 'default case in function traceability'});
          break;
      }
    })
    .then(undefined, function(err){
      reject(err);
    })
    .catch(err => {
      //console.log(err);
      return res.status(505).json({message: "Error 505"});
    });
  });
}

function searchInCarrier(fid, data, res) {
  return new Promise(function(resolve, reject) {
    Carrier.findOne({ id: fid})
    .then(carrierStored => {
      data.push(carrierStored);
      switch (carrierStored.previousStage) {
        case 'Merchant':
          searchInMerchant(carrierStored.fid, data, res);
          break;
        case 'Carrier':
          searchInCarrier(carrierStored.fid, data, res);
          break;
        case 'Acopio':
          searchInAcopio(carrierStored.fid, data, res);
          break;
        case 'Productor':
          searchInProductor(carrierStored.fid, data, res);
          break;
        case null:
        case 'null':
          endRequest(data, res);
          //res.status(200).send({message: data});
          break;
        default:
          res.status(404).send({message: 'default case in function traceability'});
          break;
      }
    })
    .then(undefined, function(err){
      reject(err);
    })
    .catch(err => {
      console.log(err);
      return res.status(505).json({message: "Error 505"});
    });
  });
}

function searchInAcopio(fid, data, res) {
  return new Promise(function(resolve, reject) {
    Acopio.findOne({ id: fid})
    .then(acopioStored => {
      data.push(acopioStored);
      switch (acopioStored.previousStage) {
        case 'Merchant':
          searchInMerchant(acopioStored.fid, data, res);
          break;
        case 'Carrier':
          searchInCarrier(acopioStored.fid, data, res);
          break;
        case 'Acopio':
          searchInAcopio(acopioStored.fid, data, res);
          break;
        case 'Productor':
          searchInProductor(acopioStored.fid, data, res);
          break;
        case null:
        case 'null':
          endRequest(data, res);
          //res.status(200).send({message: data});
          break;
        default:
          res.status(404).send({message: 'default case in function traceability'});
          break;
      }
    })
    .then(undefined, function(err){
      reject(err);
    })
    .catch(err => {
      //console.log(err);
      return res.status(505).json({message: "Error 505"});
    });
  });
}

function searchInProductor(fid, data, res) {
  return new Promise(function(resolve, reject) {
    Productor.findOne({ id: fid})
    .then(productorStored => {
      data.push(productorStored);
      switch (productorStored.previousStage) {
        case 'Merchant':
          searchInMerchant(productorStored.fid, data, res);
          break;
        case 'Carrier':
          searchInCarrier(productorStored.fid, data, res);
          break;
        case 'Acopio':
          searchInAcopio(productorStored.fid, data, res);
          break;
        case 'Productor':
          searchInProductor(productorStored.fid, data, res);
          break;
        case null:
        case 'null':
          endRequest(data, res);
          //res.status(200).send({message: data});
          break;
        default:
          res.status(404).send({message: 'default case in function traceability'});
          break;
      }
    })
    .then(undefined, function(err){
      reject(err);
    })
    .catch(err => {
      //console.log(err);
      return res.status(505).json({message: "Error 505"});
    });
  });
}

function addData(req, res) {
  switch (req.body.currentStage) {
    case 'Productor':
      addDataProductor(req, res);
      break;
    case 'Acopio':
      addDataAcopio(req, res);
      break;
    case 'Carrier':
      addDataCarrier(req, res);
      break;
    case 'Merchant':
      addDataMerchant(req, res);
      break;
    default:
      res.status(200).send({message: 'Esta etapa no existe'});
      break;
  }
}

function addDataProductor(req, res){
  var productor = new Productor();
  productor.id = req.body.id;
  productor.fid = req.body.fid;
  productor.ubication = req.body.ubication;
  productor.name = req.body.name;
  productor.previousStage = req.body.previousStage;
  productor.currentStage = req.body.currentStage;
  productor.image = req.body.image;
  productor.description = req.body.description;
  productor.save((err, productorStored) => {
    if(err) {
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!productorStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        res.status(200).send({ message: true, addData: 'Productor', info: productorStored });
      }
    }
  });
}

function addDataAcopio(req, res){
  var acopio = new Acopio();
  acopio.id = req.body.id;
  acopio.fid = req.body.fid;
  acopio.ubication = req.body.ubication;
  acopio.name = req.body.name;
  acopio.previousStage = req.body.previousStage;
  acopio.currentStage = req.body.currentStage;
  acopio.image = req.body.image;
  acopio.description = req.body.description;
  acopio.save((err, acopioStored) => {
    if(err) {
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!acopioStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        res.status(200).send({ message: true, addData: 'Acopio', info: acopioStored });
      }
    }
  });
}

function addDataCarrier(req, res){
  var carrier = new Carrier();
  carrier.id = req.body.id;
  carrier.fid = req.body.fid;
  carrier.ubication = req.body.ubication;
  carrier.name = req.body.name;
  carrier.previousStage = req.body.previousStage;
  carrier.currentStage = req.body.currentStage;
  carrier.image = req.body.image;
  carrier.description = req.body.description;
  carrier.save((err, carrierStored) => {
    if(err) {
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!carrierStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        res.status(200).send({ message: true, addData: 'Carrier', info: carrierStored });
      }
    }
  });
}

function addDataMerchant(req, res){
  var merchant = new Merchant();
  merchant.id = req.body.id;
  merchant.fid = req.body.fid;
  merchant.code = req.body.code;
  merchant.ubication = req.body.ubication;
  merchant.name = req.body.name;
  merchant.previousStage = req.body.previousStage;
  merchant.currentStage = req.body.currentStage;
  merchant.image = req.body.image;
  merchant.description = req.body.description;
  merchant.save((err, merchantStored) => {
    if(err) {
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!merchantStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        res.status(200).send({ message: true, addData: 'Merchant', info: merchantStored });
      }
    }
  });
}

module.exports = {
  traceability,
  addData
};
