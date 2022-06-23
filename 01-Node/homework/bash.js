 const commands = require('./commands/index.js')
 
 // Output un prompt
  process.stdout.write('Henry > ');
  // El evento stdin 'data' se dispara cuando el user escribe una línea
  process.stdin.on('data', function (data) {
    var args = data.toString().trim().split(' '); //.trim() remueve la nueva línea y .split() crea un array
    var cmd = args.shift() ;  // .shift saca el primer elemento del [] de ARGS y lo devuelve en CMD 
    if(commands.hasOwnProperty(cmd)) {
      commands[cmd](args) ; // retorna la funcion del objeto commands, ejecutala y recibí los args
    } else {
      process.stdout.write(`${cmd} COMMAND NOT FOUND`);
    }
    // if (cmd==='date'){ 
    //   process.stdout.write(Date())
    // }
    // if (cmd==='pwd'){
    //   process.stdout.write(process.cwd())
    // }
    process.stdout.write('\nHenry > ');
  });
  