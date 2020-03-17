const express = require('express');
const connectDB = require('./config/db');
 const app = express();
// connect db
connectDB();
//init middelware
app.use(express.json({extended: false}));
// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/project', require('./routes/api/project'));
app.use('/api/group', require('./routes/api/group'));
app.use('/api/documentation', require('./routes/api/documentation'));
const PORT =  process.env.PORT || 5000;

 app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
