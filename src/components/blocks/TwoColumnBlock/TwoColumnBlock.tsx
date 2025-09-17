import Image from 'next/image';
import Link from 'next/link';
import { TwoColumnBlock as TwoColumnBlockType } from '@/types';
import styles from './TwoColumnBlock.module.css';

interface Props {
  block: TwoColumnBlockType;
}

export default function TwoColumnBlock({ block }: Props) {
  const { heading, subtitle, ctaText, ctaUrl, image } = block.data;

  return (
    <section className={styles.twoColumn}>
      {/* Add component type label */}
      <div className={styles.componentLabel}>
        📝 TWO COLUMN BLOCK
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <Link href={ctaUrl} className={styles.cta}>
            {ctaText}
          </Link>
        </div>
        
        <div className={styles.imageWrapper}>
          <Image
            src={image.url}
            alt={image.description || image.title}
            width={image.width || 600}
            height={image.height || 400}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}