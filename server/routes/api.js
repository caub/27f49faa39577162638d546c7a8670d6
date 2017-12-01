const router = require('express').Router();

router.use(require('body-parser').json());

router.get('/connect', (req, res) => {
	req.twit.get('account/verify_credentials', {include_email: 1, skip_status: 1})
		.then(user => {
			/*
				id: user.id_str, // use id_str because bigInteger
				email: user.email,
				username: user.screen_name,
				name: user.name,
				avatar: user.profile_image_url_https || user.profile_image_url,
			*/
			// todo cache it in redis
			res.json(user);
		})
		.catch(err => res.status(403).json(err));
});


router.get('/profile/:id?', (req, res) => {
	req.twit.get('users/show', {user_id: req.params.id || req.session.user_id})
		.then(data => res.json(data))
		.catch(err => res.status(403).json(err));
});

router.get('/tweets', (req, res) => {
	req.twit.get('statuses/home_timeline', {count: 100, trim_user: 1})
		.then(data => res.json(data))
		.catch(err => res.status(403).json(err));
});

router.get('/tweets/:id', (req, res) => {
	req.twit.get('statuses/show/' + req.params.id)
		.then(data => res.json(data))
		.catch(err => res.status(403).json(err));
});

router.post('/tweets', (req, res) => {
	req.twit.post('statuses/update', req.body)
		.then(data => res.json(data))
		.catch(err => res.status(400).json(err));
});

router.delete('/tweets/:id', (req, res) => {
	req.twit.post('statuses/destroy/' + req.params.id)
		.then(data => res.json(data))
		.catch(err => res.status(403).json(err));
});

module.exports = router;
