CREATE DATABASE if not exists openwallet;

use openwallet;

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
    `amount` DECIMAL(13, 4) NOT NULL,
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

# <!-- This trigger is for the recipient -->
CREATE TRIGGER transfer_after_insert_add
    AFTER INSERT ON transfers FOR EACH ROW

BEGIN
    UPDATE wallets
    SET wallets.amount = wallets.amount + NEW.converted_amount
    WHERE wallets.id = NEW.destination_wallet;

end;

# <!-- This trigger is for the sender -->
CREATE TRIGGER transfer_after_insert_deduct
    AFTER INSERT ON transfers FOR EACH ROW

BEGIN
    UPDATE wallets
    SET wallets.amount = wallets.amount - NEW.amount
    WHERE wallets.id = NEW.source_wallet;
end;


# <!-- Stored procedures --->

# <!-- Procedure for retrieving all transactions for a wallet -->

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
    FROM wallets AS wallet
     LEFT OUTER JOIN  deposits AS deposit
          on deposit.source_wallet = wallet.id
     LEFT OUTER JOIN transfers
         on transfers.source_wallet = wallet.id
     LEFT OUTER JOIN withdrawals
         on withdrawals.source_wallet = wallet.id
    WHERE wallet.user_id = owner_of_wallet AND
            wallet.id = wallet_to_search;
end;