const express = require('express');
const app = express();
const User = require('./models/users')
//boder parser
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
//JWT token
const jwt = require('jsonwebtoken')
jwtKey = "jwt123";
//mongoose connection
const mongoose = require('mongoose')
const dbUrl = 'mongodb+srv://palprem:prem@123@cluster0.llozo.mongodb.net/node-tuts?retryWrites=true&w=majority'

//
const cors = require('cors')
app.use(cors())

mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log("DB connected");
	}).catch((error) => console.log("error"))


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
app.get("/", (req, res) => {
	User.find().then((result) => {
		res.send(result)
	}).catch(err => console.log(err))
})
//Login
app.post('/login', jsonParser, (req, res) => {
	User.findOne({ email: req.body.email })
		.then((data) => {
			if(data!=null){
				console.log("wellcome",data)
				res.status(200)
				// res.end("Wellcone!")
				// if (req.body.password===data.email && req.body.password==data.password) {
				// 	// jwt.sign({ data }, jwtKey, { expiresIn: '300s' }, (err, token) => {
				// 		jwt.sign({ data }, jwtKey,  (err, token) => {
				// 		res.status(200).json({ token })
				// 	})
				// }
			}
			else{
				console.log("wellcome!!**!!",data)
				res.status(401)
				res.end("Wellcone!")
			}
			// var resPassword = data.password;
			// if (resPassword == req.body.password) {
			// 	jwt.sign({ data }, jwtKey, { expiresIn: '300s' }, (err, token) => {
			// 		res.status(200).json({ token })
			// 	})
			// }
		})
		.catch(err=>console.log("err", err))
})

// {
//     name: req.body.name,
//     email: req.body.email,
//     address: req.body.address,
//     password: req.body.password
// }

// POST API for posting for data
app.post("/register", jsonParser, (req, res) => {
	const token = jwt.sign({ req:req.toString() }, jwtKey);
	console.log("token", token)

	// const data = new User(
	// 	{
	// 		name: req.body.name,
	// 		email: req.body.email,
	// 		address: req.body.address,
	// 		password: req.body.password
	// 	}
	// )
	// console.log(">>", req.body)
	// data.save()
	// .then((result) => {
	// 	if(result!=null){
	// 		console.log("wellcome",result)
	// 		res.status(200)
	// 		res.end("welcome")
	// 	}
	// 	else{
	// 		console.log("wellcome!!**!!",result)
	// 		res.status(401)
	// 	}
	// })
	// .catch(err=>console.log("err", err))
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

app.listen(5000)