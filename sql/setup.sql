-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS bats CASCADE;
DROP TABLE IF EXISTS salamanders CASCADE;
DROP TABLE IF EXISTS monotremes;

CREATE TABLE bats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    nickname VARCHAR
);

INSERT INTO bats (name, nickname) VALUES
('PARASTRELLUS HESPERUS', 'Canyon Bat'),
('DESMODUS ROTUNDUS', 'Common Vampure Bat'),
('LASIURUS BOREALIS', 'Eastern Red Bat');

CREATE TABLE salamanders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    nickname VARCHAR
);

INSERT INTO salamanders (name, nickname) VALUES
('PLEURODELES WALTL', 'Spanish Ribbed Newt'),
('NEURERGUS KAISERI', 'Iranian Harlequin Newt'),
('SALAMANDRA SALAMANDRA', 'Fire Salamander');

CREATE TABLE monotremes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    nickname VARCHAR
);

INSERT INTO monotremes (name, nickname) VALUES
('Ornithorhynchus anatinus', 'Duck-billed Platypus'),
('Tachyglossus bruijnii', 'Western long-beaked echidna'),
('Zaglossus attenboroughi', 'Sir Davids long-beaked echidna');