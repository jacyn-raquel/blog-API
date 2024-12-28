# Blog API - Documentation

## Resources

- App Base Url
    - https://movieapp-api-lms1.onrender.com (sample)

- Admin User
    - email: "admin@mail.com"
    - password: "admin123"

- Ordinary User
    - email: "user@mail.com"
    - password: "user1234"

## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```
      
### Blog Posts

#### [POST] - "/posts"

- Sample Request Body

    ```json

    {
        "title": "Sample: The Movie",
        "director": "Sample L. Jackson",
        "year": 2024,
        "description": "sample description",
        "genre": "sample"
    }

    ```

#### [GET] - "/posts"

- No Request Body

#### [GET] - "/posts/getPost/:postId"

- No Request Body

#### [PATCH] - "/posts/updatePost/:postId"

- Sample Request Body

    ```json

    {
        "title": "Sample 2: The Update",
        "director": "Sample L. Jackson",
        "year": 2026,
        "description": "sample updated description",
        "genre": "sample"
    }

    ```

#### [DELETE] - "/posts/:postId"

- No Request Body

