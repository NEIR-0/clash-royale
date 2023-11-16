# Endpoints :

List of available endpoints:

- POST /login
- POST /register
- GET /
- GET /market
- GET /inventory
- GET /users
- GET /coins
- GET /orders
- PUT /users
- POST /orders/:coinId
- POST /inventory/:id
- GET /card/:id
- DELETE /delete/:id

# 1. POST /login

Description:

- POST login

body:

```js
{
    "email": "admin@gmail.com",
    "password": "admin"
}
```

Response (200 - OK)

```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwMTM1OTU0fQ.oHsu4-i5ND8_jlOMo45WFhvwbIGUnuLs-JzdecPzifM"
}
```

Response (400 - Bad Request)

```js
{
    "message": "email cant empty"
}
OR
{
    "message": "password cant empty"
}
```

Response (401 - Unauthenticated)

```js
{
    "message": "email/password invalid"
}
```

# 2. POST /register

Description:

- POST register

body:

```js
{
    "username": "udin",
    "email": "udin@gmail.com",
    "password": "udin"
}
```

Response (200 - OK)

```js
{
    "user": {
        "role": "user",
        "wallet": 50,
        "id": 2,
        "username": "udin",
        "email": "udin@gmail.com",
        "password": "$2a$10$w6b7woJ6b1071ncc2lARzOECmXywK4KH60kfDFKdA5/TjG1lwJ.Oy",
        "updatedAt": "2023-11-16T05:53:50.210Z",
        "createdAt": "2023-11-16T05:53:50.210Z"
    }
}
```

Response (400 - Bad Request)

```js
{
    "message": "email cant empty"
}
OR
{
    "message": "password cant empty"
}
```

# 3. GET /

Description:

- Get three data from list card

Response (200 - OK)

```js
[
  {
    id: 109,
    name: "Royal Delivery",
    type: "Spell",
    elixir: "3",
    rarity: "Common",
    description: "No need to sign for this package!\n\nDropped from the sky, it deals Area Damage to enemy Troops before delivering a Royal Recruit.\n\nThe empty box is also handy for espionage.",
    imgUrl: "https://api-assets.clashroyale.com/cards/300/LPg7AGjGI3_xmi7gLLgGC50yKM1jJ2teWkZfoHJcIZo.png",
    cardPrice: 3,
    createdAt: "2023-11-16T06:26:25.207Z",
    updatedAt: "2023-11-16T06:26:25.207Z",
  },
  {},
  {},
];
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

# 4. GET /market

Description:

- Get list card

Response (200 - OK)

```js
[
  {
    id: 109,
    name: "Royal Delivery",
    type: "Spell",
    elixir: "3",
    rarity: "Common",
    description: "No need to sign for this package!\n\nDropped from the sky, it deals Area Damage to enemy Troops before delivering a Royal Recruit.\n\nThe empty box is also handy for espionage.",
    imgUrl: "https://api-assets.clashroyale.com/cards/300/LPg7AGjGI3_xmi7gLLgGC50yKM1jJ2teWkZfoHJcIZo.png",
    cardPrice: 3,
    createdAt: "2023-11-16T06:26:25.207Z",
    updatedAt: "2023-11-16T06:26:25.207Z",
  },
  ....
];
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

# 5. GET /inventory

Description:

- Get list inventory

Response (200 - OK)

```js
{
    "id": 1,
    "username": "admin",
    "email": "admin@gmail.com",
    "password": "$2a$10$Bye//TSaxAWwMCQY82gOzunGRKrvHTIObH4pZrj0BjE6mfwezdhcO",
    "role": "admin",
    "wallet": 50,
    "createdAt": "2023-11-16T06:26:25.169Z",
    "updatedAt": "2023-11-16T06:26:25.169Z",
    "Cards": []
}
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

# 6. GET /users

Description:

- Get list users

Response (200 - OK)

```js
{
    "id": 1,
    "username": "admin",
    "email": "admin@gmail.com",
    "password": "$2a$10$Bye//TSaxAWwMCQY82gOzunGRKrvHTIObH4pZrj0BjE6mfwezdhcO",
    "role": "admin",
    "wallet": 50,
    "createdAt": "2023-11-16T06:26:25.169Z",
    "updatedAt": "2023-11-16T06:26:25.169Z"
}
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

# 7. GET /coins

Description:

- Get list coins

Response (200 - OK)

```js
[
  {
    id: 1,
    amount: 10,
    price: 10000,
    createdAt: "2023-11-16T06:26:25.196Z",
    updatedAt: "2023-11-16T06:26:25.196Z",
  },
  {},
  {},
  {},
  {},
];
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

# 8. GET /orders

Description:

- Get list orders

Response (200 - OK)

```js
[
    {
        "id": 1,
        "status": "false",
        "coinId": 1,
        "userId": 1,
        "createdAt": "2023-11-16T06:27:04.783Z",
        "updatedAt": "2023-11-16T06:27:04.783Z"
    },
    ....
]
```

# 9. PUT /users

Description:

- PUT update users

body:

```js
{
    "username": "siapa"
}
```

Response (200 - OK)

```js
{
    "message": "user successfull updated"
}
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

# 10. POST /orders/:coinId

Description:

- POST add orders

Response (200 - OK)

```js
{
    "status": "false",
    "id": 5,
    "coinId": 1,
    "userId": 1,
    "updatedAt": "2023-11-16T12:33:17.788Z",
    "createdAt": "2023-11-16T12:33:17.788Z"
}
```

Response (404 - Not Found)

```js
{
    "message": "Not Found"
}
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

# 11. POST /inventory/:id

Description:

- POST add inventory

Response (200 - OK)

```js
{
    "data": {
        "userId": 1,
        "cardId": 71,
        "updatedAt": "2023-11-16T12:36:47.632Z",
        "createdAt": "2023-11-16T12:36:47.632Z"
    }
}
```

Response (404 - Not Found)

```js
{
    "message": "Not Found"
}
```

Response (400 - Bad Request)

```js
{
    "message": "you already have one"
}
OR
{
    "message": "your coin its not enough. Please top up now!"
}
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

# 12. GET /card/:id

Description:

- GET card by id

Response (200 - OK)

```js
{
    "id": 1,
    "name": "Knight",
    "type": "Troop",
    "elixir": "3",
    "rarity": "Common",
    "description": "A tough melee fighter. The Barbarian's handsome, cultured cousin. Rumor has it that he was knighted based on the sheer awesomeness of his mustache alone.",
    "imgUrl": "https://api-assets.clashroyale.com/cards/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png",
    "cardPrice": 3,
    "createdAt": "2023-11-16T06:26:25.206Z",
    "updatedAt": "2023-11-16T06:26:25.206Z"
}
```

Response (404 - Not Found)

```js
{
    "message": "Not Found"
}
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

# 13. DELETE /delete/:id

Description:

- DELETE card by id

Response (200 - OK)

```js
{
    "message": "card with id: 1, has been removed"
}
```

Response (404 - Not Found)

```js
{
    "message": "Not Found"
}
```

Response (401 - InvalidToken)

```js
{
    "message": "invalid token"
}
```

Response (403 - forbidden)

```js
{
    "message": "forbidden"
}
```

# Global Error

Response (500 - Internal Server Error)

```js
{
  message: "Interval Server Error";
}
```
