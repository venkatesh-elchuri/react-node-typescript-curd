const express = require('express');
const cors = require('cors');
const utils = require('./utils/user');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
  
});

app.get('/user/list',(req,res)=>{
    const list = utils.getUserInfo();
    res.send({users : list});
});

app.post('/user/create',(req,res)=>{
    let userInfo = req.body;
    let {fname, lname, gender,mobile} = userInfo;
    console.log("userInfo",req.body,userInfo);
    if(fname && lname && gender && mobile){
        const list = utils.getUserInfo();
        //random value we can replace with serial later if need
        const newObj = {...userInfo,id : Math.floor(1000 + Math.random() * 9000)};
        list.unshift(newObj);
        utils.updateUsersList(list);
        res.send({user : newObj,success : true,msg : "User Created Successfully"});
    }else{
        res.status(400).send({error : true,msg : "Missing Required Data"});
    }
});

app.post('/user/update/',(req,res)=>{
    let userInfo = req.body;
    let {fname, lname, gender,mobile,id} = userInfo;
    if(fname && lname && gender && mobile && id){
        const list = utils.getUserInfo();
        let idx = list.findIndex((_item)=>{
            return _item.id === id;
        });
        const newObj =  {...list[idx],...userInfo}
        list[idx] = newObj;
        utils.updateUsersList(list);
        res.send({user : newObj,success : true,msg : "User updated successfully"});
    }else{
        res.status(400).send({error : true,msg : "Missing Required Data"});
    }
});

app.delete('/user/:id',(req,res)=>{
    let {id} = req.params;
    console.log("id",id)
    if(id){
        const list = utils.getUserInfo();
        let idx = list.findIndex((_item)=>{
           return _item.id === id;
        })
        list.splice(idx,1);
        utils.updateUsersList(list);
        res.send({success : true,msg : "User deleted successfully"});
    }else{
        res.status(400).send({error : true,msg : "Missing required Data"});
    }
});
  
app.listen(port, () => {
    console.log(`Server app listening on port ${port}!`)
});