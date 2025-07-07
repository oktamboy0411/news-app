import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/navbar.tsx", [
    route("", "routes/home.tsx"),
    route("/news", "routes/news.tsx"),
    route("/news/:newsId", "routes/news_item.tsx"),
    route("/news/add", "routes/news_add.tsx"),
    route("/about", "routes/about.tsx"),
  ]),
] satisfies RouteConfig;
