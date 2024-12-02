import { redirect } from "next/navigation";
import setupLocatorUI from "@locator/runtime";

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

// This page only renders when the app is built statically (output: 'export')
export const metadata = {
  title: "MetaBitcoin Network",
  description: "The MetaBitcoin Network, centered on the BTC chain, can dynamically link other Bitcoin isomorphic chains, forming a scalable network. It fully solves Bitcoin's expansion issue and enables building a Bitcoin-based Web3 network for 80 billion people globally to use.",
};

export default function RootPage() {
  redirect("/en");
}
