var express = require("express");
var http = require("http");

var assets = require('../utils/assets.js');
var utils = require('../utils/utils.js');
var dockerUtils = require('../utils/dockerUtils.js');
var apiProxy = require('../utils/apiProxy.js');
var config = require('../utils/config.js');

var router =express.Router();


apiProxy.init(config);

var imports = {
    utils       : utils
};


function showErrorPage(res, err)
{
    console.error("error occured!", err); 

    res.render("pages/errors/error", 
    { 
        error: JSON.stringify(err)
    });
}

// home
router.get("/", function(req, res)
{
    try 
    {
        var promiseContainers=apiProxy.getContainersAll(config.docker.servers);
        promiseContainers.then(function(servers) 
        {
            console.log("servers: " + servers);

            res.render("pages/index", 
            { 
                title: "Home Page",
                imports : imports,
                assets: assets,
                data    : { 
                    config: config,
                    servers: servers,
                    ports_cols: [ 
                        { name: "publicPort" }, 
                        { name: "privatePort" }, 
                        { name: "type" }, 
                        { name: "containerName"}
                    ],
                }
            });
        }).catch(function(err)
        {
           showErrorPage(res, err);
        });
    } catch(err)
    {
        showErrorPage(res, err);
    }
   
});

router.get('*', function(req, res)
{
    res.render("pages/errors/pagenotfound", 
    { 
        
    });
   //res.send('Page not found!', 404);
});

module.exports=router;