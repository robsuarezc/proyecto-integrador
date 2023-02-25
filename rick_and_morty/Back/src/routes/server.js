const http = require("http");
const characters = require('../utils/data.js');

const PORT = 3001

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.url.includes('rickandmorty/character')){
        let id = req.url.split('/').at(-1)
    

    let chracterFilter = characters.filter(charac => charac.id === Number(id));
    res.writeHead(200, {"Content-Type" : "application/json"})
    res.end(JSON.stringify(characterFilter[0]))
    }


}).listen(PORT, "localhost");