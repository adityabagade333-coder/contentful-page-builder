import { GraphQLClient } from 'graphql-request';
import { LandingPage, Asset } from '@/types';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

// GraphQL Queries
const GET_LANDING_PAGES = `
  query GetLandingPages {
    landingPageCollection {
      items {
        sys {
          id
        }
        title
        slug
        layoutConfig
        seoTitle
        seoDescription
      }
    }
  }
`;

const GET_LANDING_PAGE_BY_SLUG = `
  query GetLandingPageBySlug($slug: String!) {
    landingPageCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        layoutConfig
        seoTitle
        seoDescription
      }
    }
  }
`;

const GET_ASSETS = `
  query GetAssets($ids: [String!]) {
    assetCollection(where: { sys: { id_in: $ids } }) {
      items {
        sys {
          id
        }
        url
        title
        width
        height
        description
      }
    }
  }
`;

export async function getAllLandingPages(): Promise<LandingPage[]> {
  try {
    const data = await client.request<{ landingPageCollection: { items: LandingPage[] } }>(GET_LANDING_PAGES);
    return data.landingPageCollection.items;
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    return [];
  }
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  try {
    const data = await client.request<{ landingPageCollection: { items: LandingPage[] } }>(
      GET_LANDING_PAGE_BY_SLUG,
      { slug }
    );
    return data.landingPageCollection.items[0] || null;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

export async function getAssets(ids: string[]): Promise<Asset[]> {
  if (!ids.length) return [];
  
  try {
    const data = await client.request<{ assetCollection: { items: Asset[] } }>(GET_ASSETS, { ids });
    return data.assetCollection.items;
  } catch (error) {
    console.error('Error fetching assets:', error);
    return [];
  }
}