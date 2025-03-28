const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://alex-store-backend.vercel.app/routes"
    : "http://localhost:5000/routes";

export default API_URL;
