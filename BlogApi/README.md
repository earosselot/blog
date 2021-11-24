# ENDPOINTS

## Post

```
{
    _id: String,
    title: String,
    text: String,
    comments: Comment[],
    user: User,
    published: Boolean,
    createdAt: Date,
}
```

-   **GET** - [/api/post] - Get all posts info. ✅ TODO: filter published.
-   **GET** - [/api/post/:idPost] - Get post info. ✅
-   **POST** - [/api/post] - Create new post. ✅
-   **PUT** - [/api/post] - Edit post data. ✅
-   **DELETE** - [/api/post] - Delete post. ✅

## Comment

```
{
    _id: String,
    text: String,
    author: String,
    timestamp: Date,
}
```

-   **GET** - [/api/post/:postId/comment] - Get all commments from a post. ✅
-   **GET** - [/api/post/:postId/comment/:commentId] - Get commment info. ✅
-   **POST** - [/api/post/:postId/comment] - Create new commment. ✅
-   **PUT** - [/api/post/:postId/comment/:commentId] - Edit commment data.  -- Add user interaction
-   **DELETE** - [/api/post/:postId/comment/:commentId] - Delete commment.  -- Add user interaction

## Users

```
{
    _id: String,
    username: String,
    hash: String,
    salt: String,
    firstName: String,
    lastName: String,
    admin: Boolean,
}
```

-   **GET** - [/api/user/me] - Get logged user info (if logged in).
-   **GET** - [/api/user/:idUser] - Get user info. ✅
-   **GET** - [/api/user] - Get all users info. 🔒 ✅
-   **GET** - [/api/user/logout] - Logs user out. ✅
-   **POST** - [/api/user] - Create new user. ✅
-   **POST** - [/api/user/login] - User login. ✅
-   **PUT** - [/api/user] - Edit user data. 🔒 ✅
-   **PUT** - [/api/user/password] - Edit user password. 🔒 ✅
-   **DELETE** - [/api/user] - Delete user. 🔒 ✅
