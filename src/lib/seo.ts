import { Metadata } from 'next';
import { ParsedLandingPage } from '@/types';

export function generatePageMetadata(page: ParsedLandingPage): Metadata {
  const title = page.seoTitle || page.title;
  const description = page.seoDescription || `Landing page: ${page.title}`;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/landing/${page.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Page Builder',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateStructuredData(page: ParsedLandingPage) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.seoDescription || `Landing page: ${page.title}`,
    url: `${baseUrl}/landing/${page.slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Landing Pages',
        item: `${baseUrl}/landing`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title,
        item: `${baseUrl}/landing/${page.slug}`,
      },
    ],
  };

  return {
    webPage: webPageSchema,
    breadcrumb: breadcrumbSchema,
  };
}