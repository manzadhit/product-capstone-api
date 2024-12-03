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

  <!-- - [Create Meal](#create-meal) -->
  - [Searching Meals](#searching-meals)

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

<!-- #### Create Meal

Menambahkan Makanan beserta Nutrisinya

**URL**

```bash
POST /meals
```

**Body Request**

```json
{
  "Calories": 202,
  "Food Name": "meatball",
  "Serving Size": "100 g",
  "Serving Size (grams)": 100,
  "nutritions": {
    "Calcium": 46,
    "Dietary Fiber": 0.5,
    "Iron": 1.77,
    "Protein": 12.41,
    "Total Carbohydrate": 7.58,
    "Vitamin A": 15,
    "Vitamin B": 0,
    "Vitamin C": 0.8
  }
}
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
``` -->

#### Searching Meals

Melakukan pencarian makanan

**URL**

```bash
GET /meals/nutrition?food=foodName
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
      "Serving Size": "100 g",
      "Serving Size (grams)": 100,
      "nutritions": {
        "Calcium": 46,
        "Dietary Fiber": 0.5,
        "Iron": 1.77,
        "Protein": 12.41,
        "Total Carbohydrate": 7.58,
        "Vitamin A": 15,
        "Vitamin B": 0,
        "Vitamin C": 0.8
      },
      "createdAt": "2024-12-03T13:46:10.048Z",
      "updatedAt": "2024-12-03T13:46:10.048Z",
      "userId": "20ddEYDvRLEkEfPyC1Fa"
    }
  ]
}
```
