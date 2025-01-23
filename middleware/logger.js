const logDB=require('../db/db')
// const logger=(req,res,next)=>{
//     const timestamp=new Date().toISOString();
//     console.log(`${timestamp}\\t${req.method}\t${req.url}\t${req.headers['user-agent']}`);
//     next();
// }

function reqLogger(req,res,next){
    const timestamp=new Date().toISOString();
    console.log(`${timestamp}\t${req.method}\t${req.url}`);
    console.log(JSON.stringify(req.headers, null, 2));
    const db=new logDB();
    db.logRequest(req.method,req.url,req.headers);
    next();
}

function serverLogger(message, eventName='server start',by='server'){
    const timestamp=new Date().toISOString();
    console.log(`${timestamp}\t${message}`);
    const db=new logDB();
    db.logEvent(eventName,message,by);
}

module.exports={
    reqLogger,
    serverLogger
};

