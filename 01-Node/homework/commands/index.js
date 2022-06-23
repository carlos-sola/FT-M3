const fs = require('fs');

module.exports = {
   date : function(){
       process.stdout.write(Date())
   },
   pwd : function(){
       process.stdout.write(process.cwd())
   },
   ls : function(){
       fs.readdir('.' , function(err,files){  //readdir lee el directorio, el indice de archivos
           if (err) throw err; 
           files.forEach( function(files){
            process.stdout.write(files.toString() + "\n")
           })
           process.stdout.write('prompt >')
       })
   },
   echo : function(args){
       process.stdout.write(args.join(' ')); //recibe los args y retorna el array de argumentos joineados  
   },
   cat : function(args){
       fs.readFile(args[0],function(err, data){
           if (err) throw err ;
           process.stdout.write(data) ;
           process.stdout.write('prompt >')
       })
   },
   head : function(args){
       fs.readFile(args[0], "utf-8", function(err,data){
           if (err) throw err;         //recibo un command "head" y un argumento (nombre archivo)
           const firtsLines = data.split('\n').slice(0,10); // el arg es un array de 1 solo elemento
           process.stdout.write(firtsLines.join('\n')); // leo el archivo y spliteo las primeras 10 lineas,
           process.stdout.write('prompt >'); // las devuelvo por output joineadas 
       })
   },
   tail : function(args){
       fs.readFile(args[0], 'utf-8', function (err,data){
           if (err) throw err; 
           const lastLines = data.split('\n').slice(-10);
           process.stdout.write(lastLines.join('\n'));
           process.stdout.write('prompt >');
       })

   }
 }