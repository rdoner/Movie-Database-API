var ObjectID = require('mongodb').ObjectID;

var result = [];

module.exports = function(app, db) {
 
//CRUD Routes:

  //CREATE route
  app.post('/movies', (req, res) => {
    const movie = { title: req.body.title, id: req.body.id, year: req.body.year, genres: req.body.genres};
    db.collection('movies').insert(movie, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
      //ops Contains the documents inserted with added _id fields
        //res.send(result.ops[0]);
        res.send(result.ops[0]);
        //res.send("posted");
      }
    });
  });

  //READ route
  app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('movies').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  //UPDATE route
  app.put('/movies/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    //fix this line
    const movie = { title: req.body.title, id: req.body.id, year: req.body.year, genres: req.body.genres};
    db.collection('movies').update(details, movie, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(movie);
      } 
    });
  });

  //DESTORY route
  app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('movies').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Movie ' + id + ' deleted!');
      } 
    });
  });


  //Advanced routes: 

  //find all movies, ordered by year
  app.get('/movies', (req,res) => {
    db.collection('movies').find({}, {"title": 1, _id:0}).sort({"year": 1}).toArray((err, allMovies) => {
        if(err) {
          console.log(err);
        } else {
          res.send(allMovies);
        } 
    });          
  });
  
  //List years by order of years with the most movies
  app.get('/year', (req,res) => {
    db.collection('movies').aggregate([{$group : {_id : "$year", num_movies : {$sum : 1}}}, {$sort: {"num_movies": -1}}], 
        (err, result) => {
     // console.log(result);
        if(err) {
          console.log(err);
        } else {
          //res.send(JSON.stringify(allMovies));
          res.send(result);
        } 
    });
  })

  //index of genres
  app.get('/genres', (req,res) => {
    db.collection('movies').distinct("genres",
    (err, result) => {
        if(err) {
          console.log(err);
        } else {
          res.send(result);
        } 
    });
  });


//An endpoint for a particular genre that includes a listing of the genre’s movie(s).
  app.get('/genremovies', (req,res) => {
    //const genre = req.params.genre;
    db.collection('movies').aggregate([
          {$group: {_id: "$genres" /*, genres: { $push: "$genres" */}},
          {$sort: {genre:-1}}
          ]
          (err, result) => {
          if(err) {
             console.log(err);
          } else {
             res.send(result);
        } 
    });
  });
};

