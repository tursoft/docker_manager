function getContainerName(containerName)
{
    var result=containerName;
    if (result.substring(0, 1) == "/")
    {
        result = result.substring(1);
    }        

    return result;        
}

function getContainerPortList(server, containers)
{
    var results=[];
    containers.forEach(function(container) 
    {            
        if (container.State!="running")
            return;

        container.Ports.forEach(function(port)
        {
            if (port.PublicPort==null)
                return;

            var link="http://" + server.serverIp + ":" + port.PublicPort;

            results.push({ 
                server: server,
                publicPort: port.PublicPort,
                privatePort: port.PrivatePort,
                type: port.Type,
                containerName: getContainerName(container.Names[0]),
                link:  link
            }); 
        });            
    });

    results=results.sort(function(o1, o2)
    {
        return o1.publicPort-o2.publicPort;
    });

    return results;
}



exports.getContainerName=getContainerName;
exports.getContainerPortList=getContainerPortList;