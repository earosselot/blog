// import faker from 'faker';

import { connectDb } from './config/database.js';
import Comment from './models/comment.js';
import Post from './models/post.js';
import User from './models/user.js';

// import { validPassword, genPassword } from './utils/passwordUtils.js';

async function main() {
  try {
    const connection = await connectDb();
    connection.on('connecting', () => {
      console.log('connecting to DB');
    });
    connection.on('connected', () => {
      console.log('connected to DB');
    });

    // Drop collections
    Post.collection.drop();
    User.collection.drop();
    Comment.collection.drop();
    console.log('Collections dropped');

    // // Create Admin user
    // const { salt, hash } = genPassword('admin1234');
    // const admin = new User({
    //   username: 'admin',
    //   firstName: 'Administrador',
    //   lastName: 'Jefe',
    //   hash,
    //   salt,
    //   admin: true,
    // });
    // await admin.save();
    // console.log('admin user created');

    // // Create normal users
    // const users = 10;
    // for (let i = 0; i < users; i++) {
    //   const username = faker.internet.email.username();
    //   const firstName = faker.internet.email.name();
    //   const lastName = faker.internet.email.LastName();
    //   const password = faker.internet.email.Password();
    //   const { salt, hash } = genPassword(password);

    //   const user = new User({ username, firstName, lastName, salt, hash });
    //   await user.save();
    // }
  } catch (e) {
    console.log(e.message);
  } finally {
    connection.close();
    // process.exit(0);
  }
}

main();
