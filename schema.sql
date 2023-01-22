-- https://www.sqlitetutorial.net/sqlite-foreign-key/

DROP TABLE IF EXISTS BlogEntries;
CREATE TABLE BlogEntries (
    slug TEXT UNIQUE NOT NULL,
    link TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    md TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    description TEXT NOT NULL,
    html TEXT,
    category_slug TEXT,
    tags TEXT NOT NULL,
    PRIMARY KEY (slug),
    FOREIGN KEY (category_slug) REFERENCES BlogCategories(slug)
);

-- Path: src/blog.sql
DROP TABLE IF EXISTS BlogCategories;
CREATE TABLE BlogCategories (
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    PRIMARY KEY (slug)
);

-- Path: src/blog.sql
DROP TABLE IF EXISTS BlogComments;
CREATE TABLE BlogComments (
    name TEXT NOT NULL,
    email TEXT,
    comment TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    blogEntry_slug TEXT NOT NULL,
    PRIMARY KEY (blogEntry_slug, createdAt),
    FOREIGN KEY (blogEntry_slug) REFERENCES BlogEntries(slug)
);

-- Path: src/blog.sql
INSERT INTO BlogCategories VALUES ('Misc', 'misc');

