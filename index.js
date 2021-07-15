const express = require('express');
const app = express();
const User = require('./models/users')
//boder parser
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
//JWT token
const jwt = require('jsonwebtoken')
jwtKey = "jwt";
//mongoose connection
const mongoose = require('mongoose')
const dbUrl = 'mongodb+srv://palprem:prem@123@cluster0.llozo.mongodb.net/node-tuts?retryWrites=true&w=majority'

mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log("DB connected");
	}).catch((error) => console.log("error"))

// User.find({}, function(err, users){
//     if(err) console.log(err)
//     console.log(users)
// })
//varify token
const verifyToken=(req, res, next)=>{
	const bearerHeader = req.headers['authorization'];
	
	if(typeof bearerHeader !== 'undefined'){
		// const bearer = bearerHeader.split(' ')
		req.token=bearerHeader;
		console.log(bearerHeader)
		jwt.verify(req.token, jwtKey, (err, authData)=>{
			if(err){
				res.json({result: err})
			}
			else{
				next();
			}
		})
	}
	else{
		res.send("result:Token not provided!")
	}
}
//fetch all users
app.get("/", verifyToken, (req, res) => {
	User.find().then((result) => {
		// console.log(result);
		res.send(result)
	}).catch(err => console.log(err))
})
//Login
app.post('/login', jsonParser, (req, res) => {
	User.findOne({ email: req.body.email })
		.then((data) => {
			var resPassword = data.password;
			if (resPassword == req.body.password) {
				jwt.sign({ data }, jwtKey, { expiresIn: '300s' }, (err, token) => {
					res.status(200).json({ token })
				})
			}
		})
})

// {
//     name: req.body.name,
//     email: req.body.email,
//     address: req.body.address,
//     password: req.body.password
// }

// POST API for posting for data
app.post("/register", jsonParser, (req, res) => {
	const data = new User(req.body)
	console.log(">>", req.body.name)
	data.save().then((result) => {
		console.log("data saved")
		res.status(201).json(result)
	})
		.catch((error) => console.log(error))
});

//DELETE  user
app.delete('/del/:id', (req, res) => {
	User.deleteOne({ _id: req.params.id }).then((result) => {
		console.log("data deleted")
		res.status(200).json(result)
	}).catch(err => console.log("err"))
})
//UPADTE user
app.put("/upadte/:id", (req, res) => {
	User.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } })
		.then((result) => {
			console.log(result)
		}).catch(err => console.log(err))
})

app.listen(4000)