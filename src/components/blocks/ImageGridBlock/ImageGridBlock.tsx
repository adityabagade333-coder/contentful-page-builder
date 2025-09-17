import Image from 'next/image';
import { ImageGridBlock as ImageGridBlockType } from '@/types';
import styles from './ImageGridBlock.module.css';

interface Props {
  block: ImageGridBlockType;
}

export default function ImageGridBlock({ block }: Props) {
  const { images } = block.data;
  const gridImages = images.slice(0, 4);

  return (
    <section className={styles.imageGrid}>
      {/* Add component type label */}
      <div className={styles.componentLabel}>
        🖼️ IMAGE GRID (2x2)
      </div>
      
      <div className={styles.container}>
        <div className={styles.grid}>
          {gridImages.map((image, index) => (
            <div key={image.sys.id} className={`${styles.gridItem} ${styles[`item${index + 1}`]}`}>
              <Image
                src={image.url}
                alt={image.description || image.title}
                width={image.width || 400}
                height={image.height || 300}
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}