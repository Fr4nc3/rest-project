const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var RestaurantSchema = new Schema({
    id: ObjectId,
    createdAt: Number,
    updatedAt: Number,

    camis: String,
    name: String,
    boro: String,
    building: String,
    street: String,
    zipcode: String,
    phone: String,
    cuisine: String,
    searchText: String,

    imageUrl: String,
    grade: String,
    gradeDate: String,

    inspections: [{
        date: String,
        action: String,
        violation_code: String,
        violation_desc: String,
        critical_flag: String,
        score: String,
        grade: String,
        grade_date: String,
        record_date: String,
        inspection_type: String
    }]
});
RestaurantSchema.plugin(mongooseAggregatePaginate);
// define the model
const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);


module.exports = RestaurantModel;