// Retrieve and return all products from the const Products.
import News from '../model/News.js'

export const list = (req, res) => {
    News.find().then(result =>  res.json(result));
};

