import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllLandingPages, getLandingPageBySlug, getAssets } from '@/lib/contentful';
import { generatePageMetadata, generateStructuredData } from '@/lib/seo';
import { ParsedLandingPage, LayoutConfig, BlockType, Asset } from '@/types';
import HeroBlock from '@/components/blocks/HeroBlock/HeroBlock';
import TwoColumnBlock from '@/components/blocks/TwoColumnBlock/TwoColumnBlock';
import ImageGridBlock from '@/components/blocks/ImageGridBlock/ImageGridBlock';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for SSG
export async function generateStaticParams() {
  const pages = await getAllLandingPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);
  if (!page) return { title: 'Page Not Found' };

  const parsedPage: ParsedLandingPage = {
    ...page,
    layoutConfig: JSON.parse(page.layoutConfig || '{"blocks":[]}'),
  };

  return generatePageMetadata(parsedPage);
}

// Helper function to collect all asset IDs from blocks
function collectAssetIds(blocks: BlockType[]): string[] {
  const assetIds: string[] = [];
  
  blocks.forEach(block => {
    switch (block.type) {
      case 'hero':
        if (block.data.backgroundImage?.sys?.id) {
          assetIds.push(block.data.backgroundImage.sys.id);
        }
        break;
      case 'twoColumn':
        if (block.data.image?.sys?.id) {
          assetIds.push(block.data.image.sys.id);
        }
        break;
      case 'imageGrid':
        block.data.images?.forEach(img => {
          if (img.sys?.id) assetIds.push(img.sys.id);
        });
        break;
    }
  });
  
  return [...new Set(assetIds)]; // Remove duplicates
}

// Helper function to map asset data to blocks
function hydrateBlocksWithAssets(blocks: BlockType[], assets: Asset[]): BlockType[] {
  const assetMap = new Map(assets.map(asset => [asset.sys.id, asset]));
  
  return blocks.map(block => {
    switch (block.type) {
      case 'hero':
        const heroAsset = assetMap.get(block.data.backgroundImage?.sys?.id);
        return heroAsset ? {
          ...block,
          data: { ...block.data, backgroundImage: heroAsset }
        } : block;
        
      case 'twoColumn':
        const twoColAsset = assetMap.get(block.data.image?.sys?.id);
        return twoColAsset ? {
          ...block,
          data: { ...block.data, image: twoColAsset }
        } : block;
        
      case 'imageGrid':
        const hydratedImages = block.data.images
          .map(img => assetMap.get(img.sys?.id))
          .filter(Boolean) as Asset[];
        return {
          ...block,
          data: { ...block.data, images: hydratedImages }
        };
        
      default:
        return block;
    }
  });
}

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);
  
  if (!page) {
    notFound();
  }

  const layoutConfig: LayoutConfig = JSON.parse(page.layoutConfig || '{"blocks":[]}');
  
  // Collect all asset IDs and fetch assets
  const assetIds = collectAssetIds(layoutConfig.blocks);
  const assets = assetIds.length > 0 ? await getAssets(assetIds) : [];
  
  // Hydrate blocks with actual asset data
  const hydratedBlocks = hydrateBlocksWithAssets(layoutConfig.blocks, assets);
  
  const parsedPage: ParsedLandingPage = {
    ...page,
    layoutConfig: { blocks: hydratedBlocks },
  };

  const structuredData = generateStructuredData(parsedPage);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([structuredData.webPage, structuredData.breadcrumb]),
        }}
      />
      
      {/* Render blocks in order */}
      {parsedPage.layoutConfig.blocks.map((block) => {
        switch (block.type) {
          case 'hero':
            return <HeroBlock key={block.id} block={block} />;
          case 'twoColumn':
            return <TwoColumnBlock key={block.id} block={block} />;
          case 'imageGrid':
            return <ImageGridBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
      
      {/* Show message if no blocks */}
      {parsedPage.layoutConfig.blocks.length === 0 && (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#666' }}>
          <h2>No content blocks found</h2>
          <p>Use the page builder in Contentful to add components to this page.</p>
        </div>
      )}
    </>
  );
}