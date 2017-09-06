var express = require('express');
var router = express.Router();
var clients = [{"username":"chel", "password":"123456", "amount":100},
         {"username":"jeff", "password":"123456", "amount":200},
         {"username":"geoff", "password":"123456", "amount":300},
		 {"username":"juan", "password":"123456", "amount":400},
		 {"username":"pedro", "password":"123456", "amount":500},
         ];

var r = express();
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.cookies['username'] != null ){
		res.redirect('/bank');
	}else{
		 res.render('index', { title: 'ATM APP' });
	}
 
});

router.post('/bank', function(req, res, next) {
	var login = false;
	var amount = 0;
	for(var x = 0; x<=clients.length - 1; x++){
		if((req.body.username == clients[x]['username']) && (req.body.password == clients[x]['password'])){
			login = true;
			amount = clients[x]['amount'];
			break;
		}
	}

	if(login == true){
		res.cookie('username', req.body.username);
		res.cookie('password', req.body.password);
		res.cookie('amount', amount);
		res.render('bank', {amount: amount, username: req.body.username});

	}else{
		res.send('Invalid username or password! <br /> <a href="/">Back to index</a>');
	}
 
});


router.get('/logout', function(req, res, next) {
	res.clearCookie('username');
	res.clearCookie('password');
	res.clearCookie('amount');
	res.redirect('/');
});


router.post('/deals', function(req, res, next) {
	if(req.body.withdraw == "Withdraw"){
		res.cookie('amount', parseInt(req.cookies['amount']) - parseInt(req.body.amount));	
		res.send('Thank you for banking with us! You withdrew ' + req.body.amount + '<br /><a href="/bank">Go Back</a>');
			for(var x = 0; x<=clients.length - 1; x++){
					if((req.cookies['username'] == clients[x]['username']) && (req.cookies['password'] == clients[x]['password'])){
						clients[x]['amount'] = parseInt(req.cookies['amount']) - parseInt(req.body.amount);
						break;
					}
				}

	
	}

	if(req.body.deposit == "Deposit"){
		res.cookie('amount', parseInt(req.cookies['amount']) + parseInt(req.body.amount));	
		res.send('Thank you for banking with us! You deposited ' + req.body.amount + '<br /><a href="/bank">Go Back</a>');

			for(var x = 0; x<=ulist.length - 1; x++){
				if((req.cookies['username'] == clients[x]['username']) && (req.cookies['password'] == clients[x]['password'])){
					clients[x]['amount'] = parseInt(req.cookies['amount']) - parseInt(req.body.amount);
					break;
				}
			}
	}

	// res.redirect('/bank');
	});




router.get('/bank', function(req, res, next) {
	if(req.cookies['username'] != null ){
		res.render('bank', {amount: req.cookies['amount'], username: req.cookies['username']});
	}else{
		 res.redirect('/');
	}
  
});

router.get('/users', function(req, res, next) {
  res.send('Number of Accounts: ' + clients.length + '<br /><br /> List </br /> ' + JSON.stringify(clients));
});

module.exports = router;
