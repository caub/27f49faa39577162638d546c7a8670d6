/**
 * init tables:
 * - users: all user accounts
 * - tweets: user tweets
 *
 * - sessions: for our express-sessions
 */
exports.up = async knex => {
	await knex.schema.createTable('users', table => {
		table.bigInteger('id').primary();
		table.text('email').notNullable().unique();
		table.text('username').notNullable().unique();
		table.text('name');
		table.text('avatar');

		table.text('token');
		table.text('token_secret');

	});

	// username/email case-insensitive unique
	await knex.schema.raw('CREATE UNIQUE INDEX IF NOT EXISTS username_idx ON users(lower(username))');
	await knex.schema.raw('CREATE UNIQUE INDEX IF NOT EXISTS email_idx ON users(lower(email))');

	await knex.schema.createTable('tweets', table => {
		table.bigInteger('id').primary();
		table.bigInteger('user_id').references('users.id').onDelete('CASCADE');
		table.text('text');

		// todo in_reply_to...
	});

	await knex.schema.createTable('sessions', table => {
		table.text('id').primary();
		table.bigInteger('user_id').references('users.id').onDelete('CASCADE').index();
		table.json('cookie');
		table.timestamp('expire').defaultTo(knex.raw(`NOW() + interval '1w'`)).index();
	});
};

exports.down = async knex => {
	await knex.schema.dropTable('tweets');
	await knex.schema.dropTable('sessions');
	await knex.schema.dropTable('users');
};
