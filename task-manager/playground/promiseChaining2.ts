require('../src/db/mongoose');
import Task from '../src/models/task';


Task.findByIdAndDelete('6152a384de212b59a60471db').then((task) => {
  console.log(`${task} is to be deleted`);
  return Task.countDocuments({ completed: false});
}).then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(e);
});