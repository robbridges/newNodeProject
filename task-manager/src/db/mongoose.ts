import mongoose, {Schema, model, connect} from 'mongoose';
import validator from 'validator';
import { example } from 'yargs';

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {});


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

const UserModel = model<User>('user', userSchema);

const TaskModel = model<Task>('task', taskSchema)

console.log('Yes, it works');

// const user = new UserModel({
//   name: '    Yam-jam',
//   email:  'YAMYAM@JAMJAM.COM',
//   password: 'djwaokjoijk',
// });

// user.save().then(() => {
//   console.log(user);
// }).catch((error) => {
//   console.log('Failure to load save document', error);
// });

const interviewTask = new TaskModel({
  description: '           study',
  completed: true,
});

interviewTask.save().then(() => {
  console.log(interviewTask);
}).catch((error) => {
  console.log(error);
});



