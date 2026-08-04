import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdfkit resolves its .afm font files via __dirname at runtime; bundling it
  // with webpack rewrites __dirname and breaks that lookup (ENOENT on Helvetica.afm)
  serverExternalPackages: ["pdfkit"],
};

export default withPayload(nextConfig);
