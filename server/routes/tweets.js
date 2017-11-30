const router = require('express').Router();

router.use(require('body-parser').json());

router.all('*', (req, res, next) => {
	if (!req.session.user_id) {
		return res.status(403).send('Not signed in');
	}
	next();
});

router.search('/', (req, res) => {
	req.twit.get('statuses/home_timeline', {count: 100, trim_user: 1}, (err, data) => {
		res.json(data);
	});
});

router.get('/:id', (req, res) => {
	req.twit.get('statuses/show/' + req.params.id, (err, data) => {
		res.json(data);
	});
});

router.post('/', (req, res) => {
	req.twit.post('statuses/update', req.body, (err, data) => {
		if (err) {
			return res.status(400).json(err);
		}
		res.json(data);
	});
});

router.delete('/:id', (req, res) => {
	req.twit.post('statuses/destroy/' + req.params.id, (err, data) => {
		if (err) {
			return res.status(403).json(err);
		}
		res.json(data);
	});
});

module.exports = router;
