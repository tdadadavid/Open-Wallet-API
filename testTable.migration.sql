# <!-- CREATE DATABASE -->
CREATE DATABASE if not exists test_openWallet;

# <!-- CREATE test_users table -->
 CREATE TABLE if not exists test_users (
    `id` INT NOT NULL UNIQUE PRIMARY KEY,
    `firstname` VARCHAR(30) NOT NULL,
    `lastname` VARCHAR(30) NOT NULL,
    `email` VARCHAR(320) NOT NULL UNIQUE
);


# <!-- CREATE test_user_token -->
CREATE TABLE if not exists test_users_tokens (
    `user_id` INT NOT NULL UNIQUE,
    `refresh_token` VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES test_users (id) ON DELETE CASCADE ON UPDATE CASCADE
);


