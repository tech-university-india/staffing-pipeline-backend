const { users } = require('./src/models');

// insert into db using sequelize
const insertUser = async () => {
  const user = await users.create({
    user_id: 1,
    name: 'John',
    email: 'rishusingh022@gmail.com',
    fmno: 1234567890,
    current_engagement_ids : null,
    case_studies : null,
    skills : null,
    role : null,
    guild : null,
    past_engagement_ids : null,
    image : null,
    password : null,
  });
  console.log(user.toJSON());
};

insertUser();