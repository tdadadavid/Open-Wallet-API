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
# <!-- DELETE this table -->
CREATE TABLE if not exists test_users_tokens (
    `user_id` INT NOT NULL UNIQUE,
    `refresh_token` VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES test_users (id) ON DELETE CASCADE ON UPDATE CASCADE
);


# <!-- Alter test_users table -->
ALTER TABLE test_users ADD COLUMN `token` VARCHAR(255) NOT NULL UNIQUE;

# <!-- Alter test_users table -->
ALTER TABLE test_users ADD COLUMN `password` VARCHAR(120) NOT NULL;

# <!-- Alter test_users table -->
ALTER TABLE test_users MODIFY COLUMN `id` VARCHAR(30) NOT NULL UNIQUE;

# <!-- Alter test_users table -->
ALTER TABLE test_users MODIFY COLUMN `token` VARCHAR(255) UNIQUE;

# <!-- Drop the test_users_tokens table -->
DROP TABLE test_users_tokens;

# <!-- Create the wallet table -->
CREATE TABLE if not exists test_openWallet.test_wallets (
    `id` VARCHAR(16) NOT NULL UNIQUE PRIMARY KEY,
    `currency` VARCHAR(3) NOT NULL ,
    `amount` DECIMAL(9, 4) NOT NULL,
    `user_id` VARCHAR(30) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES test_users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


# <!-- Alter test_wallets -->
ALTER TABLE test_openWallet.test_wallets MODIFY COLUMN `currency` VARCHAR(6) NOT NULL;
