npm install
if [ $? -eq 1 ] ; then 
  echo "**********************\nFailed to install dependencies\n**********************"
  exit 1
fi
npx sequelize-cli db:migrate
if [ $? -eq 1 ] ; then 
  echo "**********************\nFailed to run migrations\n**********************"
  exit 1
fi
npx sequelize-cli db:seed:all
if [ $? -eq 1 ] ; then 
  echo "**********************\nFailed to seed data to database\n**********************"
  exit 1
fi
npm start
if [ $? -eq 1 ] ; then 
  echo "**********************\nFailed to start server\n**********************"
  exit 1
fi