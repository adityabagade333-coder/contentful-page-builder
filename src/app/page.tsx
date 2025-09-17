import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Contentful Page Builder
        </h1>
        <p className={styles.description}>
          Build dynamic landing pages with drag-and-drop components powered by Contentful
        </p>
        <div className={styles.links}>
          <Link href="/landing/page-1" className={styles.primaryLink}>
            View Page 1
          </Link>
          <Link href="/landing/page-2" className={styles.secondaryLink}>
            View Page 2
          </Link>
        </div>
      </div>
      
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>🎨 Drag & Drop Builder</h3>
          <p>Visually arrange components with an intuitive interface</p>
        </div>
        <div className={styles.feature}>
          <h3>⚡ Static Generation</h3>
          <p>Lightning-fast pages built at compile time</p>
        </div>
        <div className={styles.feature}>
          <h3>📱 Responsive Design</h3>
          <p>Perfect on all devices with modern CSS</p>
        </div>
      </div>
    </div>
  );
}