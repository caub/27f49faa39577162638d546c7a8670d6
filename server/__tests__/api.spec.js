const passport = require('passport');

class MockStrategy extends passport.Strategy {
	constructor(...opts) {
		super(...opts);
		this.name = 'twitter';
	}
	authenticate(req) {
		this.success({
			id: req.user_id,
			email: req.email,
			screen_name: req.screen_name
		});
	}
}

