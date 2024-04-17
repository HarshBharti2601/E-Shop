class ApiFeatures {

    //Product.find() , req.query-> this will contain keyword for search
    //these are sent as a first and the second argument

    //Look for the comment below

    constructor(query , queryStr) {
        this.query = query ;
        this.queryStr = queryStr;
 
    }

    search() {
        const keyword = this.queryStr.keyword?{
            name:{
                $regex: this.queryStr.keyword,
                $options : 'i'
            }
        }:{}
       //here we are modifing query , if we call search and then call .query , it will be the modified query , simply we are chaning query with different modified find(____)
        this.query = this.query.find({...keyword})
        // this makes the returned object equal to query property so it can be later accessed by .(dot) operatior
        return this
        //this returns the reference to the same object so we can chain methods
    }

    filter() {
        let querycopy = {...this.queryStr};
      
        const removeFields = ["keyword" , "page" , "limit" , "category"]
        removeFields.forEach((key)=> delete querycopy[key]);
        
        

        querycopy = JSON.stringify(querycopy)

        querycopy = querycopy.replace(/\b(gt|gte|lt|lte)\b/g , (key=> `$${key}`))

        let parsedQuery = JSON.parse(querycopy)

        this.query = this.query.find(parsedQuery);
 
        
      
        return this

    }

    pagination(productPerPage){
        const currentPage = Number(this.queryStr.page)||1;
        
        const skip = productPerPage*(currentPage - 1)


        this.query = this.query.limit(productPerPage).skip(skip)
        return this;

    }

    category() {
        const category = this.queryStr.category
       
     
        if(category) {
          
            this.query = this.query.find({category : category})
        }
    
       
        return this
    }



}

module.exports = ApiFeatures;




//note:-

// In Mongoose, the find() method returns a query object that represents a MongoDB query. This query object allows you to chain various query-building methods (such as find(), sort(), limit(), etc.) before executing the query using methods like exec().

// So, if this.query is indeed a Mongoose query object, then calling find() on it would work as expected, allowing you to further refine the query.


//example :-

// // Assume Product is a Mongoose model
// const query = Product.find(); // Returns a Mongoose query object
// query.find({ category: 'electronics' }); // Chaining find() method on the query object
// query.exec((err, products) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(products); // Array of products that match the query
// });
