//*** TO START SERVER use command: "node app" from terminal ***

/*global $*/
/*global Tables_in_whw */
console.log('Loading Server.');

//Loading express
//works with Node.js
//loading the library "using express;"
//nodejs calls librarys modules
let express = require('express');
let logger = require('morgan');
let compression = require('compression');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let imageUpload = require('express-fileupload');
//used to delete image files when the object for it is removed from db
const fs = require('fs');

//start sql
let mysql = require('mysql');

let app = express(); //this loads express so it's available to use.

//Loading "middleware" => modules for express
//Express middleware static will server files from the __dirname(current directory)
app.use(logger('dev'));
app.use(bodyParser.json()); //this will parse the json for post or put
app.use(bodyParser.urlencoded({ extended: false })); //this will allow us to get at the key value pairs from submited html <form>.
app.use(compression());
app.use(favicon(`${__dirname}/../favicon.ico`));
app.use(express.static(__dirname + '/../')); // change to `${__dirname}/..`?
app.use(imageUpload());
//app.use(favicon(`${__dirname}/../tree_icon.png`));

//HTTP STATUS CODES for "logger"
//2xx are sucesses
//3xx are redirects
//4xx are client side failure
//5xx are server side failure

//console.log(__dirname + '/' + __filename);

//connects database
let conn = mysql.createConnection({
  hostname: 'localhost',
  user: 'rshirts',
  password: '',
  database: 'whw'
});

conn.connect(function(err) {
  if (err) {
    console.log('Error connecting to MySQL:', err);
  } else {
    console.log('Connection established');
  }
});

//*** START of REST Code ***

// Used for debugging.
// Construction
app.get('/api/v1/construction', function(req, res) {
  res.send('Under Construction.');
});

//Get product table information.
app.get(`/api/v1/products/:productName`, function(req, res) {
  let productName = req.params.productName;
  let sqlString = `select * from products where productName = '${productName}'`;
  conn.query(sqlString, function(err, results) {
    if (err) {
      res.status(404); //bad request - not found
      console.log('error in grounds product id query');
    } else {
      //console.log(results)
      res.status(200).send(results);
    }
  });
});

// Get IDS
app.get('/api/v1/:productName/getIDs', function(req, res) {
  let productName = req.params.productName;
  let sqlString = `select id from ${productName}`;
  conn.query(sqlString, function(err, results) {
    if (err) {
      res.status(404); //bad request - not found
      console.log('error in trees id query');
    } else {
      //console.log(results)
      for (let i in results) {
        results[i] = results[i].id;
      }
      res.status(200).send(results); //set status
    }
  });
});

//individual product Queries
app.get('/api/v1/:productName/:id', function(req, res) {
  let id = req.params.id;
  let productName = req.params.productName;
  let sqlQuery = `select * from ${productName} where id = ${id}`;
  conn.query(sqlQuery, function(err, results) {
    if (err) {
      res.status(404); //bad request - not found
      console.log('ERROR: in /api/v1/:productName/:id ' + err);
    } else {
      res.status(200).send(results);
    }
  });
});

// delete app here
app.delete('/api/v1/:productName/:id', function(req, res) {
  //This will show the proper key: values being deleted however we just submit it using the params.
  //console.log(`Deleting ${req.params.productName} with id ${req.params.id}`);
  let id = req.params.id;
  let productName = req.params.productName;
  let sqlQuery = `delete from ${productName} where id = ${id}`;
  conn.query(`select image from ${productName} where id = ${id}`, function(err, imageResult) {
    if (err) console.log('unable to proceess query in update attach image');
    else {
      console.log(imageResult);
      if (imageResult.length > 0) {
        let imageName = imageResult[0].image;
        fs.unlink(imageName, function(err) {
          if (err) {
            console.log('unable to remove image');
          } else {
            console.log('file removed.');
          }
        });
      } else {
        console.log("there isn't an image to delete.");
      }
      conn.query(sqlQuery, function(err, results) {
        if (err) {
          console.log('ERROR: in /api//v1/:productName/:id ' + err);
        } else {
          console.log(`${productName} was removed with id ${id}`);
          res.send(id);
        }
      });
    }
  });
});

//inserting new product
app.post('/api/v1/:productName', function(req, res) {
  //assign variables if they aren't used they will be left undefined.
  console.log('post image name to follow:');
  //console.log(req.files);
  //console.log('image:');
  //console.log(req.files);
  console.log(req.body);
  let productName = req.params.productName;
  let sqlQuery = '';
  let imageName = '';
  if (req.files.image) {
    imageName = `../img/${req.files.image.name}`;
    let imageData = req.files.image;
    imageData.mv(imageName, function(err) {
      if (err) {
        console.log(`Unable to move file. ${err}`);
      } else {
        console.log(`file moved to ${imageName}`);
      }
    });
  }
  let name = req.body.name;
  let height = req.body.height;
  let width = req.body.width;
  let sun = req.body.sun;
  let soil = req.body.soil;
  let descr = req.body.descr;
  let spacing = req.body.spacing;
  let water = req.body.water;

  //create sql query to be sent.
  if (productName === 'trees') {
    //console.log(req.body);
    sqlQuery = `INSERT INTO ${productName} (name, image, height, width, sun, soil, descr)
            VALUES ('${name}', '${imageName}', '${height}', '${width}', '${sun}', '${soil}', '${descr}')`;
  } else if (productName === 'shrubs') {
    //end of if-trees
    sqlQuery = `INSERT INTO ${productName} (name, image, height, width, sun, soil, spacing, descr)
            VALUES ('${name}', null, '${height}', '${width}', '${sun}', '${soil}', '${spacing}', '${descr}')`;
  } else if (productName === 'grounds') {
    //end of shrubs-if
    sqlQuery = `INSERT INTO ${productName} (name, image, width, sun, soil, water, descr)
            VALUES ('${name}', null, '${width}', '${sun}', '${soil}', '${water}','${descr}')`;
  }
  console.log('sqlQuery to follow:');
  console.log(sqlQuery);
  conn.query(sqlQuery, function(err, results) {
    if (err) {
      console.log(`ERROR: in app.post(/api/v1/${productName}) ${err}} `);
      res.send('unable to insert object.');
    } else {
      //attach the new id back to the req.body to be sent back.
      console.log(`The ${productName} was added to the table.`);
      //attach the new ID and the image name to the req.body to send back.
      req.body['id'] = results.insertId;
      req.body['image'] = imageName;
      console.log('req.body: ');
      console.log(req.body);
      res.send(req.body);
    }
  });
});

//update a product
app.put('/api/v1/:productName', function(req, res) {
  console.log(`Starting update request.`);
  //assign variables if they aren't used they will be left undefined.
  // let image = req.files.image.name;
  // console.log('image:');
  // console.log('Image filename:');
  // console.log(req.files.image.name);
  // console.log('req.body = ');
  // console.log(req.body);
  // console.log('req.files to follow');
  //console.log(`This is the request file ${JSON.stringify(req.files, null, 3)} end of files.` );
  //console.log(`This is the request body ${JSON.stringify(req.body, null, 3)} end of body`);
  let productName = req.params.productName;
  console.log(productName);
  let sqlQuery = '';
  let imageName = '';
  if (req.files.image) {
    imageName = `../img/${req.files.image.name}`;
    let imageData = req.files.image;
    imageData.mv(imageName, function(err) {
      if (err) {
        console.log(`Unable to move file. ${err}`);
      } else {
        console.log(`file moved to ${imageName}`);
      }
    });
  }
  console.log(`Image name is: ${imageName}`);
  let name = req.body.name;
  console.log(`This is the name: ${name}`);
  let height = req.body.height;
  let width = req.body.width;
  let sun = req.body.sun;
  let soil = req.body.soil;
  let descr = req.body.descr;
  let spacing = req.body.spacing;
  let water = req.body.water;
  let id = req.body.id;

  //no image so dont update the image/photo information
  if (imageName === '') {
    //create sql query to be sent.
    if (productName === 'trees') {
      //console.log(req.body);
      sqlQuery = `UPDATE ${productName}
                SET name="${name}", height="${height}", width="${width}", sun="${sun}", soil="${soil}", descr="${descr}"
                WHERE id="${id}"`;
    } else if (productName === 'shrubs') {
      //end of if-trees
      sqlQuery = `UPDATE ${productName}
                SET name="${name}", height="${height}", width="${width}", sun="${sun}", soil="${soil}", spacing="${spacing}", descr="${descr}"
                WHERE id="${id}"`;
    } else if (productName === 'grounds') {
      //end of shrubs-if
      sqlQuery = `UPDATE ${productName}
                SET name="${name}", width="${width}", sun="${sun}", soil="${soil}", water="${water}", descr="${descr}"
                WHERE id="${id}"`;
    }

    //There is a new image to update
  } else {
    //create sql query to be sent.
    if (productName === 'trees') {
      //console.log(req.body);
      sqlQuery = `UPDATE ${productName}
                SET name="${name}", image="${imageName}", height="${height}", width="${width}", sun="${sun}", soil="${soil}", descr="${descr}"
                WHERE id="${id}"`;
    } else if (productName === 'shrubs') {
      //end of if-trees
      sqlQuery = `UPDATE ${productName}
                SET name="${name}", image="${imageName}", height="${height}", width="${width}", sun="${sun}", soil="${soil}", spacing="${spacing}", descr="${descr}"
                WHERE id="${id}"`;
    } else if (productName === 'grounds') {
      //end of shrubs-if
      sqlQuery = `UPDATE ${productName}
                SET name="${name}", image="${imageName}", width="${width}", sun="${sun}", soil="${soil}", water="${water}", descr="${descr}"
                WHERE id="${id}"`;
    }
  }

  console.log('sqlQuery to follow:');
  console.log(sqlQuery);
  conn.query(sqlQuery, function(err, results) {
    if (err) {
      console.log(`ERROR: in app.post(/api/v1/${productName}) ${err}} `);
    } else {
      console.log(`The ${productName} was updated.`);
      //need to attach the imageName back for the update.
      conn.query(`select image from ${productName} where id = ${id}`, function(err, imageResult) {
        if (err) console.log('unable to proceess query in update attach image');
        else {
          console.log(`ImageResult is: ${JSON.stringify(imageResult)}`);
          req.body['image'] = imageResult[0].image;
          console.log(`the body being sent back is :`);
          console.log(req.body);
          res.send(req.body);
        }
      });
    }
  });
  //extra code
});

// *** END REST ***

app.listen(process.env.PORT, function() {
  console.log('Listening on Port ' + process.env.PORT); // only posts after it's listening.
});
