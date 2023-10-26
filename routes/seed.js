var express = require('express');
var router = express.Router();

const Product = require('../models/Product')


const data = [{
    brand: 'Air Jordan',
    name: 'Travis Scott x Air Jordan 1 Low Golf',
    price: 800,
    description: 'Colorway: Neutral Olive/Black/Sail/Light Lemon Twist/Baroque Brown/White - Release Date: 10/13/23',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/374130/1.jpg'
},
{
    brand: 'Nike',
    name: 'Dunk Low Panda',
    price: 112,
    description: 'Colorway: White/Black/White - Release Date: 3/10/21',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/253215/1.jpg'
},
{
    brand: 'Air Jordan',
    name: 'Air Jordan 4 Retro Red Cement',
    price: 230,
    description: 'Colorway: White/Fire Red/Black/Neutral Grey - Release Date:  9/9/23',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/367078/1.jpg'
},
{
    brand: 'Adidas',
    name: 'Yeezy Slides Onyx',
    price: 120,
    description: 'Colorway: Onyx/Onyx/Onyx - Release Date: 3/7/22',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/296154/1.jpg'
},
{
    brand: 'Air Jordan',
    name: 'Air Jordan 1 Retro High Bred Toe',
    price: 500,
    description: 'Colorway: Gym Red/Summit White-Black - Release Date:  2/24/18',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/802799/1.jpg'
},
{
    brand: 'Air Jordan',
    name: 'Travis Scott x Air Jordan 1 Reverse Mocha',
    price: 1500,
    description: 'Colorway: Sail/University Red/Ridgerock - Release Date: 7/21/22',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/290844/1.jpg'
},
{
    brand: 'Adidas',
    name: 'Yeezy Boost 350 V2 Bred',
    price: 345,
    description: 'Colorway: Core Black/Core Black/Red - Release Date: 2/11/17',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/800389/1.jpg'
},
{
    brand: 'Nike',
    name: 'Dunk Low Grey Fog',
    price: 120,
    description: 'Colorway: White/Grey Fog - Release Date: 9/21/21',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/280880/1.jpg'
},
{
    brand: 'Nike',
    name: 'Dunk Low SB Freddy Krueger',
    price: 25000,
    description: 'Colorway: Taupe/Chrome - Release Date: 1/1/07',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/080411/1.jpg'
},
{
    brand: 'Off-White',
    name: 'Off-White x Dunk Low University Red',
    price: 575,
    description: 'Colorway: University Red/University Red/Wolf Grey - Release Date: 12/20/19',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/153270/1.jpg'
},
{
    brand: 'Air Jordan',
    name: 'Air Jordan 6 Retro Aqua',
    price: 165,
    description: 'Colorway: Black/Bright Concord/Aquatone - Release Date:  10/7/23',
    image: 'https://cdn.flightclub.com/750/TEMPLATE/356780/1.jpg'
},
{
    brand: 'Adidas',
    name: 'Yeezy Boost 700 Wave Runner',
    price: 400,
    description: 'Colorway: Solid Grey/Chalk White/Core Black - Release Date: 8/17/23',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/378290/1.jpg'
},
{
    brand: 'Adidas',
    name: 'Yeezy Boost 350 V2 Zebra',
    price: 305,
    description: 'Colorway: White/Core Black/Red - Release Date: 4/9/22',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/369153/1.jpg'
},
{
    brand: 'Air Jordan',
    name: 'J. Balvin x Air Jordan 3 Retro Medellin Sunset',
    price: 430,
    description: 'Colorway: Multi-Color/Multi-Color - Release Date:  9/23/23',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/370415/1.jpg'
},
{
    brand: 'Nike',
    name: 'Supreme x Air Force 1 Low Box-Logo Black',
    price: 200,
    description: 'Colorway: Black/Black - Release Date: 3/5/20',
    image: 'https://cdn.flightclub.com/2200/TEMPLATE/167870/1.jpg'
},
]

router.get("/one-time", async (req, res, next) => {
    Product.insertMany(data)
      .then((createdProducts) => {
        console.log(createdProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  });


module.exports = router;