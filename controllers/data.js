var axios = require('axios');


async function traceability(req, res) {
  jsonData = {
    A: {
      id: 'M01',
      date: 'xx/xx/xxxx',
      stage: 'Merchant',
      description:'Description merchant'
    },
    B:{
      id: 'C01',
      date: 'xx/xx/xxxx',
      stage: 'Carrier',
      description:'Description carrier'
    },
    C:{
      id: 'A01',
      date: 'xx/xx/xxxx',
      stage: 'Acopio',
      description:'Description acopio'
    },

    D:{
      id: 'P01',
      date: 'xx/xx/xxxx',
      stage: 'Productor',
      description:'Description productor'
    }
  }
  var qr = req.body.QR;
  var split = qr.split('-');
  /*console.log(split[0]);
  if(req.body.QR){
    res.status(200).send({message: jsonData});
  }else {
    res.status(500).send({message: false});
  }*/
  try {
    //const resMerchant = await axios.post(`http://host.docker.internal:3002/getData/?code=${split[3]}`, { code: split[3]});
    const resMerchant = await axios.post('http://host.docker.internal:3002/getData', { code: split[0] });
    const resCarrier = await axios.post('http://host.docker.internal:3003/getData', { code: split[1]});
    const resAcopio = await axios.post('http://host.docker.internal:3004/getData', { code: split[2]});
    const resProductor = await axios.post('http://host.docker.internal:3005/getData', { code: split[3]});
    res.status(200).send({ A:  JSON.parse(resMerchant.data.message), B:  JSON.parse(resCarrier.data.message), C:  JSON.parse(resAcopio.data.message), D:  JSON.parse(resProductor.data.message) });
  } catch (error) {
    //console.log(error);
    console.log(error.response);
  }
}

module.exports = {
  traceability
};
