CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(255) NOT NULL,
  password      VARCHAR(255) NOT NULL,
  first_name    VARCHAR(255) NOT NULL,
  last_name     VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE nutrition (
  id                SERIAL PRIMARY KEY,
  name              VARCHAR(255) NOT NULL,
  category          VARCHAR(255) NOT NULL,
  calories          INTEGER NOT NULL,
  image_url         VARCHAR(255) CHECK (image_url IS NULL OR POSITION ('http://' IN image_url) > 0),
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id           INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE exercise (
  id                SERIAL PRIMARY KEY,
  name              VARCHAR(255) NOT NULL,
  category          VARCHAR(255) NOT NULL,
  duration          INTEGER NOT NULL,
  intensity         INTEGER NOT NULL,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id           INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE sleep (
  id                SERIAL PRIMARY KEY,
  start_time        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id           INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);



