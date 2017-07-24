var express=require('express');
var mysql=require('mysql');
var router=express.Router();
var fs=require('fs');
var formidable=require('formidable');


var pool=mysql.createPool({
	host:'localhost',//localhost
	user:'root',   //用户名
	password:'root',    //密码
	database:'obs', //数据库
	port:8889
});
router.get('/text',function(req,res){
	res.header("Access-Control-Allow-Origin", "*")
	pool.query('SELECT * from home', function(err, rows, fields) {
  	if (err) throw err;
 	res.send(rows)
	});
});
router.get('/navlists',function(req,res){
	res.header("Access-Control-Allow-Origin", "*")
	pool.query('SELECT * from navlist', function(err, rows, fields) {
  	if (err) throw err;
 	res.send(rows)
	});
});
// router.post("/imgs",function(req,res){
// 	res.header("Access-Control-Allow-Origin","*")
// 	//创建文件核心对象
// 	var form=new formidable.IncomingForm();
// 	//声明图片存放路径
// 	form.uploadDir="public/images";
// 	form.parse(req,function(err,fields,files){
// 		//files 等同于前端传递过来的图片信息 是一个对象
// 		// var file=files;
// 		// console.log(files)
// 		// console.log(fields)

// 		// var Fname=new Date().getTime();
// 		// switch(file.type){
// 		// 	case "image/jpeg":Fname=Fname+"jpg";
// 		// 	break;
// 		// 	case "image/png":Fname=Fname+"png";
// 		// 	break;
// 		// }
// 		// //创建图片路径名
// 		// var newPath="public/images"+Fname;
// 		// //新旧路径名替换
// 		// fs.renameSync(file.path,newPath)
// 		// //发送
// 		console.log(files)
// 		res.send(files)

// 	})

// })


router.post('/imgs',function(req,res){
	res.header("Access-Control-Allow-Origin", "*"); //跨域
	//创建进来的形式 核心对象
	var form = new formidable.IncomingForm();
	//声明图片存放位置
	form.uploadDir='public/images';
	//解析数据 
	form.parse(req,function(error,fields,files){
		console.log(error)
 		//files 等同于前端传递过来的图片信息 是一个对象
		for(var i in files){
			var file = files[i];
			var fName = new Date().getTime()
			switch(file.type){    //检测图片的格式
				case "image/jpeg":
				fName=fName+".jpg";
				break;
				case "image/png":
				fName=fName+".png";
				break;
			}
			//创建图片路径名
			var newPath='public/images'+fName;
			//新旧路径名替换
			fs.renameSync(file.path,newPath);
			//发送
			res.send(newPath);   
		}
		
	})
});
module.exports=router;
