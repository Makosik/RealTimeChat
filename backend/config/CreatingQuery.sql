create table users(
	id serial PRIMARY KEY,
	name VARCHAR(100),
	password VARCHAR(100)
   );
				   
create table channels(
	id serial PRIMARY KEY,
	title VARCHAR(30),
	isActive BOOLEAN DEFAULT TRUE,
	user_id integer REFERENCES users(id) ON DELETE CASCADE
   );
	
create table channel_user(
	id serial PRIMARY KEY,
   UNIQUE(channel_id, user_id),
	channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
	user_id integer REFERENCES users(id)ON DELETE CASCADE
);

create table message(
	id serial PRIMARY KEY,
   created_at TIMESTAMP DEFAULT NOW(),
	channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
	user_id integer REFERENCES users(id),
	content text
);



drop table channel_user;