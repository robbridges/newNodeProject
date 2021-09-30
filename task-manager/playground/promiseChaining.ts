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

// async await would be better and easier to understand here

const updateUserAndReturnCount = async (id : string, age: number) => {
  const user = await User.findByIdAndUpdate(id, {age});
  const count = await User.countDocuments({age});
  return count;

}

updateUserAndReturnCount('6152a10a1cb015f3194e921a', 23).then((count) => {
  console.log(count);
}).catch((e) => {
  console.log(e)
});
