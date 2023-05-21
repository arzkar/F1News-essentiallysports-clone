import request from "request";

const News_URL = "https://f1con.com/wp-json/wp/v2/posts?per_page=100";
const USER_AGENT =
  "Mozilla/5.0 (compatible; F1NewsAPI/1.0; +arzkar.dev@gmail.com)";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    const options = {
      url: News_URL,
      headers: {
        "User-Agent": USER_AGENT,
      },
    };

    request(options, (err, resp, body) => {
      if (err === null) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).end(body);
      } else {
        res.status(500).end();
      }
      resolve();
    });
  });
}
