INSERT INTO categories (name, description, created_at, updated_at) VALUES ('Technology', 'All tech related posts', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO categories (name, description, created_at, updated_at) VALUES ('Lifestyle', 'Lifestyle and daily routines', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO posts (title, content, author, category_id, created_at, updated_at) VALUES ('Spring Boot 3 Intro', 'Introduction to Spring Boot 3 and Java 17', 'John Doe', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO posts (title, content, author, category_id, created_at, updated_at) VALUES ('Healthy Habits', 'How to stay healthy while coding', 'Jane Doe', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO comments (content, author, post_id, created_at) VALUES ('Great post!', 'Alice', 1, CURRENT_TIMESTAMP);
