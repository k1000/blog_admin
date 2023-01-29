-- https://www.sqlitetutorial.net/sqlite-foreign-key/

DROP TABLE IF EXISTS blog;
CREATE TABLE blog (
    slug TEXT UNIQUE NOT NULL,
    link TEXT UNIQUE NOT NULL,
    image TEXT,
    title TEXT NOT NULL,
    md TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    description TEXT NOT NULL,
    html TEXT,
    category_slug TEXT,
    tags TEXT NOT NULL,
    isPublished BOOLEAN,
    PRIMARY KEY (slug),
    FOREIGN KEY (category_slug) REFERENCES blog_categories(slug)
);

-- Path: src/blog.sql
DROP TABLE IF EXISTS blog_categories;
CREATE TABLE blog_categories (
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    PRIMARY KEY (slug)
);

-- Path: src/blog.sql
DROP TABLE IF EXISTS blog_comments;
CREATE TABLE blog_comments (
    name TEXT NOT NULL,
    email TEXT,
    comment TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    blog_slug TEXT NOT NULL,
    PRIMARY KEY (blog_slug, createdAt),
    FOREIGN KEY (blog_slug) REFERENCES blog(slug)
);

DROP TABLE IF EXISTS synopsis;
CREATE TABLE synopsis (
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    summary TEXT,
    author TEXT,
    publishedAt DATE,
    tags TEXT,
    createdAt DATETIME NOT NULL,
    isPublic BOOLEAN NOT NULL,
    PRIMARY KEY (url)
);

DROP TABLE IF EXISTS prompt;
CREATE TABLE prompt (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    modelName TEXT NOT NULL,
    temperature INTEGER NOT NULL,
    topP REAL NOT NULL,
    topK INTEGER NOT NULL,
    maxTokens INTEGER NOT NULL,
    insertBeginningRequest TEXT,

    insertBeginningResponse TEXT,
    outputFormat TEXT,
    categoty TEXT,
    tags TEXT,
    createdAt DATETIME NOT NULL,
    isPublic BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

-- Path: src/blog.sql
INSERT INTO blog_categories VALUES ('Misc', 'misc'), ('Programming', 'programming'), ('Web Development', 'web-development');

