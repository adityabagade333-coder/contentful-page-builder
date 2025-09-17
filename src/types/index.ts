// Asset types for Contentful images
export interface Asset {
  sys: {
    id: string;
  };
  url: string;
  title: string;
  width?: number;
  height?: number;
  description?: string;
}

// Block data interfaces
export interface HeroBlockData {
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage: Asset;
}

export interface TwoColumnBlockData {
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  image: Asset;
}

export interface ImageGridBlockData {
  images: Asset[]; // Exactly 4 images for 2x2 grid
}

// Block type definitions
export interface HeroBlock {
  id: string;
  type: 'hero';
  data: HeroBlockData;
}

export interface TwoColumnBlock {
  id: string;
  type: 'twoColumn';
  data: TwoColumnBlockData;
}

export interface ImageGridBlock {
  id: string;
  type: 'imageGrid';
  data: ImageGridBlockData;
}

export type BlockType = HeroBlock | TwoColumnBlock | ImageGridBlock;

// Layout configuration
export interface LayoutConfig {
  blocks: BlockType[];
}

// Landing page from Contentful
export interface LandingPage {
  sys: {
    id: string;
  };
  title: string;
  slug: string;
  layoutConfig: string; // JSON string from Contentful
  seoTitle?: string;
  seoDescription?: string;
}

// Parsed landing page with layout config as object
export interface ParsedLandingPage extends Omit<LandingPage, 'layoutConfig'> {
  layoutConfig: LayoutConfig;
}

// Drag and drop
export interface DragItem {
  id: string;
  type: 'hero' | 'twoColumn' | 'imageGrid';
  index?: number;
}