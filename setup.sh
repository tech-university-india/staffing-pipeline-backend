npm install
if [ $? -eq 1 ] ; then 
  echo "**********************\nNpm not found\n**********************"
  exit 1
fi
npx sequelize-cli db:migrate
if [ $? -eq 1 ] ; then 
  echo "**********************\nDB Server not started\n**********************"
  exit 1
fi
npm start