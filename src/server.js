const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const connectString = 'postgres://sgamunromkdkca:cc35b6de78518ac0cf5c49a26556b51071e31d2c32dd27db979c5364d4758fae@ec2-3-211-245-154.compute-1.amazonaws.com:5432/d8fs9n89obo6ni'

const db = new Sequelize(connectString,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // 
          },
        }
});

const  ThirdParty = db.define('thirdparty', {
    loan_id: {
      type: DataTypes.INTEGER ,
    },
    loan_amount: {
      type: DataTypes.INTEGER,
    },
    loan_date: {
      type: DataTypes.DATE 
    },
    TranctionId: {
        type : DataTypes.STRING 
    }
  });

  const app = express();
app.use(express.json());

app.post('/data', async(req,res)=>{
    const {loan_id,loan_amount,loan_date,TranctionId}= req.body;
    if(loan_amount && loan_date && loan_date){
        const  newParty = await ThirdParty.create({
            loan_amount:loan_amount,
            loan_date:loan_date,
            loan_id:loan_id,
            TranctionId:TranctionId
          });
          console.log(newParty);
          res.send(TranctionId);
    }
    else{ 
        res.send({error:"Their is no Data"});
     }
   });

db.sync({ force: true }).then(()=>{
    console.log("starting server");
    app.listen(7998);
  }).catch(e=>{
      console.log('failed to sync dataBase',e);
  });