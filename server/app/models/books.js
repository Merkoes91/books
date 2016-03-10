/*jslint node: true */
/** TODO: Test with static-analyzer */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        schemaName,
        modelName;

    schemaName = new Schema({
        title: {type: String, required: true, unique: true},
        author: {type: String, required: true},
        description: {type: String, "default":'null'},
        imagelink: {type: String, "default": 'placeholder'},
        modificationDate: {type: Date, "default": Date.now}
    }, {collection: 'books'});

    /**
     * Custom validator
     * -------
     * Instructions, hints and questions.
     *
     * In Mongoose you can define custom validators.
     * If the value does not fit the the definition, an error is returned.

     * - Instruction: Add a validator for title. A title must have a length of at least 8 characters.
     * - Question: There are four locations of validations, each for a specific type of validation. Give for each validation an example and describe why that location is the best location for that specific type of validation.
     *   1. Database (technical constraints, primary key)
     *   1. Schema (simple business rules)
     *   1. Application (complex business rules)
     *   1. Client-side (form validation)
     * @class Validator/Book/title
     * @returns true or false. In case of ```false```, a message 'Invalid title' is returned as well.
     * @see http://mongoosejs.com/docs/validation.html
     */
    schemaName.path('title').validate(function (val) {
        return (val !== undefined && val !== null && val.length >= 2);
    }, 'Missing or invalid title');

    /**
     * Instructions, hints and questions.
     * - Instruction: Create a model for the defined schema.
     * - Question: What are the differences between a 'Model' and a 'Schema Type'? Use the references to motivate your answer.
     * @class Model/Book
     * @see http://mongoosejs.com/docs/models.html
     */
    modelName = "Book";
    mongoose.model(modelName, schemaName);

}());