Do it in the first time (you'd better drop your old db first):
* Step 1: run 'npm install' to  install all package
* Step 2: run 'npx sequelize-cli db:create' if you didn't has a database
* Step 3: run 'npx sequelize-cli db:migrate ' to create your table
* Step 4: rune 'npx sequelize-cli db:seed:all' to seed init data
* Step 5: type 'npm start' to start app

// Type 'npx pm2 logs app' to show all log

