import styles from "./css/F1NewsItemCard.module.css";
import { useEffect, useRef, useState } from "react";

export default function F1NewsItemCard(props) {
  const pubDate = new Date(props.item.pubDate).toLocaleDateString();
  const [featuredMedia, setFeaturedMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const featuredMediaUrl = props.item.featured_media;

  useEffect(() => {
    if (featuredMediaUrl) {
      fetch(featuredMediaUrl)
        .then((response) => response.json())
        .then((data) => {
          setFeaturedMedia(
            data["media_details"]["sizes"]["medium"]["source_url"]
          );
          setIsLoading(false); // Set loading state to false after image is fetched
        })
        .catch((error) => {
          console.error("Error fetching featured media:", error);
          setIsLoading(false); // Set loading state to false in case of error
        });
    }
  }, [featuredMediaUrl]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imagecontainer}>
          <a href={props.item.url}>
            {isLoading ? ( // Render a loading state while image is being fetched
              <div className={styles.loadingImage}>Loading...</div>
            ) : (
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${featuredMedia})`,
                }}
              />
            )}
          </a>
        </div>
        <div className={styles.right}>
          <div className={styles.content}>
            <a href={props.item.url} className={styles.link}>
              <div
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: props.item.title }}
              />
            </a>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: props.item.excerpt }}
            />
          </div>
          <div className={styles.footer}>
            <div className={styles.creatordate}>
              <div className={styles.creator}>admin</div>|
              <div className={styles.date}>{pubDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
