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

  - [Create User](#create-user)
  - [Get All Users](#get-all-users)
  - [Get User By ID](#get-user-by-id)
  - [Update User](#update-user)
  - [Delete User](#delete-user)

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
  "message": "Registrasi successfully",
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
    "id": "F0IlvW7LKOENPIbHuiac",
    "username": "nyoman",
    "email": "nyoman@gmail.com",
    "password": "$2b$10$9qVoqVDUzUzc7KRMGJYuge8zfuYp5ck5heGvFhwPxcb.qtt/TK/Mq"
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
      "password": "$2b$08$qZ0t8cCfhkM7HQkjqNzwmOFSWnWi2/dwbRZPjMYn80QK31JV.uVYG"
    },
    {
      "id": "5Z0i6jz8De06zs3B01WG",
      "username": "testting1",
      "email": "testing1@gmail.com",
      "password": "$2b$10$HqtIEz2IV6Ir1K3uJdilAu3pVBQqGoMt3R0Kc0a3IcI3impgbsc.K"
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
    "id": "CdF6VTUg97a3mey8Qr1p",
    "username": "update",
    "password": "$2b$08$989nZcy8LDI5TSR20ODHSeMVwqfCrymgeF2Zdf9mcPDngoySaC5ZS",
    "email": "update18@gmail.com"
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
