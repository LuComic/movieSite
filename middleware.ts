export { default } from "next-auth/middleware";

export const config = { matcher: [
  "/all",
  "/all-watched",
  "/all-watchlist",
  "/movies",
  "/movies-watched",
  "/movies-watchlist",
  "/series",
  "/series-watched",
  "/series-watchlist",
  "/top-3",
  "/top-all",
  "/home"
]}