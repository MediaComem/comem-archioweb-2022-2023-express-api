# Express API

A basic Express.js API example written during the [Media Engineering
Web-Oriented Architecture
course](https://github.com/MediaComem/comem-archioweb).

## Requirements

* [Node.js](https://nodejs.org) 18+
* [MongoDB](https://www.mongodb.com) 6+

## Usage

```bash
# Clone the repository
git clone https://github.com/MediaComem/comem-archioweb-2022-2023-express-api.git

# Install dependencies
cd comem-archioweb-2022-2023-express-api
npm ci

# Run the application
npm start

# Run the application in development mode with live reload
npm run dev
```

## Configuration

The application is configured through the following environment variables:

| Variable             | Default value                     | Description                                                                           |
| :------------------- | :-------------------------------- | :------------------------------------------------------------------------------------ |
| `BCRYPT_COST_FACTOR` | `10`                              | Cost factor for password hashing with [bcrypt](https://en.wikipedia.org/wiki/Bcrypt). |
| `DATABASE_URL`       | `mongodb://localhost/express-api` | The MongoDB connection URI.                                                           |
| `JWT_SECRET`         | -                                 | The secret used to sign JWTs. It should be a long random string.                      |
| `PORT`               | `3000`                            | The port the server will listen on.                                                   |