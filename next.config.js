/**
 * Next.js configuration for using date-fns-toolkit
 * Include this file in your Next.js projects that use date-fns-toolkit
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fix for module format conflict with date-fns-toolkit
    config.module.rules.push({
      test: /node_modules\/date-fns-toolkit\/dist\/index\.esm\.js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      },
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          sourceType: 'unambiguous'
        }
      }
    });
    
    return config;
  }
};

module.exports = nextConfig; 