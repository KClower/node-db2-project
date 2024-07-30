const db = require('../../data/db-config.js');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  db('cars')
    .where({ id: req.params.id })
    .then(result => {
      const [car] = result
      if (car === undefined)
        return res.status(404).json({ message: `car with id ${req.body.id} is not found` });
      next()
    })

}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  let field = ""
  if (!vin) {
    field = "vin"
  } else if (!make) {
    field = "make"
  } else if (!model) {
    field = "model"
  } else if (!mileage) {
    field = "mileage"
  }

  if (field.length > 0) {
    return res.status(400).json({ message: `${field} is missing` });
  }

  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if (req.body.vin.length !== 17)
    return res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  next()
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  db('cars')
    .where({ vin: req.body.vin })
    .then(result => {
      const [car] = result
      if (car !== undefined)
        return res.status(400).json({ message: `vin ${req.body.vin} already exists` })
      next()
    })

}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}