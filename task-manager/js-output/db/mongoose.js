"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/task-manager-api', {});
// interface Task {
//   description: string,
//   completed: boolean,
// }
// const taskSchema = new Schema<Task>({
//   description: { 
//     type: String, 
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });
// const TaskModel = model<Task>('task', taskSchema)
// console.log('Yes, it works');
// // const user = new UserModel({
// //   name: '    Yam-jam',
// //   email:  'YAMYAM@JAMJAM.COM',
// //   password: 'djwaokjoijk',
// // });
// // user.save().then(() => {
// //   console.log(user);
// // }).catch((error) => {
// //   console.log('Failure to load save document', error);
// // });
// const interviewTask = new TaskModel({
//   description: '           study',
//   completed: true,
// });
// interviewTask.save().then(() => {
//   console.log(interviewTask);
// }).catch((error) => {
//   console.log(error);
// });
