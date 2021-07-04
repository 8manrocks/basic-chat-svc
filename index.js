//DB
const dbConfig = require('./db-config');

const db = dbConfig.connect();

db.on('connected', () => {
  console.log('connected');
  console.log(db.readyState); //logs 1
});

db.on('error', (err) => {
    console.log('err', err);
    console.log(db.readyState); //logs 1
  });

// Express
const app = require('express');
const serve = app();
const envRoutes = require('./routes/env-routes');
const authRoutes = require('./routes/auth-routes');
const cors = require('cors');

serve.use(cors());
serve.use(app.urlencoded({extended: true}));
serve.use(app.json());


serve.use(envRoutes);
serve.use('/auth', authRoutes);


serve.listen(3000, () => {
    console.log('listening on 3000');
});


