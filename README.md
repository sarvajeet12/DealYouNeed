# DealYouNeed

DealYouNeed is a Node.js REST API for managing SaaS deals, including deal creation, verification, and retrieval. The API supports admin authentication and provides endpoints for filtering and sorting deals.

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **dotenv**: Environment variable management

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Project Structure

```
.
├── config/
│   └── database.js
├── controller/
│   └── deal.js
├── middleware/
│   └── auth.js
├── model/
│   └── deal.js
├── router/
│   └── deal.js
├── utils/
│   └── calculateSaving.js
├── .env
├── package.json
├── server.js
```

## API Endpoints

### 1. Get Verified Deals

**GET** `/api/deals`

**Query Parameters:**
- `category` (optional): Filter by category
- `minCashback` (optional): Minimum cashback percent
- `sortBy` (optional): Sort by `discountedPrice`

**Response:**
```json
{
  "success": true,
  "response": [
    {
      "_id": "...",
      "title": "...",
      "description": "...",
      "logoUrl": "...",
      "category": "...",
      "originalPrice": 100,
      "discountedPrice": 80,
      "cashbackPercent": 10,
      "youSavePercent": 20,
      "isVerified": true,
      "createdAt": "..."
    }
  ]
}
```

### 2. Create a Deal (Admin Only)

**POST** `/api/deals`

**Headers:**
- `x-api-key`: Must match `ADMIN_API_KEY` in `.env`

**Body:**
```json
{
  "title": "Deal Title",
  "description": "Deal Description",
  "logoUrl": "https://...",
  "category": "Category",
  "originalPrice": 100,
  "discountedPrice": 80,
  "cashbackPercent": 10
}
```

**Response:**
```json
{
  "success": true,
  "message": "Deals created successfully",
  "response": { ...dealObject }
}
```

### 3. Verify a Deal (Admin Only)

**PATCH** `/api/deals/:id/verify`

**Headers:**
- `x-api-key`: Must match `ADMIN_API_KEY` in `.env`

**Body:**
```json
{
  "isVerified": true
}
```

**Response:**
```json
{
  "_id": "...",
  "isVerified": true,
  ...
}
```

## How to Run

1. **Clone the repository**

2. **Install dependencies**
   ```sh
   npm install or npm install -y
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```
   DATABASE_URI=your_mongodb_connection_string  or mongodb+srv://username:password@cluster0.eebb4eo.mongodb.net/
   ADMIN_API_KEY=your_admin_api_key
   ```

4. **Start the server**
   ```sh
   npm start or node server.js or nodemon server.js
   ```

   The server will run on `http://localhost:3000`.

## Notes

- Only admins (with correct `x-api-key`) can create or verify deals.
- All prices and percentages are expected as numbers.
- The API returns JSON responses.

---

For more details, see the source files:
- [server.js](server.js)
- [controller/deal.js](controller/deal.js)
- [router/deal.js](router/deal.js)
- [middleware/auth.js](middleware/auth.js)
- [model/deal.js](model/deal.js)
