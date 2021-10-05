import {Schema, model} from 'mongoose';


interface Task {
  description: string,
  completed: boolean,
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
});



export default model<Task>('task', taskSchema)