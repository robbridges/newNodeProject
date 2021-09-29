import {Schema, model} from 'mongoose';
import validator from 'validator';

interface Task {
  description: string,
  completed: boolean,
}





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