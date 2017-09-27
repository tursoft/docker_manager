docker  =
{
    urls: {
        containers_url: "/containers/json"
    },

    servers: [ ]        
};

shared = {
    appName: "Docker Manager",
    showDebug: false,
}

server = {
    port: 8090
}

// read config from env
var serversText=process.env.TRSFT_DOCKER_SERVERS;
shared.showDebug=process.env.TRSFT_SHOW_DEBUG;
console.log("TRSFT_SHOW_DEBUG=", process.env.TRSFT_SHOW_DEBUG);    

if (serversText==undefined || serversText=="")
    serversText="[{ \"id\": \"localhost\", \"name\": \"localhost\", \"serverIp\": \"localhost\", \"apiPort\": \"4243\" }]";

if (serversText!=undefined && serversText!="")
{
    console.log("servers are loaded from ENV!");
    console.log("servers (raw): ", serversText);

    var servers=JSON.parse(serversText);  
    console.log("servers (parsed): ", servers);      
    docker.servers=servers;
} else
{
    console.log("TRSFT_DOCKER_SERVERS environment variable value is empty!");    
}

console.log("config.docker.servers: " + docker.servers); 


// exports ==============
exports.docker=docker;
exports.shared=shared;
exports.server=server;