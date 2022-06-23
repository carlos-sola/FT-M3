const operation = (num1,num2, callback) =>{
    const result = num1*num2;
    return setTimeout(()=>{
        callback(result)
    }, 2000)
};

operation(24, 6,(result)=>{
    console.log(result)
})
   