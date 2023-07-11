let socket=undefined;
let io=require("socket.io-client").io;

module.exports={
    init:(route)=>{
        socket=io(route);
        return socket;
    },
    getSocket:()=>{
        if(socket===undefined){
            socket=io("https://projectbackend-production-088c.up.railway.app/");
            return socket;
        }
        return socket;
    },
}
