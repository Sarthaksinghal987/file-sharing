const mongoose = require('mongoose');
//This imports the Mongoose library, which is a MongoDB ODM (Object Data Modeling) library for Node.js.

const Schema = mongoose.Schema;
//This creates a reference to the Schema constructor from the Mongoose library. It will be used to define the structure of the documents in the MongoDB collection.

const fileSchema = new Schema({
    filename: {type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    sender: { type: String, required: false },
    receiver: { type: String, required: false },

}, { timeStamps: true});
//This defines the schema for the "File" model.
//The second argument to new Schema(..., { timestamps: true }) enables Mongoose to automatically manage createdAt and updatedAt fields in each document, providing timestamps for when the document was created and last updated.

module.exports = mongoose.model('File', fileSchema);
//This exports the Mongoose model for the "File" schema. 
//The model is named "File" and will be used to interact with the "files" collection in the connected MongoDB database.
