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

ALTER TABLE test_openWallet.test_transfers MODIFY COLUMN `source_wallet_currency` VARCHAR(6) NOT NULL AFTER source_wallet;
ALTER TABLE test_openWallet.test_transfers MODIFY COLUMN `destination_wallet_currency` VARCHAR(6) NOT NULL AFTER destination_wallet;
ALTER TABLE test_openWallet.test_transfers MODIFY COLUMN `converted_amount`DECIMAL(13,4)  DEFAULT NULL AFTER  destination_wallet_currency;


# <!-- Don't copy -->
DROP TABLE test_openWallet.test_deposits;

# <!-- Don't copy -->
DROP TABLE test_wallets;

# <!-- Create Transactions table don't copy -->
CREATE TABLE if not exists test_openWallet.test_transactions_logs (
    `id` BIGINT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(12) NOT NULL,
    `amount` DECIMAL(9,4) NOT NULL,
    `source_wallet` VARCHAR(16) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_wallet) REFERENCES test_wallets(id) ON DELETE CASCADE ON UPDATE CASCADE
);


# <!-- Drop transactions table -->
DROP TABLE test_openWallet.test_transactions_logs;

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
CREATE TRIGGER transfer_after_insert_add
    AFTER INSERT ON test_openWallet.test_transfers FOR EACH ROW

    BEGIN
        UPDATE test_openWallet.test_wallets
            SET test_openWallet.test_wallets.amount = test_openWallet.test_wallets.amount + NEW.converted_amount
            WHERE test_openWallet.test_wallets.id = NEW.destination_wallet;

    end;

CREATE TRIGGER transfer_after_insert_deduct
    AFTER INSERT ON test_openWallet.test_transfers FOR EACH ROW

    BEGIN
        UPDATE test_openWallet.test_wallets
            SET test_openWallet.test_wallets.amount = test_openWallet.test_wallets.amount - NEW.amount
        WHERE test_openWallet.test_wallets.id = NEW.source_wallet;
    end;

# <!-- Create triggers for keeping the each transaction logs -->
# CREATE TRIGGER transaction_after_insert
#     AFTER INSERT ON test_openWallet.test_deposits
#     FOR EACH ROW
# BEGIN
#     INSERT test_transactions_logs (id, type, amount, source_wallet)
#         VALUES (NEW.t)
# END;
# I don't know whether stored procedures are needed now.

# <!-- Omooo!!! I need them oooo -->
use test_openWallet;

DROP PROCEDURE if exists get_wallet_transactions;

CREATE PROCEDURE get_wallet_transactions (
    wallet_to_search VARCHAR(16) ,
    owner_of_wallet VARCHAR(30)
)
BEGIN
    SELECT
        wallet.id AS userWallet,
        wallet.currency AS currency,
        wallet.amount AS currentBalance,
        deposit.id AS deposits,
        deposit.amount AS depositAmount,
        deposit.created_at AS depositDate,
        withdrawals.id AS withdrawal,
        withdrawals.amount AS withdrawalAmount,
        withdrawals.created_at AS withdrawalsDate,
        transfers.id AS transfers,
        (transfers.amount / transfers.converted_amount) AS transferRate,
        transfers.amount AS transfersAmount,
        transfers.created_at AS transferDate
    FROM test_openwallet.test_wallets AS wallet
     LEFT OUTER JOIN  test_deposits AS deposit
      on deposit.source_wallet = wallet.id
     LEFT OUTER JOIN test_transfers transfers
     on transfers.source_wallet = wallet.id
     LEFT OUTER JOIN test_withdrawals AS withdrawals
     on withdrawals.source_wallet = wallet.id
    WHERE wallet.user_id = owner_of_wallet AND
          wallet.id = wallet_to_search;
end;

