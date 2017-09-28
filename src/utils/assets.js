var appIcons=
[
    { name: "unknown", iconUrl: "/assets/images/appIcons/unknown.png" },
    { name: "ssh", iconUrl: "/assets/images/appIcons/ssh.jpg" },  
    { name: "redis",  iconUrl: "/assets/images/appIcons/redis.png" },
    { name: "postgre", iconUrl: "/assets/images/appIcons/postgre.png" },
    { name: "rabbitmq", iconUrl: "/assets/images/appIcons/rabbitmq.png" },
    { name: "kafka", iconUrl: "/assets/images/appIcons/kafka.png" },
    { name: "mongodb", iconUrl: "/assets/images/appIcons/mongodb.jpg" },       
    { name: "mongo", iconUrl: "/assets/images/appIcons/mongodb.jpg" },       
    { name: "nexus", iconUrl: "/assets/images/appIcons/nexus.png" },                   
    { name: "portainer", iconUrl: "/assets/images/appIcons/portainer.png" },
    { name: "gitlab", iconUrl: "/assets/images/appIcons/gitlab.png" },
    { name: "jenkins", iconUrl: "/assets/images/appIcons/jenkins.png" },     
    { name: "mysql", iconUrl: "/assets/images/appIcons/mysql.jpg" },            
    { name: "elstack", iconUrl: "/assets/images/appIcons/elastic.jpg" },           
    { name: "elastic", iconUrl: "/assets/images/appIcons/elastic.jpg" },           

];

function getAppIcon(privatePort, containerName)
    {
        if (privatePort==22)
            containerName="ssh";

        //var appIcons=appIcons;
        var iconUrl="";
        for(var appIcon of appIcons)
        {
            var appName=appIcon.name;            
            if (containerName.indexOf(appName)>=0)
            {
                iconUrl=appIcon.iconUrl;
                break;
            }
        }

        if (iconUrl=="")
            iconUrl=getAppIcon(null, "unknown");

        return iconUrl;
    }

// exports
exports.getAppIcon=getAppIcon;
exports.appIcons=appIcons;
