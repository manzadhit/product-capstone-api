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
  "message": "Register Succesfully",
  "data": {
    "userId": "ae31b9c8-f4df-456f-801c-c8da78e28320",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFlMzFiOWM4LWY0ZGYtNDU2Zi04MDFjLWM4ZGE3OGUyODMyMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMzODkyNTc2fQ.gWwwJwy0HwQaraYsqoqds0zr15q0AbjCYJBTwEhzLRo"
  }
}
```

#### Login

Login menggunakan email dan password

**URL**

```bash
POST /auth/login
```

**Body Request**

```json
{
  "email": "john.doe@example.com",
  "password": "johndoe123"
}
```

**Response Success**

```json
{
  "status": 200,
  "message": "Login Successfully",
  "data": {
    "user": {
      "id": "ae31b9c8-f4df-456f-801c-c8da78e28320",
      "username": "John Doe",
      "email": "john.doe@example.com",
      "password": "$2b$08$zp.Xg.5eWX9S84fht2QHcOsxcN0cmwYvRD8A9In/zSBOa78h6uyiO",
      "role": "user",
      "createdAt": "2024-12-11T04:49:36.141Z",
      "updatedAt": "2024-12-11T04:49:36.141Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFlMzFiOWM4LWY0ZGYtNDU2Zi04MDFjLWM4ZGE3OGUyODMyMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMzODkyNjM5fQ.CLGrw0e-dmRJkMhUsZRHW2gppfThwsGmCDs5AnLdUFk"
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
  "password": "johndoe123",
  "role": "user"
}
```

**Response Success**

```json
{
  "status": 201,
  "message": "Create User Success",
  "data": {
    "userId": "ae31b9c8-f4df-456f-801c-c8da78e28320"
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
      "id": "7525cdc2-5461-4c8a-923f-eff698f41147",
      "title": "Foods That Energize and Enhance Mental Focus",
      "description": "Ever experienced that feeling of tiredness like you are running out of fuel half through the day? If the afternoons lull gets you scavenging for that sugary junk or downing another cup of coffee, maybe it is time of altering your options.",
      "categories": ["healthy", "food"],
      "url": "https://medium.com/@franz_70100/foods-that-energize-and-enhance-mental-focus-783f827524a1",
      "image": "https://storage.googleapis.com/news-nutricheck/news_images/1733893276189_Foods That Energize.jpg",
      "createdAt": "2024-12-11T05:01:16.539Z",
      "updatedAt": "2024-12-11T05:01:16.539Z"
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
      "id": "5db47021-0fda-4c4e-8190-6d0e22c8baad",
      "title": "Foods That Energize and Enhance Mental Focus",
      "description": "Ever experienced that feeling of tiredness like you are running out of fuel half through the day? If the afternoons lull gets you scavenging for that sugary junk or downing another cup of coffee, maybe it is time of altering your options.",
      "categories": [
        "6b8652eb-86dd-49d6-b3bf-ff488dc279c3",
        "c91ef267-b2ff-4da0-9b08-eba28b448817"
      ],
      "url": "https://medium.com/@franz_70100/foods-that-energize-and-enhance-mental-focus-783f827524a1",
      "image": "https://storage.googleapis.com/news-nutricheck/news_images/1733893498137_Foods That Energize.jpg",
      "createdAt": "2024-12-11T05:04:58.468Z",
      "updatedAt": "2024-12-11T05:04:58.468Z"
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
      "id": "5db47021-0fda-4c4e-8190-6d0e22c8baad",
      "title": "Foods That Energize and Enhance Mental Focus",
      "description": "Ever experienced that feeling of tiredness like you are running out of fuel half through the day? If the afternoons lull gets you scavenging for that sugary junk or downing another cup of coffee, maybe it is time of altering your options.",
      "categories": ["healthy", "food"],
      "url": "https://medium.com/@franz_70100/foods-that-energize-and-enhance-mental-focus-783f827524a1",
      "image": "https://storage.googleapis.com/news-nutricheck/news_images/1733893498137_Foods That Energize.jpg",
      "createdAt": "2024-12-11T05:04:58.468Z",
      "updatedAt": "2024-12-11T05:04:58.468Z"
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
      "id": "6b8652eb-86dd-49d6-b3bf-ff488dc279c3",
      "createdAt": "2024-12-11T04:31:39.545Z",
      "title": "healthy",
      "updatedAt": "2024-12-11T05:04:42.141Z"
    },
    {
      "id": "a1bc394d-e7d9-4882-a920-066508147458",
      "title": "Recipes",
      "createdAt": "2024-12-11T04:36:26.381Z",
      "updatedAt": "2024-12-11T04:36:26.381Z"
    },
    {
      "id": "c91ef267-b2ff-4da0-9b08-eba28b448817",
      "title": "food",
      "createdAt": "2024-12-11T04:31:48.321Z",
      "updatedAt": "2024-12-11T04:31:48.321Z"
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
      "id": "caeee0e8-4b62-4ba8-b760-f4d9597dce93",
      "Food Name": "Meatball",
      "Serving Size (grams)": 100,
      "Calories": 202,
      "nutritions": {
        "Calcium": 46,
        "DietaryFiber": 0.5,
        "Iron": 1.77,
        "Protein": 12.41,
        "VitaminA": 15,
        "VitaminB": 0,
        "VitaminC": 0.8,
        "Carbohydrate": 7.58
      },
      "image": "https://storage.googleapis.com/meals_images_nutricheck/gambar%20makanan/Meatball.jpg",
      "createdAt": "2024-12-11T04:41:54.156Z",
      "updatedAt": "2024-12-11T04:41:54.156Z",
      "userId": "7b9d290f-17b3-499b-afbd-ae4009d18a83"
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
  "mealIds": ["0033d7fb-f41a-4814-82bd-878acf69b3a4"]
}
```

**Response Success**

```json
{
  "status": 201,
  "message": "Create Meal History Success",
  "data": {
    "id": "8f7f9632-0279-4e96-a1a0-d4da7eb1a821",
    "total_calories": 308,
    "total_nutrition": {
      "Calcium": 27,
      "DietaryFiber": 1.7,
      "Iron": 1.78,
      "Protein": 4.67,
      "VitaminA": 45,
      "VitaminB": 0,
      "VitaminC": 4.5,
      "Carbohydrate": 32.21
    },
    "meals_details": [
      {
        "id": "0033d7fb-f41a-4814-82bd-878acf69b3a4",
        "Food Name": "Samosa",
        "Serving Size (grams)": 100,
        "Calories": 308,
        "nutritions": {
          "Calcium": 27,
          "DietaryFiber": 1.7,
          "Iron": 1.78,
          "Protein": 4.67,
          "VitaminA": 45,
          "VitaminB": 0,
          "VitaminC": 4.5,
          "Carbohydrate": 32.21
        },
        "image": "https://storage.googleapis.com/meals_images_nutricheck/gambar%20makanan/Samosa.jpg",
        "createdAt": "2024-12-11T04:41:54.155Z",
        "updatedAt": "2024-12-11T04:41:54.155Z",
        "userId": "7b9d290f-17b3-499b-afbd-ae4009d18a83"
      }
    ],
    "userId": "ae31b9c8-f4df-456f-801c-c8da78e28320",
    "meal_type": "lunch",
    "date": "2024-12-11",
    "createdAt": "2024-12-11T04:55:57.165Z",
    "updatedAt": "2024-12-11T04:55:57.165Z",
    "count": 1,
    "label": "VitaminA"
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
  "Food Name": "indomie",
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
    "id": "8f7f9632-0279-4e96-a1a0-d4da7eb1a821",
    "total_calories": 483,
    "total_nutrition": {
      "Calcium": 41,
      "DietaryFiber": 1.7,
      "Iron": 3.06,
      "Protein": 11.63,
      "VitaminA": 45,
      "VitaminB": 0,
      "VitaminC": 4.5,
      "Carbohydrate": 51.46
    },
    "meals_details": [
      {
        "id": "0033d7fb-f41a-4814-82bd-878acf69b3a4",
        "Food Name": "Samosa",
        "Serving Size (grams)": 100,
        "Calories": 308,
        "nutritions": {
          "Calcium": 27,
          "DietaryFiber": 1.7,
          "Iron": 1.78,
          "Protein": 4.67,
          "VitaminA": 45,
          "VitaminB": 0,
          "VitaminC": 4.5,
          "Carbohydrate": 32.21
        },
        "image": "https://storage.googleapis.com/meals_images_nutricheck/gambar%20makanan/Samosa.jpg",
        "createdAt": "2024-12-11T04:41:54.155Z",
        "updatedAt": "2024-12-11T04:41:54.155Z",
        "userId": "7b9d290f-17b3-499b-afbd-ae4009d18a83"
      },
      {
        "Calories": 175,
        "Food Name": "indomie",
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
        "image": "",
        "id": "473013fb-b9c5-405f-9962-0773d6ee7791",
        "userId": "ae31b9c8-f4df-456f-801c-c8da78e28320",
        "createdAt": "2024-12-11T04:57:40.004Z",
        "updatedAt": "2024-12-11T04:57:40.004Z"
      }
    ],
    "count": 2,
    "label": "Carbohydrate",
    "userId": "ae31b9c8-f4df-456f-801c-c8da78e28320",
    "meal_type": "lunch",
    "date": "2024-12-11",
    "createdAt": "2024-12-11T04:55:57.165Z",
    "updatedAt": "2024-12-11T04:57:40.004Z"
  }
}
```

#### Searching Meals Histories By Meal Type

Melakukan pencarian history berdasarkan meal_type

**URL**

```bash
GET /meals_histories/search?meal_type=lunch
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch Meals Histories Success",
  "data": [
    {
      "id": "8f7f9632-0279-4e96-a1a0-d4da7eb1a821",
      "userId": "ae31b9c8-f4df-456f-801c-c8da78e28320",
      "meal_type": "lunch",
      "date": "2024-12-11",
      "createdAt": "2024-12-11T04:55:57.165Z",
      "total_nutrition": {
        "Calcium": 41,
        "DietaryFiber": 1.7,
        "Iron": 3.06,
        "Protein": 11.63,
        "VitaminA": 45,
        "VitaminB": 0,
        "VitaminC": 4.5,
        "Carbohydrate": 51.46
      },
      "total_calories": 483,
      "count": 2,
      "meals_details": [
        {
          "id": "0033d7fb-f41a-4814-82bd-878acf69b3a4",
          "Food Name": "Samosa",
          "Serving Size (grams)": 100,
          "Calories": 308,
          "nutritions": {
            "Calcium": 27,
            "DietaryFiber": 1.7,
            "Iron": 1.78,
            "Protein": 4.67,
            "VitaminA": 45,
            "VitaminB": 0,
            "VitaminC": 4.5,
            "Carbohydrate": 32.21
          },
          "image": "https://storage.googleapis.com/meals_images_nutricheck/gambar%20makanan/Samosa.jpg",
          "createdAt": "2024-12-11T04:41:54.155Z",
          "updatedAt": "2024-12-11T04:41:54.155Z",
          "userId": "7b9d290f-17b3-499b-afbd-ae4009d18a83"
        },
        {
          "Calories": 175,
          "Food Name": "indomie",
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
          "image": "",
          "id": "473013fb-b9c5-405f-9962-0773d6ee7791",
          "userId": "ae31b9c8-f4df-456f-801c-c8da78e28320",
          "createdAt": "2024-12-11T04:57:40.004Z",
          "updatedAt": "2024-12-11T04:57:40.004Z"
        }
      ],
      "label": "Carbohydrate",
      "updatedAt": "2024-12-11T04:57:40.004Z"
    }
  ]
}
```

#### Searching Meals Histories By Date

Melakukan pencarian history berdasarkan tanggal

**URL**

```bash
GET /meals_histories/search?date=2024-12-11
```

**Response Success**

```json
{
  "status": 200,
  "message": "Fetch Meals Histories Success",
  "data": [
    {
      "id": "8f7f9632-0279-4e96-a1a0-d4da7eb1a821",
      "userId": "ae31b9c8-f4df-456f-801c-c8da78e28320",
      "meal_type": "lunch",
      "date": "2024-12-11",
      "createdAt": "2024-12-11T04:55:57.165Z",
      "total_nutrition": {
        "Calcium": 41,
        "DietaryFiber": 1.7,
        "Iron": 3.06,
        "Protein": 11.63,
        "VitaminA": 45,
        "VitaminB": 0,
        "VitaminC": 4.5,
        "Carbohydrate": 51.46
      },
      "total_calories": 483,
      "count": 2,
      "meals_details": [
        {
          "id": "0033d7fb-f41a-4814-82bd-878acf69b3a4",
          "Food Name": "Samosa",
          "Serving Size (grams)": 100,
          "Calories": 308,
          "nutritions": {
            "Calcium": 27,
            "DietaryFiber": 1.7,
            "Iron": 1.78,
            "Protein": 4.67,
            "VitaminA": 45,
            "VitaminB": 0,
            "VitaminC": 4.5,
            "Carbohydrate": 32.21
          },
          "image": "https://storage.googleapis.com/meals_images_nutricheck/gambar%20makanan/Samosa.jpg",
          "createdAt": "2024-12-11T04:41:54.155Z",
          "updatedAt": "2024-12-11T04:41:54.155Z",
          "userId": "7b9d290f-17b3-499b-afbd-ae4009d18a83"
        },
        {
          "Calories": 175,
          "Food Name": "indomie",
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
          "image": "",
          "id": "473013fb-b9c5-405f-9962-0773d6ee7791",
          "userId": "ae31b9c8-f4df-456f-801c-c8da78e28320",
          "createdAt": "2024-12-11T04:57:40.004Z",
          "updatedAt": "2024-12-11T04:57:40.004Z"
        }
      ],
      "label": "Carbohydrate",
      "updatedAt": "2024-12-11T04:57:40.004Z"
    }
  ]
}
```
