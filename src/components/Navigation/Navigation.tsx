import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Page Builder
        </Link>
        
        <div className={styles.links}>
          <Link 
            href="/landing/page-1" 
            className={`${styles.link} ${pathname === '/landing/page-1' ? styles.active : ''}`}
          >
            Page 1
          </Link>
          <Link 
            href="/landing/page-2" 
            className={`${styles.link} ${pathname === '/landing/page-2' ? styles.active : ''}`}
          >
            Page 2
          </Link>
        </div>
      </div>
    </nav>
  );
}