const req = require("express/lib/request")
const { Thought, User } = require("../models")

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params, id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err))
  },

  createThought({ body }, res) {
    const { thoughtText, username } = body
    Thought.create({ thoughtText, username }).then((dbThoughtData) => {
      User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: dbThoughtData.id } }
      )
        .then((dbUserData) => {
          res.json({ ...dbThoughtData, user: dbUserData })
        })
        .catch((err) => res.json(err))
    })
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found" })
          return
        }
        res.json(dbThoughtData)
      })
      .catch((err) => res.json(err))
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err))
  },
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: body.reactionId } }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err))
  },
}

module.exports = thoughtController
