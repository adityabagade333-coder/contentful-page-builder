import Image from 'next/image';
import Link from 'next/link';
import { HeroBlock as HeroBlockType } from '@/types';
import styles from './HeroBlock.module.css';

interface Props {
  block: HeroBlockType;
}

export default function HeroBlock({ block }: Props) {
  const { heading, subtitle, ctaText, ctaUrl, backgroundImage } = block.data;

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.description || backgroundImage.title}
          fill
          sizes="100vw"
          priority
          className={styles.backgroundImage}
        />
        <div className={styles.overlay} />
      </div>
      
      {/* Add component type label */}
      <div className={styles.componentLabel}>
        🏆 HERO SECTION
      </div>
      
      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <Link href={ctaUrl} className={styles.cta}>
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}