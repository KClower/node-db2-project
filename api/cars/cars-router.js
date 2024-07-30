// DO YOUR MAGIC
const router = require('express').Router()

const Cars = require('./cars-model.js');
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique } = require('./cars-middleware.js');

router.get('/', (req, res) => {
    Cars.getAll(req.query)
        .then(cars => {
            return res.status(200).json(cars);
        });
});

router.get('/:id', checkCarId, (req, res) => {
    Cars.getById(req.params.id)
        .then(car => {
            return res.status(200).json(car);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Error retrieving car" });
        });
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res) => {
    Cars.create(req.body)
        .then(car => {
            return res.status(201).json(car);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ Message: "Error creating Car" });
        });
});


module.exports = router;