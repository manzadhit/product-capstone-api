# Nutri Check

<!--
Sebuah API sederhana untuk mengelola daftar tugas (todo) dengan fitur CRUD (Create, Read, Update, Delete).

## Deskripsi

Fancy Todo API adalah sebuah aplikasi API yang dibangun menggunakan Node.js, Express.js, dan Prisma sebagai ORM untuk database MySQL. API ini menyediakan endpoint untuk mengelola daftar tugas (todo) dan pengguna yang terdaftar. Setiap pengguna dapat membuat, membaca, memperbarui, dan menghapus daftar tugas mereka sendiri.

## Teknologi Yang Digunakan

- Node.js
- Express.js
- Prisma
- MySQL

## Database Schema

![Database Schema](schema.png)

Gambar di atas menunjukkan skema database yang digunakan dalam proyek ini.

## Instalasi

1.  Kloning repositori ini ke dalam direktori lokal Anda.

```bash
git clone https://github.com/manzadhit/Fancy-Todo-API-Prisma.git
```

2.  Jalankan perintah `npm install` untuk menginstal semua dependensi yang dibutuhkan.
3.  Salin file `.env.example` dan ubah namanya menjadi `.env`.
4.  Edit file `.env` dan isi dengan nilai yang sesuai untuk setiap variabel lingkungan yang diperlukan. Pastikan untuk mengisi nilai `DATABASE_URL` dengan URL koneksi database MySQL yang benar.
5.  Jalankan perintah `npx prisma db push` untuk menerapkan skema database ke MySQL.
6.  Jalankan perintah `npm run dev` untuk menjalankan server API.

## Penggunaan -->

### Endpoint

- [Auth](#auth)

  - [Register](#register)
  - [Login](#login)
  - [Login dengan Google](#login-dengan-google)

- [User](#user)

  - [Create User -> Admin](#create-user)
  - [Get All Users -> Admin](#get-all-users)
  - [Get User By ID -> User](#get-user-by-id)
  - [Update User -> User](#update-user)
  - [Delete User -> User & Admin](#delete-user)
  - [Calulate BMI -> User](#calculate-bmi)

- [News](#news)

  - [Get All News](#get-all-news)
  - [Searching News](#searching-news)
  - [Get News By Category](#get-news-by-category)

- [Categories](#categories)

  - [Get All Categories](#get-all-categories)

- [Meals](#meals)

  - [Get Nutrition By Food Name](#get-nutrition-by-food-name)

- [Meals Histories](#meals-histories)

  - [Create Meals Histories](#create-meals-histories)
  - [Create Manual Meals Histories](#create-manual-meals-histories)
  - [Searching Meals Histories By Meal Type](#searching-meals-histories-by-meal-type)
  - [Searching Meals Histories By Date](#searching-meals-histories-by-date)

### Auth

#### Register

Registrasi pengguna baru dengan memberikan nama pengguna, alamat email, dan password.

**URL**

```bash
POST /auth/register
```

**Body Request**

```json
{
  "username": "John Doe",
  "email": "john.doe@example.com",
  "password": "johndoe123"
}
```

**Response Success**

```json
{
  "status": 201,
  "message": "Register successfully",
  "data": {
    "userId": "CdF6VTUg97a3mey8Qr1p"
  }
}
```

#### Login

Login menggunakan email dan password

**URL**

```bash
POST /auth/login
```

**Response Success**

```json
{
  "status": 200,
  "message": "Login Successfully",
  "data": {
    "user": {
      "id": "yh98FTPNWWj8m4xgMOnZ",
      "username": "nyoman",
      "email": "nyoman9@gmail.com",
      "password": "$2b$08$x.QTlIX2YMQIKYNtREFyB.Rsn4WCwSZ.5V5E.1x4HoSxf0fR5Hu46",
      "role": "user",
      "createdAt": "2024-11-21T06:12:23.222Z",
      "updatedAt": "2024-11-21T06:12:23.222Z",
      "bmi": {
        "gender": "Male",
        "age": 20,
        "height": 185,
        "weight": 65,
        "activity": "mengoding"
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InloOThGVFBOV1dqOG00eGdNT25aIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzIxOTc4MjB9.MGiRK5hzyZ8J97zfo7i-gMYYbVuIw7nzv6t0egAzFt0"
  }
}
```

#### Login dengan Google

Autentikasi pengguna menggunakan akun Google. Terdapat dua endpoint terkait: satu untuk memulai proses login, dan satu untuk menangani callback setelah autentikasi.

---

##### 1. Memulai Login Google

Memulai proses autentikasi dengan Google. Pengguna akan diarahkan ke halaman login Google.

**URL**

```bash
GET /auth/google
```

##### 2. Callback setelah Login Google

Endpoint ini digunakan untuk menangani callback setelah pengguna berhasil login menggunakan Google. Jika autentikasi gagal, pengguna akan diarahkan kembali ke halaman /login

**URL**

```bash
GET /auth/google/callback

```

**Response Success**

```json
{
  "status": 200,
  "message": "Login successful",
  "user": {
    "id": "sgTbFeY6VDc8dPvxeqpt",
    "username": "I Nyoman Aditia",
    "email": "aadhit407@gmail.com",
    "password": "",
    "role": "user",
    "createdAt": "2024-12-09T09:34:36.024Z",
    "updatedAt": "2024-12-09T09:34:36.024Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNnVGJGZVk2VkRjOGRQdnhlcXB0Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzM3NDc5NjF9.rWbQGNEchyEKTe8MVgIm8A07L6pMoLSghvljOt9LVY0"
}
```

### User

#### Create User

Membuat pengguna baru dengan memberikan nama pengguna, alamat email, dan password.

**URL**

```bash
POST /users
```

**Body Request**

```json
{
  "username": "John Doe",
  "email": "john.doe@example.com",
  "password": "johndoe123"
}
```

**Response Success**

```json
{
  "status": 201,
  "message": "Create User Success",
  "data": {
    "userId": "CdF6VTUg97a3mey8Qr1p"
  }
}
```

#### Get All Users

Mendapatkan daftar semua pengguna yang terdaftar.

**URL**

```bash
GET /users
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch All Users Success",
  "data": [
    {
      "id": "5TIcepsZy349ok1s9EoY",
      "username": "nyoman",
      "email": "nyoman6@gmail.com",
      "password": "$2b$08$qZ0t8cCfhkM7HQkjqNzwmOFSWnWi2/dwbRZPjMYn80QK31JV.uVYG",
      "createdAt": "2024-11-21T02:27:02.063Z",
      "updatedAt": "2024-11-21T02:27:02.063Z",
      "bmi": {
        "gender": "Male",
        "age": 20,
        "height": 185,
        "weight": 65,
        "activity": "mengoding"
      }
    },
    {
      "id": "5Z0i6jz8De06zs3B01WG",
      "username": "testting1",
      "email": "testing1@gmail.com",
      "password": "$2b$10$HqtIEz2IV6Ir1K3uJdilAu3pVBQqGoMt3R0Kc0a3IcI3impgbsc.K",
      "createdAt": "2024-11-21T02:27:02.063Z",
      "updatedAt": "2024-11-21T02:27:02.063Z",
      "bmi": {
        "gender": "Male",
        "age": 20,
        "height": 185,
        "weight": 65,
        "activity": "mengoding"
      }
    }
  ]
}
```

#### Get User By ID

Mendapatkan detail pengguna berdasarkan ID pengguna.

**URL**

```bash
GET /users/:userId
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch User Success",
  "data": {
    "id": "yh98FTPNWWj8m4xgMOnZ",
    "username": "nyoman",
    "email": "nyoman9@gmail.com",
    "password": "$2b$08$x.QTlIX2YMQIKYNtREFyB.Rsn4WCwSZ.5V5E.1x4HoSxf0fR5Hu46",
    "role": "user",
    "createdAt": "2024-11-21T06:12:23.222Z",
    "updatedAt": "2024-11-21T06:12:23.222Z",
    "bmi": {
      "gender": "Male",
      "age": 20,
      "height": 185,
      "weight": 65,
      "activity": "mengoding"
    }
  }
}
```

#### Update User

Memperbarui data pengguna berdasarkan ID pengguna.

**URL**

```bash
PUT /users/:userId
```

**Body Request**

```json
{
  "username": "update",
  "email": "update18@gmail.com",
  "password": "update123"
}
```

**Response Success**

```json
{
  "status": 200,
  "message": "Update User Success"
}
```

#### Delete User

Menghapus pengguna berdasarkan ID pengguna.

**URL**

```bash
DELETE /users/:userId
```

**Response Success**

```json
{
  "status": 200,
  "message": "Delete User Success"
}
```

#### Calculate BMI

Memperbarui data pengguna dengan data bmi berdasarkan ID pengguna.

**URL**

```bash
PUT /users/:userId/bmi
```

**Body Request**

```json
{
  "gender": "Male",
  "age": 20,
  "height": 185,
  "weight": 65
}
```

**Response Success**

```json
{
  "status": 200,
  "message": "Adding data success"
}
```

### News

#### Get All News

Mendapatkan semua berita

**URL**

```bash
GET /news
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch All News Success",
  "data": [
    {
      "id": "BRb4ZMWZVZn65QkofRGF",
      "title": "5 superfoods for iron health",
      "description": "You’ve definitely heard of superfoods, but you might not know which ones they are. Here’s a list of meals that are so excellent for you, they’re exceptional.",
      "category": ["healty", "food"],
      "url": "https://medium.com/@RalucaA/5-superfoods-for-iron-health-c277682c9a2a",
      "image": "https://storage.googleapis.com/news-nutricheck/news_images/1732381183616_5 superfoods for iron health.jpg",
      "createdAt": "2024-11-23T16:59:47.405Z",
      "updatedAt": "2024-11-23T16:59:47.405Z"
    },
    {
      "id": "GmdABlNjcMTDkVThTTuj",
      "title": "Healthy Eating for Heart Health",
      "description": "For general health, maintaining a healthy heart is essential. Adopting a healthy diet that is balanced and nutrient-rich is one of the major aspects in promoting heart health.",
      "category": ["healty", "food"],
      "url": "https://medium.com/@michaelpaland/healthy-eating-for-heart-health-d721670e4443",
      "image": "https://storage.googleapis.com/news-nutricheck/news_images/1732381377745_5 superfoods for iron health.jpg",
      "createdAt": "2024-11-23T17:02:58.859Z",
      "updatedAt": "2024-11-23T17:02:58.859Z"
    }
  ]
}
```

#### Searching News

Melakukan pencarian berita

**URL**

```bash
GET /news/title/:title
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch News by Title Success",
  "data": [
    {
      "id": "GmdABlNjcMTDkVThTTuj",
      "title": "Healthy Eating for Heart Health",
      "description": "For general health, maintaining a healthy heart is essential. Adopting a healthy diet that is balanced and nutrient-rich is one of the major aspects in promoting heart health.",
      "category": ["healty", "food"],
      "url": "https://medium.com/@michaelpaland/healthy-eating-for-heart-health-d721670e4443",
      "createdAt": "2024-11-23T17:02:58.859Z",
      "image": "https://storage.googleapis.com/news-nutricheck/news_images/1732381525612_Healthy Eating for Heart Health.jpg",
      "updatedAt": "2024-11-23T17:05:25.612Z"
    }
  ]
}
```

#### Get News By Category

Melakukan pencarian berita berdasarkan nama category

**URL**

```bash
GET /news/category/:category
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch News by Category Success",
  "data": [
    {
      "id": "NmuXwld70VTKAIDD7kT7",
      "title": "Foods That Energize and Enhance Mental Focus",
      "description": "Ever experienced that feeling of tiredness like you are running out of fuel half through the day? If the afternoons lull gets you scavenging for that sugary junk or downing another cup of coffee, maybe it is time of altering your options.",
      "categories": ["healthy", "food"],
      "url": "https://medium.com/@franz_70100/foods-that-energize-and-enhance-mental-focus-783f827524a1",
      "image": "https://storage.googleapis.com/news-nutricheck/news_images/1732468496194_Foods That Energize.jpg",
      "createdAt": "2024-11-24T17:14:57.451Z",
      "updatedAt": "2024-11-24T17:14:57.451Z"
    },
    {
      "id": "tqkVj1BcI8OQuihDbjFz",
      "title": "Want to Be a Better Cook? Perk Up Your Ears and Listen to the Food",
      "description": "Here’s a bold claim for a kicker: When it comes to helping you put delicious food on the table, even the best-selling cookbooks miss the mark. And before you ask, yes, Julia Child’s cookbooks are the exception. They always are.",
      "categories": ["food"],
      "url": "https://medium.com/tastyble/want-to-be-a-better-cook-perk-up-your-ears-and-listen-to-the-food-0cfc77ddbd65",
      "image": "https://storage.googleapis.com/news-nutricheck/news_images/1732467497807_Want to Be a Better.jpg",
      "createdAt": "2024-11-24T16:58:25.022Z",
      "updatedAt": "2024-11-24T16:58:25.022Z"
    }
  ]
}
```

### Categories

#### Get All Categories

Menampilkan semua daftar categories

**URL**

```bash
GET /categories
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch All Categories Success",
  "data": [
    {
      "id": "EtY6adzL7xRWd3RUKFpv",
      "title": "food",
      "createdAt": "2024-11-24T16:52:40.591Z",
      "updatedAt": "2024-11-24T16:52:40.591Z"
    },
    {
      "id": "MYuBKBTKH17BPN9lYFNf",
      "createdAt": "2024-11-24T17:05:38.425Z",
      "title": "healthy",
      "updatedAt": "2024-11-24T17:10:45.265Z"
    }
  ]
}
```

### Meals

#### Get Nutrition By Food Name

Mendapatkan nutrisi makanan dari nama makanan

**URL**

```bash
GET /meals/nutrition?food=meatball
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch Meals by Food Name Success",
  "data": [
    {
      "id": "04a88116-a34a-424b-9dd0-8d2553c2530e",
      "Calories": 202,
      "Food Name": "meatball",
      "Serving Size (grams)": 100,
      "createdAt": "2024-12-03T13:46:10.048Z",
      "userId": "20ddEYDvRLEkEfPyC1Fa",
      "nutritions": {
        "Calcium": 46,
        "Dietary Fiber": 0.5,
        "Iron": 1.77,
        "Protein": 12.41,
        "Vitamin A": 15,
        "Vitamin B": 0,
        "Vitamin C": 0.8,
        "Carbohydrate": 7.58
      },
      "updatedAt": "2024-12-04T02:11:05.525Z"
    }
  ]
}
```

### Meals Histories

#### Create Meals Histories

Menambahkan Histories sekaligus dengan analisis Nutrisinya

**URL**

```bash
POST /meals_histories
```

**Headers Request**
| Key | Value |
|--------------|---------------|
| X-Timezone | Asia/Makassar |

**Body Request**

```json
{
  "mealIds": [
    "182457cf-c017-4bf6-9a92-d5bf4633c8fd",
    "18f49a2b-9e04-45e9-9ef1-7c5824fb1de1"
  ]
}
```

**Response Success**

```json
{
  "status": 201,
  "message": "Create Meal History Success",
  "data": {
    "id": "3ff3c08d-2f12-4c80-9f0a-2a0055d07911",
    "total_calories": 435,
    "total_nutrition": {
      "Calcium": 83,
      "Dietary Fiber": 1.4,
      "Iron": 7.62,
      "Protein": 13.86,
      "Vitamin A": 104,
      "Vitamin B": 0,
      "Vitamin C": 3.8,
      "Carbohydrate": 50.72
    },
    "meals_details": [
      {
        "id": "182457cf-c017-4bf6-9a92-d5bf4633c8fd",
        "Calories": 367,
        "Food Name": "red velvet cake",
        "Serving Size (grams)": 100,
        "createdAt": "2024-12-03T13:46:10.042Z",
        "userId": "20ddEYDvRLEkEfPyC1Fa",
        "nutritions": {
          "Calcium": 38,
          "Dietary Fiber": 1.4,
          "Iron": 0.96,
          "Protein": 6.81,
          "Vitamin A": 74,
          "Vitamin B": 0,
          "Vitamin C": 0.1,
          "Carbohydrate": 46.81
        },
        "updatedAt": "2024-12-04T02:11:06.697Z"
      },
      {
        "id": "18f49a2b-9e04-45e9-9ef1-7c5824fb1de1",
        "Calories": 68,
        "Food Name": "oysters",
        "Serving Size (grams)": 100,
        "createdAt": "2024-12-03T13:46:10.041Z",
        "userId": "20ddEYDvRLEkEfPyC1Fa",
        "nutritions": {
          "Calcium": 45,
          "Dietary Fiber": 0,
          "Iron": 6.66,
          "Protein": 7.05,
          "Vitamin A": 30,
          "Vitamin B": 0,
          "Vitamin C": 3.7,
          "Carbohydrate": 3.91
        },
        "updatedAt": "2024-12-04T02:11:06.985Z"
      }
    ],
    "userId": "20ddEYDvRLEkEfPyC1Fa",
    "meal_type": "snack",
    "date": "2024-12-05",
    "createdAt": "2024-12-05T14:49:02.282Z",
    "updatedAt": "2024-12-05T14:49:02.282Z",
    "count": 2,
    "label": "Vitamin A"
  }
}
```

#### Create Manual Meals Histories

Menambahkan Histories secara manual

**URL**

```bash
POST /meals_histories/manual
```

**Headers Request**
| Key | Value |
|--------------|---------------|
| X-Timezone | Asia/Makassar |

**Body Request**

```json
{
  "Calories": 175,
  "Food Name": "testing manual kedua",
  "Serving Size (grams)": 100,
  "nutritions": {
    "Calcium": 14,
    "Dietary Fiber": 1,
    "Iron": 1.28,
    "Protein": 6.96,
    "Vitamin A": 11,
    "Vitamin B": 1,
    "Vitamin C": 0.7,
    "Carbohydrate": 19.25
  }
}
```

**Response Success**

```json
{
  "status": 201,
  "message": "Add Meal Success",
  "data": {
    "id": "5a997544-7156-4bb8-8109-9ea8421afcbc",
    "total_calories": 175,
    "total_nutrition": {
      "Calcium": 14,
      "Dietary Fiber": 1,
      "Iron": 1.28,
      "Protein": 6.96,
      "Vitamin A": 11,
      "Vitamin B": 1,
      "Vitamin C": 0.7,
      "Carbohydrate": 19.25
    },
    "meals_details": [
      {
        "Calories": 175,
        "Food Name": "testing manual kedua",
        "Serving Size (grams)": 100,
        "nutritions": {
          "Calcium": 14,
          "Dietary Fiber": 1,
          "Iron": 1.28,
          "Protein": 6.96,
          "Vitamin A": 11,
          "Vitamin B": 1,
          "Vitamin C": 0.7,
          "Carbohydrate": 19.25
        },
        "id": "6901df25-9b08-4387-a010-3bb5002c4274",
        "userId": "20ddEYDvRLEkEfPyC1Fa",
        "createdAt": "2024-12-07T11:30:39.429Z",
        "updatedAt": "2024-12-07T11:30:39.429Z"
      }
    ],
    "userId": "20ddEYDvRLEkEfPyC1Fa",
    "meal_type": "dinner",
    "date": "2024-12-07",
    "createdAt": "2024-12-07T11:30:39.430Z",
    "updatedAt": "2024-12-07T11:30:39.430Z",
    "count": 1,
    "label": "Carbohydrate"
  }
}
```

#### Searching Meals Histories By Meal Type

Melakukan pencarian history berdasarkan meal_type

**URL**

```bash
GET /meals_histories/search?meal_type=snack
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch Meals Histories Success",
  "data": [
    {
      "id": "3ff3c08d-2f12-4c80-9f0a-2a0055d07911",
      "total_calories": 435,
      "total_nutrition": {
        "Calcium": 83,
        "Dietary Fiber": 1.4,
        "Iron": 7.62,
        "Protein": 13.86,
        "Vitamin A": 104,
        "Vitamin B": 0,
        "Vitamin C": 3.8,
        "Carbohydrate": 50.72
      },
      "meals_details": [
        {
          "id": "182457cf-c017-4bf6-9a92-d5bf4633c8fd",
          "Calories": 367,
          "Food Name": "red velvet cake",
          "Serving Size (grams)": 100,
          "createdAt": "2024-12-03T13:46:10.042Z",
          "userId": "20ddEYDvRLEkEfPyC1Fa",
          "nutritions": {
            "Calcium": 38,
            "Dietary Fiber": 1.4,
            "Iron": 0.96,
            "Protein": 6.81,
            "Vitamin A": 74,
            "Vitamin B": 0,
            "Vitamin C": 0.1,
            "Carbohydrate": 46.81
          },
          "updatedAt": "2024-12-04T02:11:06.697Z"
        },
        {
          "id": "18f49a2b-9e04-45e9-9ef1-7c5824fb1de1",
          "Calories": 68,
          "Food Name": "oysters",
          "Serving Size (grams)": 100,
          "createdAt": "2024-12-03T13:46:10.041Z",
          "userId": "20ddEYDvRLEkEfPyC1Fa",
          "nutritions": {
            "Calcium": 45,
            "Dietary Fiber": 0,
            "Iron": 6.66,
            "Protein": 7.05,
            "Vitamin A": 30,
            "Vitamin B": 0,
            "Vitamin C": 3.7,
            "Carbohydrate": 3.91
          },
          "updatedAt": "2024-12-04T02:11:06.985Z"
        }
      ],
      "userId": "20ddEYDvRLEkEfPyC1Fa",
      "meal_type": "snack",
      "date": "2024-12-05",
      "createdAt": "2024-12-05T14:49:02.282Z",
      "updatedAt": "2024-12-05T14:49:02.282Z",
      "count": 2,
      "label": "Vitamin A"
    }
  ]
}
```

#### Searching Meals Histories By Date

Melakukan pencarian history berdasarkan tanggal

**URL**

```bash
GET /meals_histories/search?date=2024-12-05
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch Meals Histories Success",
  "data": [
    {
      "id": "3ff3c08d-2f12-4c80-9f0a-2a0055d07911",
      "total_calories": 435,
      "total_nutrition": {
        "Calcium": 83,
        "Dietary Fiber": 1.4,
        "Iron": 7.62,
        "Protein": 13.86,
        "Vitamin A": 104,
        "Vitamin B": 0,
        "Vitamin C": 3.8,
        "Carbohydrate": 50.72
      },
      "meals_details": [
        {
          "id": "182457cf-c017-4bf6-9a92-d5bf4633c8fd",
          "Calories": 367,
          "Food Name": "red velvet cake",
          "Serving Size (grams)": 100,
          "createdAt": "2024-12-03T13:46:10.042Z",
          "userId": "20ddEYDvRLEkEfPyC1Fa",
          "nutritions": {
            "Calcium": 38,
            "Dietary Fiber": 1.4,
            "Iron": 0.96,
            "Protein": 6.81,
            "Vitamin A": 74,
            "Vitamin B": 0,
            "Vitamin C": 0.1,
            "Carbohydrate": 46.81
          },
          "updatedAt": "2024-12-04T02:11:06.697Z"
        },
        {
          "id": "18f49a2b-9e04-45e9-9ef1-7c5824fb1de1",
          "Calories": 68,
          "Food Name": "oysters",
          "Serving Size (grams)": 100,
          "createdAt": "2024-12-03T13:46:10.041Z",
          "userId": "20ddEYDvRLEkEfPyC1Fa",
          "nutritions": {
            "Calcium": 45,
            "Dietary Fiber": 0,
            "Iron": 6.66,
            "Protein": 7.05,
            "Vitamin A": 30,
            "Vitamin B": 0,
            "Vitamin C": 3.7,
            "Carbohydrate": 3.91
          },
          "updatedAt": "2024-12-04T02:11:06.985Z"
        }
      ],
      "userId": "20ddEYDvRLEkEfPyC1Fa",
      "meal_type": "snack",
      "date": "2024-12-05",
      "createdAt": "2024-12-05T14:49:02.282Z",
      "updatedAt": "2024-12-05T14:49:02.282Z",
      "count": 2,
      "label": "Vitamin A"
    }
  ]
}
```
