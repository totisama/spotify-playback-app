# 🎵 SpotyPlayer

_A Spotify-like music player built with Next.js 14, TypeScript, and the Spotify API._

---

## 🚀 Features

✅ Fetch and display **followed artists** from Spotify.
✅ Global search.
✅ Fetch **user profile information**.
✅ Play and control Spotify music using the **Web Playback SDK**.
✅ Implement **error handling** and **Suspense** for smooth loading.
✅ Responsive and modern **UI using Tailwind CSS**.

---

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **React**
- **TypeScript**
- **Spotify API**
- **ShadCN UI**
- **Tailwind CSS**
- **React-Error-Boundary**

---

## 📦 Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/totisama/spotify-playback-app
   cd spotify-playback-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file and add the following:

   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Authentication & API Access

To use the **Spotify API**, you must:

- Create a Spotify **Developer Account**: [Spotify Developer Portal](https://developer.spotify.com/dashboard/)
- Register your application.
- Set the **Redirect URI** to `http://localhost:3000/`.
- Request the required **OAuth Scopes**:
  - `user-read-playback-state`
  - `user-modify-playback-state`
  - `user-read-private`
  - `user-follow-read`
  - `user-read-email`
  - `streaming`
- You will need to generate a Refresh Token manually and set it.

---

## 🧪 Deployment

**[https://spotify-playback-app.vercel.app](https://spotify-playback-app.vercel.app)**

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ⭐ Acknowledgments

Special thanks to **Spotify Developer API** for providing music data and playback capabilities.
