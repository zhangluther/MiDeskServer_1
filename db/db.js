const sqlite3=require('sqlite3').verbose();
const dbConfig=require('../config/database')

// console.log(dbConfig.dbPath);

class LogDatabase{ 
    constructor(){
        this.db=new sqlite3.Database(dbConfig.logDbPath,(err)=>{
            if(err){
                console.error('数据库连接失败: ',err);
            }else{
                console.log("成功连接数据库");
                this.initTable();
            }
        });
    }

    // 初始化表
    initTable(){
        const sql=`
        CREATE TABLE IF NOT EXISTS requests_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            method TEXT,
            url TEXT,
            headers TEXT,
            created_at DEFAULT CURRENT_TIMESTAMP
            );
        CREATE TABLE IF NOT EXISTS event_log(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_name TEXT,
            message TEXT,
            created_by TEXT,
            created_at DEFAULT CURRENT_TIMESTAMP
            )
        `;
        this.db.exec(sql,(err)=>{
            if(err){
                console.error('初始化表失败: ',err);
            }else{
                console.log("成功初始化表");
            }
        });
    }

    // 查询all
    queryAll(sql,paras=[]){
        return new Promise(
            (resolve,reject)=>{
                this.db.all(sql,paras,(err,rows)=>{
                    console.log('运行查询',sql,paras);
                    if (err) {
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                });
            });
         }
    
         
    // 增删改
    run(sql,paras=[]){
        return new Promise(
            (resolve,reject)=>{
                this.db.run(sql,paras,(err)=>{
                    console.log('运行操作',sql,paras);
                    if (err) {
                        reject(err);
                    }else{
                        resolve();
                    }
                });
            }
        );
    }

    // 记录request log
    logRequest(method,url,headers){
        const sql=`INSERT INTO requests_log (method,url,headers) VALUES (?,?,?)`;
        const paras=[method,url,JSON.stringify(headers)];
        this.run(sql,paras);
    }
    // 记录event log
    logEvent(eventName,message,createdBy){
        const sql=`INSERT INTO event_log (event_name,message,created_by) VALUES (?,?,?)`;
        const paras=[eventName,message,createdBy];
        this.run(sql,paras);
    }

}

module.exports=LogDatabase;
