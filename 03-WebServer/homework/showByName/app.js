var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
const host = '127.0.0.1';
const port = 1337;

const server = http.createServer((req,res)=>{
    fs.readFile(`./images${req.url}.jpg`,(error, data) =>{
        if (error){
            res.writeHead(404,{'Content-Type':'text/plain'});
            res.write('Imagen no encontrada');
        }else{
            res.writeHead(200,{'Content-Type':'image/jpeg'})
            res.write(data)
        }
        res.end()
    })
});

server.listen(port,host,()=>{
    console.log('servidor funcionando en', host, port)
});