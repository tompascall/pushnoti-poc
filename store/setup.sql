CREATE TABLE subscriptions (
  id        INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  endpoint  VARCHAR(255),
  p256dh    VARCHAR(255),
  auth      VARCHAR(255)
)
  ENGINE = INNODB;