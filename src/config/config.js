const config = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://tu-backend.vercel.app/api"
      : "http://localhost:5000/api",
  imageStorage:
    process.env.NODE_ENV === "production"
      ? "https://tu-storage.vercel.app"
      : "http://localhost:5000",
};

export default config;
