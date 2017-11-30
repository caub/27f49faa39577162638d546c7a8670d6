const {knex} = require('../config');

/* cols:
- id
- email
- username
- name
- avatar
*/


/**
 * get user by id/username/email
 * @param  {*} options.id
 * @param  {*} options.username
 * @param  {*} options.email
 */
const getUser = ({id, username, email}) => knex('users')
	.whereRaw('id=? OR LOWER(username)=LOWER(TRIM(?)) OR LOWER(email)=LOWER(TRIM(?))', [id, username, email])
	.limit(1)
	.then(rows => rows[0]);

exports.get = getUser;


/**
 * get (or create) from oauth2 endpoint
 * @param {*} userObj: { email, avatar, name, .. }
 */
exports.signin = async userObj => {
	const user = await getUser(userObj);

	if (user) {
		return user;
	}
	return knex.raw(`INSERT INTO users (id, username, name, email, avatar, token, token_secret)
		VALUES(:id, :username, :name, :email, :avatar, :token, :tokenSecret)
		ON CONFLICT (id)
		DO UPDATE SET 
			username = EXCLUDED.username,
			name = EXCLUDED.name,
			email = EXCLUDED.email,
			avatar = EXCLUDED.avatar,
			token = EXCLUDED.token,
			token_secret = EXCLUDED.token_secret
		RETURNING *
	`, userObj).then(({ rows }) => rows[0]);
};
