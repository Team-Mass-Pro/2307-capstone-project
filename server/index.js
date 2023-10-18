try {
  require('../env'); // Load environment variables
} 
catch(ex){
  console.log(`
  If running locally add env.js file to root directory
  set REACT_APP_GOOGLE_API_KEY
  `)
};


const {
  seed,
  client,
} = require('./db');
const app = require('./app');

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  if(process.env.SYNC){
    await seed();
    console.log('create your tables and seed data');
  }

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
