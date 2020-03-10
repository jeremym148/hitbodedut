const R = require('ramda');

module.exports = {

    groupProductsbyCategories : R.groupBy(m => m.category),

    groupProductsBySku : R.groupBy(m => m.sku),
    
    renameKeys : R.curry((keysMap, obj) =>
        R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj))
    ),

    escape: (str) =>{
        if( str == null){
            return null
        }
        if (typeof(str) == "string") {
            return `'${str.replace(/'/g, "''")}'`
        }

        return str
    },

    promiseAll:  (promises) => {
        promises.map(promise => promise.catch(err => 
          console.log(err)))
        return Promise.all(promises)
    },

    promiseTimeout: (ms, promise) => {

        // Create a promise that rejects in <ms> milliseconds
        let timeout = new Promise((resolve, reject) => {
          let id = setTimeout(() => {
            clearTimeout(id);
            resolve('Timed out in '+ ms + 'ms.')
          }, ms)
        })
      
        // Returns a race between our timeout and the passed in promise
        return Promise.race([
          promise,
          timeout
        ])
      },

    capitalizeFirstLetter: (str) => {
      if (str && str != ''){
        return str[0].toUpperCase() + str.slice(1);
      }
      return str;
    },
    convertToArray: (x) => {
      if(!x){return []}
      if(Array.isArray(x)){
        return x;
      }else if(x.includes(";")){
        return x.split(";")
      }
      return [x];
    },
    extractUniqElement: (x) => {
      if(Array.isArray(x) ){
        if (x.length == 1){
          return x[0];
        }
        return undefined;
      }
      return x;
    }

}