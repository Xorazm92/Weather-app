WEATHER APP API - ISHLATISH YO'RIQNOMASI

1. CODESANDBOX ORQALI ISHLATISH
--------------------------------
1) GitHub repositoriyani CodeSandbox-ga import qiling
2) Environment Variables sozlang:
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/weather_app
   JWT_SECRET=your_jwt_secret_key
   WEATHER_API_KEY=your_openweather_api_key

2. API ENDPOINTLAR
------------------
1) Asosiy sahifa
   URL: /api
   METHOD: GET

2) Ro'yxatdan o'tish
   URL: /api/auth/register
   METHOD: POST
   BODY: {
     "name": "Ism",
     "surname": "Familiya",
     "username": "login",
     "password": "Parol123!@#"
   }

3) Login
   URL: /api/auth/login
   METHOD: POST
   BODY: {
     "username": "login",
     "password": "Parol123!@#"
   }

4) Ob-havo ma'lumotlari
   URL: /api/weather
   METHOD: POST
   HEADERS: Authorization: Bearer <token>
   BODY: {
     "cities": ["Tashkent"]
   }

3. DOKUMENTATSIYA
----------------
Swagger: /api/docs
