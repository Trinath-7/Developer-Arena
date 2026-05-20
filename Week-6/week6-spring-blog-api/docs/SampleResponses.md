# Sample API Responses

### GET `/api/posts` (Paginated)
```json
{
  "content": [
    {
      "id": 1,
      "title": "Spring Boot 3 Intro",
      "content": "Introduction to Spring Boot 3 and Java 17",
      "author": "John Doe",
      "categoryId": 1
    },
    ...
  ],
  "pageNo": 0,
  "pageSize": 10,
  "totalElements": 2,
  "totalPages": 1,
  "last": true
}
```

### POST `/api/posts` (Validation Error)
Request Body:
```json
{
    "title": "A",
    "content": "Short",
    "author": "",
    "categoryId": 1
}
```
Response (`400 Bad Request`):
```json
{
  "author": "Author should not be empty",
  "title": "Post title should have at least 2 characters",
  "content": "Post content should have at least 10 characters"
}
```

### POST `/api/comments`
Request Body:
```json
{
  "name": "Bob",
  "email": "bob@example.com",
  "body": "This is a helpful comment over 10 chars.",
  "postId": 1
}
```
Response (`201 Created`):
```json
{
  "id": 2,
  "name": "Bob",
  "email": "bob@example.com",
  "body": "This is a helpful comment over 10 chars.",
  "postId": 1
}
```
