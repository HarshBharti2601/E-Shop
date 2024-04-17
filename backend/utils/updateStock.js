const Product = require('../models/productModel')

async function updateStock (id , quantity) {
  
    const product = await Product.findById(id);
 
    product.Stock = product.Stock - quantity
    
    await product.save({validateBeforeSave : false})
}

module.exports = updateStock;