const express = require('express');
const connectDB = require('./config/db');

 const app = express();
 const fileUpload=require('express-fileupload')


 app.use(fileUpload());
// connect db
connectDB();
//init middelware
app.use(express.json({extended: false}));
app.use('/routes/api/images',express.static('images'));
// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts')); 
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/project', require('./routes/api/project'));
app.use('/api/group', require('./routes/api/group'));
app.use('/api/event', require('./routes/api/event'));
app.use('/api/task', require('./routes/api/tasks'));



app.use('/api/documentation', require('./routes/api/documentation'));
const PORT =  process.env.PORT || 5000;

 app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
