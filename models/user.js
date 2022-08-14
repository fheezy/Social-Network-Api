const { Schema, model } = require('mongoose');
//new schema 
const userSchema = new Schema (
    {
        email: { type: String, required: true, unique: true},
        username: { type: String, Unique: true, required: true, trimmed: true }, 
        friends: [{ type: Schema.Types.ObjectId, ref: 'user',}],
        thoughts: [{ type: Schema.Types.Array, ref: 'thought',}],
    }, 
    {
        toJSON: {
            virtuals: true, 
        },
        id: false,
     });
    
 userSchema 
    .virtual('friendCount')
    .get(function () {
        const numberOfFriends = this.friends.length;
        return numberOfFriends
    }) 
// retrieves the length of the user's 'friends' 

const User = model('user', userSchema);
//starts the model

module.exports = User;