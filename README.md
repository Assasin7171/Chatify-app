# Chatify - Fullstack Chat Application

Chatify to nowoczesna aplikacja do czatowania w czasie rzeczywistym, zbudowana z wykorzystaniem stosu MERN (MongoDB, Express, React, Node.js) oraz Socket.io.

## 🚀 Funkcjonalności

- **Autoryzacja użytkowników:** Rejestracja, logowanie i wylogowywanie (JWT + Cookies).
- **Czat w czasie rzeczywistym:** Natychmiastowe przesyłanie wiadomości dzięki Socket.io.
- **Status Online:** Możliwość sprawdzenia, którzy użytkownicy są obecnie dostępni.
- **Przesyłanie obrazów:** Integracja z Cloudinary do wysyłania zdjęć w wiadomościach.
- **Powiadomienia:** Dźwiękowe powiadomienia o nowych wiadomościach.
- **Zarządzanie profilem:** Możliwość aktualizacji zdjęcia profilowego.
- **Responsywny interfejs:** Zbudowany z React, Tailwind CSS i DaisyUI.

## 🛠️ Technologia

### Backend
- **Node.js & Express:** Serwer i API.
- **MongoDB & Mongoose:** Baza danych.
- **Socket.io:** Komunikacja dwukierunkowa w czasie rzeczywistym.
- **JWT & Cookie-parser:** Bezpieczna autoryzacja.
- **Cloudinary:** Przechowywanie zdjęć.
- **Bcryptjs:** Szyfrowanie haseł.

### Frontend
- **React:** Biblioteka UI.
- **Zustand:** Zarządzanie stanem aplikacji.
- **Tailwind CSS & DaisyUI:** Stylizacja interfejsu.
- **React Router:** Nawigacja.
- **Axios:** Komunikacja z API.
- **Lucide React:** Ikony.

## ⚙️ Instalacja i konfiguracja

### Wymagania
- Node.js zainstalowany na komputerze.
- Konto MongoDB (Atlas lub lokalnie).
- Konto Cloudinary (do obsługi zdjęć).

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/Assasin7171/Chatify-app.git
cd Chatify-app
```

### 2. Konfiguracja Backend
Przejdź do katalogu backend i zainstaluj zależności:
```bash
cd backend
npm install
```
Utwórz plik `.env` w katalogu `backend/` i uzupełnij go:
```env
MONGODB_URI=twoj_uri_mongodb
JWT_SECRET=twoj_sekret_jwt
PORT=3000
CLOUDINARY_CLOUD_NAME=twoja_nazwa
CLOUDINARY_API_KEY=twoj_klucz_api
CLOUDINARY_API_SECRET=twoj_sekret_api
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Konfiguracja Frontend
Przejdź do katalogu frontend i zainstaluj zależności:
```bash
cd ../frontend
npm install
```

## 🏃 Uruchamianie aplikacji

### Tryb deweloperski

**Uruchom backend:**
```bash
cd backend
npm run dev
```

**Uruchom frontend:**
```bash
cd frontend
npm run dev
```
Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

## 📦 Budowa na produkcję
Możesz zbudować cały projekt jednym poleceniem z głównego katalogu:
```bash
npm run build
```
Następnie uruchom serwer:
```bash
npm start
```
