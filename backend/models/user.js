import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    age: String,
	createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);