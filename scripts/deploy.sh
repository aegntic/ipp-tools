#!/bin/bash
# Netlify-Optimized Deployment Pipeline for IPP.TOOLS Platform
# This script automates the multi-domain deployment process

set -e  # Exit immediately if a command fails

# Text formatting
bold=$(tput bold)
green=$(tput setaf 2)
blue=$(tput setaf 4)
yellow=$(tput setaf 3)
red=$(tput setaf 1)
reset=$(tput sgr0)

function print_header() {
  echo "${blue}${bold}=== $1 ===${reset}"
}

function print_success() {
  echo "${green}✓ $1${reset}"
}

function print_info() {
  echo "${blue}ℹ $1${reset}"
}

function print_warning() {
  echo "${yellow}⚠ $1${reset}"
}

function print_error() {
  echo "${red}✗ $1${reset}"
  exit 1
}

# Check for netlify-cli installation
if ! command -v netlify &> /dev/null; then
  print_warning "Netlify CLI not found. Installing..."
  npm install -g netlify-cli
fi

# Ensure logged into Netlify
print_header "Checking Netlify authentication"
if ! netlify status &> /dev/null; then
  print_warning "Not authenticated with Netlify. Please login:"
  netlify login
else
  print_success "Already authenticated with Netlify"
fi

# Build environment setup
print_header "Setting up build environment"
NODE_ENV="production"
print_info "NODE_ENV: $NODE_ENV"

# Check if we're deploying a specific site or all sites
DEPLOY_SITE=${1:-"all"}
print_info "Deployment target: $DEPLOY_SITE"

# Build configuration
print_header "Building project"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  print_info "Installing dependencies..."
  npm install
  print_success "Dependencies installed"
else
  print_info "Dependencies already installed"
fi

# Function to deploy a specific site
deploy_site() {
  local site_name=$1
  local build_command=$2
  local publish_dir=$3
  local domain=$4
  
  print_header "Deploying $site_name to $domain"
  
  # Run build for this site
  print_info "Building $site_name..."
  npm run $build_command
  
  # Check if site exists in Netlify
  site_id=$(netlify sites:list | grep "$site_name" | awk '{print $1}')
  
  if [ -z "$site_id" ]; then
    print_info "Site not found. Creating new site..."
    netlify sites:create -n "$site_name"
    site_id=$(netlify sites:list | grep "$site_name" | awk '{print $1}')
  fi
  
  # Deploy to Netlify
  print_info "Deploying to Netlify..."
  netlify deploy --site="$site_id" --prod --dir="$publish_dir"
  
  # Check custom domain
  print_info "Checking custom domain..."
  domain_check=$(netlify domain:list --site="$site_id" | grep "$domain" || echo "")
  
  if [ -z "$domain_check" ]; then
    print_warning "Custom domain not configured. Adding..."
    netlify domain:add "$domain" --site="$site_id"
  else
    print_success "Custom domain already configured: $domain"
  fi
  
  print_success "$site_name deployed successfully to $domain"
}

# Deploy main hub site (ipp.tools)
if [ "$DEPLOY_SITE" == "all" ] || [ "$DEPLOY_SITE" == "ipp" ]; then
  npm run build:ipp
  deploy_site "ipp-tools-main" "build:ipp" "dist" "ipp.tools"
fi

# Deploy VibeCascade framework site
if [ "$DEPLOY_SITE" == "all" ] || [ "$DEPLOY_SITE" == "vibecascade" ]; then
  npm run build:vibecascade
  deploy_site "vibecascade-framework" "build:vibecascade" "dist/vibecascade" "vibecascade.ipp.tools"
fi

# Post-deployment validation
print_header "Post-deployment validation"

# Function to validate site is responding
validate_site() {
  local domain=$1
  print_info "Validating $domain..."
  
  # Wait for DNS to propagate (simple delay)
  sleep 5
  
  # Check if site is responding
  if curl -s -o /dev/null -w "%{http_code}" "https://$domain" | grep -q "200\|301\|302"; then
    print_success "$domain is responding correctly"
  else
    print_warning "$domain might not be configured correctly. Please check DNS settings."
  fi
}

# Validate each deployed site
if [ "$DEPLOY_SITE" == "all" ] || [ "$DEPLOY_SITE" == "ipp" ]; then
  validate_site "ipp.tools"
fi

if [ "$DEPLOY_SITE" == "all" ] || [ "$DEPLOY_SITE" == "vibecascade" ]; then
  validate_site "vibecascade.ipp.tools"
fi

print_header "Deployment Summary"
print_success "Deployment completed successfully"
print_info "Main site: https://ipp.tools"
print_info "VibeCascade: https://vibecascade.ipp.tools"
print_info "Deployment logs are available in the Netlify dashboard"

echo ""
print_info "To monitor conversion metrics, visit:"
print_info "https://app.netlify.com/sites/ipp-tools-main/analytics"

# Make this script executable with:
# chmod +x scripts/deploy.sh
# 
# Run it with:
# ./scripts/deploy.sh          # Deploy all sites
# ./scripts/deploy.sh ipp      # Deploy only main site
# ./scripts/deploy.sh vibecascade # Deploy only VibeCascade framework site