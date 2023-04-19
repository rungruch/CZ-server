// Retrieve and return all products from the const Products.
import HeroSlide from '../model/HeroSlide.js'

export const list = (req, res) => {
    HeroSlide.find().then(result =>  res.json(result));
};

