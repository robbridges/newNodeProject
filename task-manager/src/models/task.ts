import {Schema, model, } from 'mongoose';
const mongoose = require('mongoose');


interface Task {
  description: string,
  completed: boolean,
  owner: string,
  [key: string ]: string | boolean
}

// this interface seems much more simple than the user model. We'll probably add more to it, but for now it works. NO need to overcomplicate with unused fuctionality yet



const taskSchema = new Schema<Task>({
  description: { 
    type: String, 
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, {
  timestamps: true,
});



export default model<Task>('task', taskSchema)