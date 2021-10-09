import {Schema, model, Document} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
  name: string,
  age: number,
  email: string,
  password: string,
  tokens: [string],
  [key: string]: string | number | Array<string>,
  
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
    unique: true,
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
  },
  tokens: [{
    token: {
      type: String, 
      required: true,
    }
  }]
});


//todo 10/5/2021 you need to find a way to fix the ts error, It should be as simple as adding a new type that extends the model and adding that in the DOC.
userSchema.statics.findByCredentials = async function (email: string, password: string)  {
  const user = await this.findOne({email});

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign( {_id: user._id.toString() }, 'yamyamyoyam');
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}

userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next()
})

export default model<User>('user', userSchema);

