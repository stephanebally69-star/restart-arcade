import type { NextConfig } from 'next'

// GitHub Pages sert le site sous /<repo>/ ; en local ou sur domaine propre, basePath vide.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
