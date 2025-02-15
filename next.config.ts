import createNextIntlPlugin from "next-intl/plugin";
import { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
};

export default withNextIntl(nextConfig);
