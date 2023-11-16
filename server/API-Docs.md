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
  midtrans >>
- GET /payment/midtrans/token
- POST /payment/midtrans/notifications

# Global Error

Response (500 - Internal Server Error)

```js
{
  message: "Interval Server Error";
}
```
