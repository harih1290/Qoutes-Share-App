var express = require('express');
const fs = require('fs');
const fss = require('fs');
const path = require('path');
var router = express.Router();
var data=require("/Users/harih/NodesApp/Nodesapi/myExpressApp/resource/data.json");
var val=false;

/* GET home page. */

var bodyParser = require('body-parser');  
const { json } = require('express');
var app = express();
app.use(express.static('public'));  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/get',function(req,res){
  val=false;
  var reqis=req.query.uqid;
  let rawdataa=fs.readFileSync('/Users/harih/NodesApp/Nodesapi/myExpressApp/resource/data.json');
  let students = JSON.parse(rawdataa);
  res.send(students[reqis-1]);
  // for(i=0;i<data.length;i++){
  //   if(data[i].uqid==reqis){
  //     val= true;  
  //     res.send(data[i])
  //   }    
  // } 
  // res.send("error")
    
});
router.post('/', function (req, res) {  
  // Prepare output in JSON format   
  var tlen=data.length+1;
  var sdata=JSON.stringify(req.body);
  var ssdata=data.push(sdata[0]); 
  let rawdata = fs.readFileSync('/Users/harih/NodesApp/Nodesapi/myExpressApp/resource/data.json');
  let student = JSON.parse(rawdata);
  let psval=JSON.parse(sdata);
  psval.uqid=""+tlen;
  student.push(psval);
  let wit = fss.writeFileSync('/Users/harih/NodesApp/Nodesapi/myExpressApp/resource/data.json',JSON.stringify(student));//, 'utf-8');
  //let wit=fss.writeFileSync(path.resolve(__dirname, data), JSON.stringify(student));
  
  res.end(JSON.stringify(psval.uqid));//sdata[0].uqid);  
})  
module.exports = router;
