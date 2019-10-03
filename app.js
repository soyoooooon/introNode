const express = require('express');
const hbs = require('hbs');
const path = require('path');
const sql = require('./utills/sql')
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname +"/views"))

app.get('/',(req, res)=> { //slash is default view
  res.render('home', { homemessage: "hi now" });
})

app.get('/users', (req, res) => {
//get user data...... when we click this route


//try a database connection
//if the connection fails, log errors to the console

sql.getConnection((err, connection) => {
  if(err) {
    return colsole.log(err.message);
  }

  let query = "SELECT * FROM tbl_card";
  
  sql.query(query, (err, rows) => {
    connection.release();

    if (err) { return console.log(err,message)}
    console.log(rows);

   res.render('user', rows[0]);
  })
})

})




app.listen(port,() => {
  console.log(`app is running on port ${port}`);
});