let socket=undefined;
let io=require("socket.io-client").io;

module.exports={
    init:(route)=>{
        socket=io(route);
        return socket;
    },
    getSocket:()=>{
        if(socket===undefined){
            socket=io("https://chatdotbackend.herokuapp.com");
            return socket;
        }
        return socket;
    },
}
