var http = require("http");
var dockerUtils = require('./dockerUtils.js');
var Docker = require('dockerode');

var config={};

function init(newConfig)
{
    config=newConfig;
}

function getContainersAll(servers)
{
    var listPromise=[];
    var results=[];

    servers.forEach(function(server)
    {
        var promise=getContainers(server);                    
        promise=promise.then(function(containers)
        {
            var result={ 
                server: server,
                containers: containers,
                ports: dockerUtils.getContainerPortList(server, containers),
            };

            results.push(result);

            return containers;
        });

        listPromise.push(promise);
    });

    var promiseFinal=Promise.all(listPromise);
    return promiseFinal.then(function(result)
    {
        return results;
    });
};

function getContainers(server)
{
    return new Promise(function(resolve,reject) 
    {
        var url="http://" + server.serverIp + ":" + server.apiPort + config.docker.urls.containers_url;

        var docker = null;
        if (server.serverIp=="localhost")
            docker = new Docker({socketPath: '/var/run/docker.sock'});
        else            
            docker = new Docker({host: 'http://' + server.serverIp, port: server.apiPort});

        docker.listContainers(function (err, containers) {
            if (err!=null)
                reject(err);
            else
                resolve(containers);
        });

        // http.get(url, function(res)
        // {
        //     var body = '';
            
        //     res.setEncoding('utf8');
        //     res.on('data', function(chunk)
        //     {
        //         body += chunk;
        //     });

        //     res.on('end', function(){
        //         var json = JSON.parse(body);
        //         //console.log("Got a response: ", json);
        //         resolve(json); //{ server: server, containers: json });
        //     });

        // })
        // .on('error', function(e){
        //     console.log("Got an error: ", e);
        //     reject(e);
        // })
        // .end();
    });
}


// exports ============
exports.init=init;
exports.getContainersAll=getContainersAll;
exports.getContainers=getContainers;