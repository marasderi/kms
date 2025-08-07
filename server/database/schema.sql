CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'moderator', 'category_moderator', 'member', 'candidate', 'newbie') DEFAULT 'newbie',
  rank ENUM('memur', 'sef', 'merkez_muduru', 'muduryardimcisi', 'mudur', 'daire_baskani', 'genel_mudur', 'baskan_yardimcisi', 'baskan') DEFAULT 'memur',
  avatar VARCHAR(255),
  about VARCHAR(150),
  city VARCHAR(255),
  profession VARCHAR(255),
  createdAt TIMESTAMP DEFAULT NOW(),
  postCount INTEGER DEFAULT 0
);

CREATE TABLE Categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(500)
);

CREATE TABLE Posts (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  UserId INTEGER REFERENCES Users(id),
  CategoryId INTEGER REFERENCES Categories(id),
  createdAt TIMESTAMP DEFAULT NOW(),
  isVisible BOOLEAN DEFAULT FALSE,
  moderationNote TEXT
);

CREATE TABLE Stories (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  expiresAt TIMESTAMP NOT NULL,
  UserId INTEGER REFERENCES Users(id),
  createdAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Announcements (
  id SERIAL PRIMARY KEY,
  content VARCHAR(1000) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  UserId INTEGER REFERENCES Users(id),
  PostId INTEGER REFERENCES Posts(id),
  createdAt TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_posts_content_search ON Posts USING GIN (to_tsvector('turkish', content));
