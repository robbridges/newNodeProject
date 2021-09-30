require('../src/db/mongoose');
import Task from '../src/models/task';


// Task.findByIdAndDelete('6152a384de212b59a60471db').then((task) => {
//   console.log(`${task} is to be deleted`);
//   return Task.countDocuments({ completed: false});
// }).then((result) => {
//   console.log(result);
// }).catch((e) => {
//   console.log(e);
// });

const deleteTaskAndCountRecords = async (id: string, completed: boolean) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({completed})

  return count;
}

deleteTaskAndCountRecords('6152a36303ee57bbbd495e2a', false).then((count) => {
  console.log(count);
}).catch((e) => {
  console.log(e);
});



