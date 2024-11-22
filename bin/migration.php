<?php return [
    "-- Create the 'user' table
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );",

    "-- Insert sample data into the 'user' table
        INSERT INTO user (username, email, password_hash) VALUES
            ('john_doe', 'john@example.com', 'hashed_password_1'),
            ('jane_smith', 'jane@example.com', 'hashed_password_2'),
            ('bob_johnson', 'bob@example.com', 'hashed_password_3')
        ;",

    "-- Create the 'book' table
        CREATE TABLE IF NOT EXISTS book (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            isbn TEXT UNIQUE,
            publication_year INTEGER,
            user_id INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES user(id)
        );",

    "-- Create the 'tag' table
        CREATE TABLE IF NOT EXISTS tag (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );",
    
    "-- Create a relation table for a many-to-many relationship between books and tags
        CREATE TABLE IF NOT EXISTS book_tag (
            book_id INTEGER,
            tag_id INTEGER,
            PRIMARY KEY (book_id, tag_id),
            FOREIGN KEY (book_id) REFERENCES book(id),
            FOREIGN KEY (tag_id) REFERENCES tag(id)
        );"
];