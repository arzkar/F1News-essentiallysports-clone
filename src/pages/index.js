import styles from "../styles/Home.module.css";

import F1NewsItemCard from "../components/F1NewsItemCard";

export async function getServerSideProps(context) {
  const apiUrl =
    "https://f1-news-essentiallysports-clone-tcco.vercel.app/api/proxy";

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch data from ${apiUrl}. Status: ${res.status}`
      );
    }

    const data = await res.json();
    const processedData = processData(data);
    return {
      props: { data: processedData },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: { data: null },
    };
  }
}

function processData(data) {
  const processedData = data.map((item) => {
    return {
      title: item.title.rendered,
      pubDate: item.date,
      content: item.content.rendered,
      excerpt: item.excerpt.rendered,
      featured_media: item["_links"]["wp:featuredmedia"][0].href,
      url: item.link,
    };
  });

  return processedData;
}

export default function Home(props) {
  const items = props.data;
  return (
    <div>
      <div className={styles.header}>
        <a href="https://www.essentiallysports.com">
          <img
            className={styles.logo}
            src="https://image-cdn.essentiallysports.com/wp-content/uploads/es_horizontal-1.png"
            alt=""
          />
        </a>
      </div>
      <main style={{ paddingTop: "50px" }}>
        <div>
          <h1>One Thing Charles Doesn't Have: Leclerc Given a Reality Check</h1>
        </div>
        <p>
          After Miami blunders, ex-Ferrari manager highlights Charles Leclerc's
          weakness, claiming if he can handle it, he can break the Monaco jinx.
        </p>
        <p>
          Charles Leclerc has had a brilliant start to the 2022 Formula 1
          season, winning two races and finishing on the podium in four others.
          However, the Monegasque driver has also made some costly mistakes,
          most notably in the recent Miami Grand Prix.
        </p>
        <p>
          In Miami, Leclerc qualified on pole position but lost the lead to Max
          Verstappen at the start of the race. He then made a mistake while
          trying to overtake the Dutchman and ended up crashing out of the race.
        </p>
        <p>
          Leclerc's former Ferrari manager, Jean Todt, has now warned the young
          driver that he needs to learn from his mistakes if he wants to win the
          championship.
        </p>
        <p>
          "Charles is a very talented driver, but he needs to learn to control
          his emotions," Todt told Motorsport Week. "He made a mistake in Miami
          and he needs to learn from that. If he can do that, he will be a world
          champion."
        </p>
        <p>
          Leclerc will have a chance to bounce back from his Miami
          disappointment at the next race in Barcelona. The Spanish Grand Prix
          is a track that Ferrari has traditionally been strong at, so Leclerc
          will be hoping to get back to winning ways.
        </p>
        <p>
          If Leclerc can win in Barcelona, it will send a strong message to the
          rest of the field that he is still the driver to beat in 2022.
        </p>
        <div className={styles.container}>
          <div className={styles.body}>
            <h3>Trending</h3>
            <div className={styles.news}>
              {items.map((item) => (
                <div className={styles.newsitem} key={item.title}>
                  <F1NewsItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <p>
          When discussing Verstappen, Ferrari emphasized that the Dutchman has
          completed his learning process and is a complete package at this
          point. He added, “I was there when he got his first victory in
          Barcelona. He made his mistakes after that, his accidents. Now he is
          young and already has a lot of experience. He is a great driver who is
          now at the peak of his career.”
        </p>
        <p>
          <strong styles="margin:0px;display:initial">
            WATCH THIS STORY:{" "}
            <a
              href="https://www.essentiallysports.com/stories/f1-news-watch-charles-leclercs-spinning-high-speed-crash-at-the-2023-miami-gp-qualifying/"
              class="jsx-2b55705d932ea6e9"
            >
              Charles Leclerc’s Spinning High Speed Crash at the 2023 Miami GP
              Qualifying
            </a>
          </strong>
        </p>
        <p styles="font-size:16px;line-height:24px;font-weight:400;margin-left:16px;margin-right:16px">
          Do you believe that Charles Leclerc will reflect on his errors and
          learn patience in order to break the jinx?
        </p>
      </main>
    </div>
  );
}
