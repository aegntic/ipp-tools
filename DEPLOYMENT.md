# IPP.TOOLS Platform Deployment Guide

This document provides comprehensive instructions for deploying the IPP.TOOLS multi-domain platform architecture to Netlify, with optimized cross-domain tracking and conversion analytics.

## Deployment Architecture

The platform uses a sophisticated multi-domain deployment strategy:

- **Main Hub**: `ipp.tools` - Central authority positioning ecosystem
- **VibeCascade Framework**: `vibecascade.ipp.tools` - Engagement optimization framework
- **Future Frameworks**:
  - **NeuralNarrative**: `neuralnarrative.ipp.tools`
  - **PrimalPositioning**: `primalposition.ipp.tools`
  - **QuantumConversion**: `quantumconversion.ipp.tools`

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Netlify CLI (`npm install -g netlify-cli`)
- Netlify account with access to domain settings
- Ownership of `ipp.tools` domain

## Deployment Options

### Automated Deployment

The repository includes an automated deployment script that handles the entire process:

```bash
# Deploy all sites
npm run deploy

# Deploy only the main hub
npm run deploy:ipp

# Deploy only the VibeCascade framework
npm run deploy:vibecascade
```

The script will:

1. Authenticate with Netlify if needed
2. Build the specified sites
3. Deploy to Netlify
4. Configure custom domains
5. Validate the deployment

### Manual Deployment

If you prefer to deploy manually, follow these steps:

#### 1. Build the sites

```bash
# Build all sites
npm run build:all

# Build only the main hub
npm run build:ipp

# Build only the VibeCascade framework
npm run build:vibecascade
```

#### 2. Deploy to Netlify

```bash
# Install Netlify CLI if needed
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy main hub
netlify deploy --prod --dir=dist --site=ipp-tools-main

# Deploy VibeCascade framework
netlify deploy --prod --dir=dist/vibecascade --site=vibecascade-framework
```

## Domain Configuration

### DNS Setup

Configure your DNS provider with the following records:

1. **Main domain (`ipp.tools`)**:
   - Add an A record pointing to Netlify's load balancer IP
   - Add CNAME records for `www` subdomain

2. **Framework subdomains**:
   - Add CNAME records for each framework subdomain (e.g., `vibecascade.ipp.tools`) pointing to the respective Netlify site

### Netlify Domain Settings

1. Go to the Netlify site settings for each site
2. Under "Domain management", add the custom domain
3. Verify the domain ownership
4. Enable HTTPS for all domains

## Environment Variables

The platform requires several environment variables to function correctly. Configure these in the Netlify site settings:

```
VITE_API_URL=https://api.ipp.tools
VITE_API_VERSION=v1
VITE_ANALYTICS_ID=G-XXXXXXXX
VITE_FACEBOOK_PIXEL_ID=XXXXXXXXXX
VITE_ENABLE_PSYCHOLOGICAL_TRIGGERS=true
```

## Cross-Domain Tracking

The platform includes sophisticated cross-domain tracking capabilities that maintain user journey continuity across all framework subdomains. This tracking system:

1. Uses a shared cookie on the `.ipp.tools` domain
2. Maintains local storage backups for offline capabilities
3. Syncs data when connectivity is restored
4. Provides framework-specific attribution

No additional configuration is required as this is built into the codebase.

## Performance Monitoring

After deployment, monitor the performance metrics:

1. Access Netlify Analytics for each site
2. Check conversion metrics in your analytics platform
3. Verify cross-domain tracking is working correctly
4. Analyze page load times and Core Web Vitals

## Troubleshooting

### Domain Issues

- **DNS propagation**: DNS changes can take up to 48 hours to propagate worldwide
- **HTTPS errors**: Ensure your domains are properly verified and HTTPS is enabled

### Build Failures

- **Node version**: Ensure you're using Node.js 18.x or higher
- **Missing dependencies**: Run `npm install` before building

### Tracking Issues

- **Cookie blocking**: The cross-domain tracking requires cookies to be enabled
- **Local storage limits**: Clear local storage if you encounter storage limit errors

## Scaling the Platform

As the platform grows, consider these scaling strategies:

1. **Edge caching**: Enable Netlify's edge caching for improved performance
2. **Serverless functions**: Implement serverless functions for dynamic features
3. **CDN optimization**: Configure CDN settings for global distribution
4. **API rate limiting**: Implement rate limiting for the tracking API

## Security Considerations

The platform includes several security features:

1. **Content Security Policy**: Browser security policy is configured in the Netlify headers
2. **CSRF protection**: All forms include CSRF protection
3. **XSS prevention**: Content is properly sanitized to prevent XSS attacks
4. **API key protection**: API keys are stored as environment variables

## Ongoing Maintenance

Regular maintenance ensures optimal performance:

1. **Dependency updates**: Regularly update dependencies with `npm update`
2. **Security patches**: Apply security patches promptly
3. **Analytics review**: Regularly review analytics data for optimization opportunities
4. **Performance audits**: Conduct performance audits using Lighthouse