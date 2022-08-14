const { Thought, User } = require('../models');

//collecting all the thoughts
const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err)); 
    },
    getThoughtById({ params }, res) {
        console.log(params.id)
        Thought.findOne({ _id: params.id })
        
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    console.log()
                    return res.status(404).json({ message: 'thought was not Found.' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => {

                res.status(400).json(err)
            }
            );
        },
    // post thoughts
    postNewThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData    => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'user was not found.' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
        },
        // post reactions
        postNewReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        return res.status(404).json({ message: 'No thoughts found.' });
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.status(400).json(err));
        },
}
