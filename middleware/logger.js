// const logger=(req,res,next)=>{
//     const timestamp=new Date().toISOString();
//     console.log(`${timestamp}\\t${req.method}\t${req.url}\t${req.headers['user-agent']}`);
//     next();
// }

function logger(req,res,next){
    const timestamp=new Date().toISOString();
    console.log(`${timestamp}\\t${req.method}\t${req.url}\t${req.headers['user-agent']} !`);
    next();
}

module.exports=logger;

