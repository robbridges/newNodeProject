import {Schema, model} from 'mongoose';
import validator from 'validator';

interface User {
  name: string,
  age: number,
  email: string,
  password: string,
}

interface Task {
  description: string,
  completed: boolean,
}



const userSchema = new Schema<User>({
  name: {
    type: String, 
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0, 
    validate(value : number) {
      if (value < 0) {
        throw new Error('Age must be greater than zero');
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value : string) {
      if (!validator.isEmail(value)) {
        throw new Error ('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    minlength: 7,
    required: true,
    trim: true,
    validate(value : string) {
      if (value.toLocaleLowerCase().includes('password')) {
        throw new Error('Password cannot include password');
      }
    }
  }

  


});

export default model<User>('user', userSchema);
