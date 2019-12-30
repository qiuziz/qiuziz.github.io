/*
 * @Author: qiuziz
 * @Date: 2017-06-14 16:36:44
 * @Last Modified by: qiuziz
 * @Last Modified time: 2017-06-15 14:29:26
 */


var express = require("express"),
	router = express(),
	connect = require("../utils/db.js");

router.get("/", (req, res) => {
  connect((err, db) => {
		//连接到表 dishes
		var collection = db.collection('dishes');
		
		//查询数据库
		collection.findOne({}, {_id: 0}, function(err,doc){
			if (err) {
				console.log(err);
			  db.close();
        res.status(502).send('fetch error')
				return;
			}
			db.close();
			res.send(doc);
		})
	})
})

router.post("/", (req, res) => {
  connect((err, db) => {
		//连接到表 user
		// var USER = db.collection('user');
		//查询数据库
		// USER.findOne({user: req.body.user}, function(err,doc){
		// 	if (err) {
		// 		console.log(err);
		// 	  db.close();
    //     res.status(502).send('fetch error')
		// 		return;
		// 	}
		// 	db.close();
			if (req.body.auth === '1604') {
					//保存菜谱
				var DISH = db.collection('dishes');
				DISH.save({_id: 1, dishes: req.body.dishes}, function(err,result){
					if (err) {
						console.log(err);
						db.close();
						res.status(502).send('fetch error')
						return;
					}
					db.close();
					res.send(result);
				})
			} else {
				res.status(403).send({msg: '身份验证失败'});
			}
		// })
	
	})
})

module.exports = router