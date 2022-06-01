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

ALTER TABLE test_openWallet.test_wallets MODIFY COLUMN `amount` DECIMAL(13,4) NOT NULL;


# <!-- Alter test_wallets -->
ALTER TABLE test_openWallet.test_wallets MODIFY COLUMN `currency` VARCHAR(6) NOT NULL;


# <!-- Create deposits table --> (don't use).
CREATE TABLE if not exists test_openWallet.test_deposits (
    `id` VARCHAR(18) NOT NULL UNIQUE PRIMARY KEY ,
    `amount` DECIMAL(9,4) NOT NULL,
    `source_wallet` VARCHAR(16) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_wallet) REFERENCES test_wallets(id) ON DELETE CASCADE ON UPDATE CASCADE
);


# <!-- Update the amount that can be deposited -->
ALTER TABLE test_openWallet.test_deposits MODIFY COLUMN `amount` DECIMAL(13,4) NOT NULL;

# <!-- Create Withdrawals table --> (don't use).
CREATE TABLE if not exists test_openWallet.test_withdrawals (
     `id` VARCHAR(18) NOT NULL UNIQUE PRIMARY KEY ,
     `amount` DECIMAL(9,4) NOT NULL,
     `source_wallet` VARCHAR(16) NOT NULL,
     `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (source_wallet) REFERENCES test_wallets(id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE test_openWallet.test_withdrawals MODIFY COLUMN `amount` DECIMAL(13,4) NOT NULL;


# <!-- Create transfers table --> (don't use).
CREATE TABLE if not exists test_openWallet.test_transfers (
     `id` VARCHAR(18) NOT NULL UNIQUE PRIMARY KEY ,
     `amount` DECIMAL(9,4) NOT NULL,
     `source_wallet` VARCHAR(16) NOT NULL,
     `destination_wallet` VARCHAR(16) NOT NULL,
     `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (source_wallet) REFERENCES test_wallets(id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE test_openWallet.test_transfers MODIFY COLUMN `amount` DECIMAL(13,4) NOT NULL;

# <!-- Don't copy -->
DROP TABLE test_openWallet.test_deposits;

# <!-- Don't copy -->
DROP TABLE test_wallets;

# <!-- Create Transactions table don't copy -->
CREATE TABLE if not exists test_openWallet.test_transactions (
    `id` VARCHAR(18) NOT NULL UNIQUE PRIMARY KEY,
    `type` VARCHAR(12) NOT NULL,
    `amount` DECIMAL(9,4) NOT NULL,
    # withdraw-from, #transfer-from  #depost-into,
    # #transfer-to # am not sure of this implementation
    `source_wallet` VARCHAR(16) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_wallet) REFERENCES test_wallets(id) ON DELETE CASCADE ON UPDATE CASCADE
);

# <!-- Drop transactions table -->
DROP TABLE test_openWallet.test_transactions;

# I am only keeping track if the wallet affected
#    -> Transfer-from source_wallet
#    -> Deposit-into source_wallet
#    -> Withdraw-from source_wallet



# <!-- Triggers  -->

# <!-- Create trigger for deposits -->
CREATE TRIGGER deposits_after_insert
    AFTER INSERT ON test_openWallet.test_deposits
    FOR EACH ROW
BEGIN
    UPDATE test_openWallet.test_wallets
    SET test_openWallet.test_wallets.amount = test_openWallet.test_wallets.amount + NEW.amount
    WHERE test_openWallet.test_wallets.id = NEW.source_wallet;
end;


# <!-- Create triggers for withdrawal -->
CREATE TRIGGER withdraw_after_insert
    AFTER INSERT ON test_openWallet.test_withdrawals
    FOR EACH ROW
BEGIN
    UPDATE test_openWallet.test_wallets
    SET test_openWallet.test_wallets.amount = test_openWallet.test_wallets.amount - NEW.amount
    WHERE test_openWallet.test_wallets.id = NEW.source_wallet;
end;

# <!-- Create triggers for transfer -->



# I don't know whether stored procedures are needed now.





