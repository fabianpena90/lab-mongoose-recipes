const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Mashed potatoes',
      level: 'Easy Peasy',
      ingredients: ['potatoes', 'butter', 'salt', 'pepper', 'garlic', 'milk'],
      cuisine: 'Americana',
      dishType: 'main_course',
      duration: 20,
      creator: 'Fabian Pena'
    })
    Recipe.insertMany(data)
    .then(()=> {
      console.log("Added All The Recipes")
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true}).then((recipe)=> {console.log('has been changed', recipe)});
      Recipe.deleteOne({ title: "Orange and Milk-Braised Pork Carnitas" })
      .then(() => {
          console.log("deletedThePork");
          mongoose.connection.close();
        }
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
