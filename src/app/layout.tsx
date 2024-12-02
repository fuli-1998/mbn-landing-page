import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>MetaBitcoin Network</title>
        <meta
          name="description"
          content="The MetaBitcoin Network, centered on the BTC chain, can dynamically link other Bitcoin isomorphic chains, forming a scalable network. It fully solves Bitcoin's expansion issue and enables building a Bitcoin-based Web3 network for 80 billion people globally to use."
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
