CREATE DATABASE if not exists test_openWallet;

# <!-- TABLE CREATION -->

# <!-- CREATE test_users table -->
CREATE TABLE if not exists users (
  `id` VARCHAR(30) NOT NULL UNIQUE PRIMARY KEY,
  `firstname` VARCHAR(30) NOT NULL,
  `lastname` VARCHAR(30) NOT NULL,
  `email` VARCHAR(320) NOT NULL UNIQUE,
  `token` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(120) NOT NULL
);


# <!-- Create wallet table -->
CREATE TABLE if not exists wallets (
    `id` VARCHAR(16) NOT NULL UNIQUE PRIMARY KEY,
    `currency` VARCHAR(6) NOT NULL ,
    `amount` DECIMAL(12, 4) NOT NULL,
    `user_id` VARCHAR(30) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


# <!-- Create deposits table -->
CREATE TABLE if not exists deposits (
     `id` VARCHAR(18) NOT NULL UNIQUE PRIMARY KEY ,
     `amount` DECIMAL(13,4) NOT NULL,
     `source_wallet` VARCHAR(16) NOT NULL,
     `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (source_wallet) REFERENCES wallets(id) ON DELETE CASCADE ON UPDATE CASCADE
);


# <!-- Create deposits table --> (don't use).
CREATE TABLE if not exists withdrawals (
    `id` VARCHAR(18) NOT NULL UNIQUE PRIMARY KEY ,
    `amount` DECIMAL(13,4) NOT NULL,
    `source_wallet` VARCHAR(16) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_wallet) REFERENCES wallets(id) ON DELETE CASCADE ON UPDATE CASCADE
);


# <!-- Create deposits table --> (don't use).
CREATE TABLE if not exists transfers (
  `id` VARCHAR(18) NOT NULL UNIQUE PRIMARY KEY ,
  `amount` DECIMAL(13,4) NOT NULL,
  `source_wallet` VARCHAR(16) NOT NULL,
   `source_wallet_currency` VARCHAR(6) NOT NULL,
  `destination_wallet` VARCHAR(16) NOT NULL,
  `destination_wallet_currency` VARCHAR(6) NOT NULL,
  `converted_amount` DECIMAL(13,4) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (source_wallet) REFERENCES wallets(id) ON DELETE CASCADE ON UPDATE CASCADE
);


# <!-- Triggers creation -->


# <!-- Deposits trigger -->
CREATE TRIGGER deposits_after_insert
    AFTER INSERT ON deposits FOR EACH ROW

BEGIN
    UPDATE wallets
        SET wallets.amount = wallets.amount + NEW.amount
        WHERE wallets.id = NEW.source_wallet;
end;


# <!-- Withdrawals trigger -->
CREATE TRIGGER withdraw_after_insert
    AFTER INSERT ON withdrawals FOR EACH ROW
BEGIN
    UPDATE wallets
        SET wallets.amount = wallets.amount - NEW.amount
        WHERE wallets.id = NEW.source_wallet;
end;


# <!-- Transfers trigger -->
