# Weather App API

Ob-havo ma'lumotlarini olish uchun API

## Ishga tushirish

### CodeSandbox orqali
1. GitHub repositoriyani CodeSandbox-ga import qiling
2. Environment Variables sozlang:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/weather_app
   JWT_SECRET=your_jwt_secret_key
   WEATHER_API_KEY=your_openweather_api_key
   ```

### Lokal kompyuterda
1. Repositoriyni yuklab oling
2. `.env` faylini yarating va sozlang
3. Quyidagi buyruqlarni bajaring:
   ```bash
   npm install
   npm run start:dev
   ```

## API Endpointlar

### 1. Asosiy sahifa
- URL: `/api`
- Method: GET
- Natija: API haqida ma'lumot

### 2. Ro'yxatdan o'tish
- URL: `/api/auth/register`
- Method: POST
- Body:
  ```json
  {
    "name": "Ism",
    "surname": "Familiya",
    "username": "foydalanuvchi",
    "password": "Parol123!@#"
  }
  ```

### 3. Login
- URL: `/api/auth/login`
- Method: POST
- Body:
  ```json
  {
    "username": "foydalanuvchi",
    "password": "Parol123!@#"
  }
  ```

### 4. Ob-havo ma'lumotlari
- URL: `/api/weather`
- Method: POST
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  {
    "cities": ["Tashkent"]
  }
  ```

## API Dokumentatsiyasi
Swagger dokumentatsiyasi: `/api/docs`
