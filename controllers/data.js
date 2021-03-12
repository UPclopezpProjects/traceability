function traceability(req, res) {
  jsonData = {
    A: {
      id: 'A01',
      date: 'xx/xx/xxxx',
      stage: 'Merchant',
      description:'Description merchant'
    },
    B:{
      id: 'B01',
      date: 'xx/xx/xxxx',
      stage: 'Carrier',
      description:'Description carrier'
    },
    C:{
      id: 'C01',
      date: 'xx/xx/xxxx',
      stage: 'Acopio',
      description:'Description acopio'
    },

    D:{
      id: 'D01',
      date: 'xx/xx/xxxx',
      stage: 'Productor',
      description:'Description productor'
    }
  }
  //console.log(jsonData.A.id);
  if(req.body){
    res.status(200).send({message: jsonData});
  }else {
    res.status(500).send({message: false});

  }
}

module.exports = {
  traceability
};
