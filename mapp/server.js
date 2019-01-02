

var http = require('http');
var fs   = require('fs');
var path = require('path');
var mime = require('mime');


//缓存 减少io
var cache = {};

//创建服务
var server=http.createServer(function(req,res){
    var filepath = false;
    switch (req.url){
        case '/': 
            filepath = 'index.html';
            break;
        default: 
            filepath = `..${req.url}`;
            break;
    }

    console.log(filepath);



    var abspath = filepath;
    serverStatic(res,cache,abspath);
});
//开启服务
server.listen(3000,function(){
    console.log('localhost:3000 server is started');
})





function rend404(response){
    response.writeHead(404,{"Content-Type":'text/plain'});
    response.write('ERROR:404 source not found.');
    response.end();
}

//文件数据服务
function rendFile(response,filePath,fileContents){
    log('render----'+filePath);
    response.writeHead(200,{"Content-Type":mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}


//提供静态文件服务
function serverStatic(response,cache,absPath){
    if(cache[absPath]){//检查文件是否在缓存中
        log('在缓存中--'+absPath);
        rendFile(response,absPath,cache[absPath]);
    }else{//不在缓存中
        fs.exists(absPath,function(exists){//检查文件是否存在
            if(exists){//存在

                console.log('3222',exists)

                fs.readFile(absPath,function(err,data){//读取文件
                    if(err){//读取失败
                        log('读取失败--'+absPath);
                        rend404(response);
                    }else{//读取成功
                        cache[absPath] = data;  //添加数据到缓存
                        rendFile(response,absPath,data);
                    }
                })
            }else{//不存在
                log('不存在--'+absPath);
                rend404(response);

            }
        });


    }

}



function log(msg){
    console.log(msg);
}