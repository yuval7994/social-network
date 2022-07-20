const { Schema, model, Types } = require("mongoose")

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId, 
        // default: ObjectId
    }, 
    reactionBody: {
        type: String, 
        required: true, 
        maxLength: 280
    },
    username: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        get: createdAtVal => dateFormat(createdAtVal)
    },
}) 

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
})

ThoughtSchema.virtual("reactionsCount").get(function () {
  return this.reactions.reduce((total, reactions) => total + reactions.length + 1, 0)
})

const Thought = model('Thought', ThoughtSchema); 
module.exports = Thought; 