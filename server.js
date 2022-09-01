const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
// const routes = require('./Develop/routes');
const apiRoutes = require('./Develop/routes/apiRoutes')
const htmlRoutes = require('./Develop/routes/htmlRoutes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));
app.use('/api', apiRoutes)
app.use('/', htmlRoutes);
// app.use('/', routes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});



