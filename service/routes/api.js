// Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const utils = require('../utils/utils');

//GET HTTP method 
router.get('/restaurants', function (req, res, next) {
    Restaurant.find(function (err, restaurants) {
        if (err) {
            return next(err);
        }
        res.json(restaurants);
    }).limit(10);
});


router.get('/restaurants/:word/:page/:grade', function (req, res, next) {
    console.log(req.params);
    var aggregate = Restaurant.aggregate();
    const match = {
        $text: {
            $search: req.params.word ? req.params.word : ''
        }
    };
    const project = {
        name: 1,
        building: 1,
        street: 1,
        boro: 1,
        zipcode: 1,
        phone: 1,
        cuisine: 1,
        imageUrl: 1,
        grade: 1,
        gradeDate: 1,
        inspections: 1,
        grade: {
            $ifNull: ["$grade", "GP"] // help to sort
        }
    }
    const sort = {
        grade: req.params.grade ? parseInt(req.params.grade) : 1
    };

    aggregate.match(match).project(project).sort(sort);
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const limit = 12;
    var options = {
        page: page,
        limit: limit,
        //sortBy: 
    };

    Restaurant.aggregatePaginate(aggregate, options)
        .then(function (x) {
            //formating results
            let list = {
                total: x.totalCount,
                limit: limit,
                page: page,
                pages: x.pageCount,
                restaurants: x.data.length > 0 ? x.data.map(d => ({
                    _id: d._id,
                    name: d.name,
                    address: utils.addressBuilder(d.building, d.street, d.boro, d.zipcode),
                    phone: utils.phoneBuilder(d.phone),
                    cuisine: d.cuisine,
                    imageUrl: d.imageUrl,
                    grade: utils.gradeBuilder(d.grade),
                    gradeDate: utils.gradeDateBuilder(d.gradeDate),
                    inspection: utils.inspectionsBuilder(d.inspections)
                })) : []
            };

            res.json(list);

        })
        .catch(function (err) {
            res.json(err);
        });
});
module.exports = router;