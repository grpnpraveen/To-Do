const mongodb=require("mongodb")
const MongodbClient=mongodb.MongoClient;
const ObjectID=mongodb.ObjectId;
const dbname="crud_mongodb";
const url="mongodb://localhost:27017";
const mongoOptions={useNewUrlParser:true};

var state={
db:null
};

const connect=(cb)=>{
    if(state.db)
    {
        cb();
    }
    else{
        MongodbClient.connect(url,mongoOptions,(err,client)=>{
            if(err)
            {
                cb(err);
            }
            else{
                state.db=client.db(dbname);
                cb();
            }
        });
    }
};

const getPrimaryKey=(_id)=>{
    return ObjectID(_id);
};

const getDB=()=>{
    return state.db;
};

module.exports={getDB,connect,getPrimaryKey};