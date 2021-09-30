require('../src/db/mongoose');
import User from '../src/models/user';



/* Promise chaining goodness, we are first finding the user by id and updating their age to one then searching for any other user in the records that have this age. This would be super useful
for unique email validation */


//6152a10a1cb015f3194e921a
// User.findByIdAndUpdate('6153c82234cd603ba0c0b74e', { age: 1}).then((user) => {
//   console.log(user);
//   return User.countDocuments({age: 1})
// }).then((result) => {
//   console.log(result);
// }).catch((e) => {
//   console.log(e);
// });
