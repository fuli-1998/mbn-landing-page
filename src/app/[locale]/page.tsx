"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Globe,
  ArrowRight,
  Share2,
  Film,
  Maximize,
  Network,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#what", label: "What's MBN" },
    { href: "#comparing", label: "Comparing" },
    { href: "#why", label: "Why Important" },
    { href: "#how", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="w-full h-24 fixed top-0 z-[100] bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="md:hidden mr-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="text-2xl font-bold cursor-pointer text-white">
            MBN
          </div>
        </div>

        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-x-12 bg-[rgba(155,124,104,0.05)] px-[60px] py-2.5 rounded-full">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`text-white/90 text-base ${
                  index === 0 ? "font-semibold" : "font-normal"
                } leading-loose hover:text-orange-500 transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 right-0 bg-black/90 backdrop-blur-md p-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block py-2 text-white/90 text-base font-normal leading-loose hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
              <span className="sr-only">Toggle language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black/90 backdrop-blur-md border-stone-800"
          >
            <DropdownMenuItem className="text-white/90 hover:text-orange-500">
              English
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white/90 hover:text-orange-500">
              中文
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default function Home() {
  const features = [
    "Entirely built on Bitcoin's tech and consensus, skipping the need for new inventions.",
    "Able to hook up with mainstream UTXO chains, skipping hefty dev or new public chain launches.",
    "It drives dynamic, limitless expansion, bearing the world's daily Web3 needs.",
    "It can fully utilize the infrastructures of other side chains, such as layer-one smart contracts or layer-two EVMs.",
  ];

  const renderFeatures = () => {
    return features.map((feature, index) => (
      <div key={index} className="flex items-start gap-4">
        <div className="w-5 h-5 mt-1 rounded-full bg-orange-500 flex-shrink-0"></div>
        <p className="flex-1 text-white/90 text-lg font-medium leading-7">
          {feature}
        </p>
      </div>
    ));
  };

  const comparisonData = [
    {
      label: "Represent",
      values: ["BTC Segwit", "Lightning Network", "BCH", "MBN"],
    },
    {
      label: "Scalability",
      values: ["Low", "High", "Middle", "High"],
    },
    {
      label: "Suitable for building Web3",
      values: ["No", "No", "No", "Yes"],
    },
    {
      label: "Technical Difficulty",
      values: ["High", "Middle", "High", "Middle"],
    },
    {
      label: "Security",
      values: ["High", "Low", "High", "High"],
    },
    {
      label: "Friendly to Bitcoin miners",
      values: ["Amicable", "No Amicable", "Amicable", "Amicable"],
    },
    {
      label: "BTC Asset Circulation",
      values: ["Amicable", "No Amicable", "No Amicable", "Amicable"],
    },
    {
      label: "Support Smart Contract Expansion",
      values: [
        "Not supported",
        "Partially Supported",
        "Partially Supported",
        "Supported",
      ],
    },
  ];

  const renderFAQs = () => {
    const faqs = [
      {
        title:
          "Is MetaBitcoin Network a specific blockchain? Does it have project tokens?",
        content:
          "MBN isn't a specific blockchain or project. It's a simple and feasible plan to expand the Bitcoin network. It forms a Bitcoin-based Web3 solution by leveraging the already launched UTXO public chains and technologies, along with appropriate asset bridges and data Rollup schemes...",
      },
      {
        title:
          "What's the relationship between MetaBitcoin Network and MetaID?",
        content:
          "MetaBitcoin is a Bitcoin expansion plan proposed by the MetaID protocol team. The MetaID protocol is a Web3 construction plan designed for Bitcoin. Based on the MetaID protocol, various Web3 applications can be developed in the Bitcoin ecosystem, such as...",
      },
      {
        title:
          "Why does MetaBitcoin Network connect UTXO public chains like MVC and BCH?",
        content:
          "MBN can be compatible with most of the mainstream UTXO public chains nowadays, including BCH, BSV, FB and MVC, etc. MBN has no preference for any UTXO public chains that meet the standards. MBN will link the mainstream UTXO public chains and their replica chains. Ultimately, ...",
      },
      {
        title: "What's the relationship between MetaBitcoin Network and FB?",
        content:
          "Some of the goals and visions of MBN and FB are the same. They both aim to expand Bitcoin and do so by connecting other chains with BTC as the core. However, there are three main differences:...",
      },
    ];

    return faqs.map((faq, i) => (
      <Card
        key={i}
        className="bg-black/40 backdrop-blur-md border-stone-800 hover:border-orange-500/50 transition-colors"
      >
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 text-white/90">
            {faq.title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            {faq.content}
          </p>
          <Button
            variant="link"
            className="text-orange-500 p-0 flex items-center hover:text-orange-400 transition-colors"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    ));
  };

  const howItWorksCards = [
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Utilize existing compliant UTXO public chains",
      description:
        "Existing compliant UTXO public chains are the bedrock. Mature, stable, they slash costs & time. Nodes & power, ready-made. Their models, a springboard for complex apps.",
    },
    {
      icon: <Film className="h-6 w-6" />,
      title: "UTXO multi-chain bridge: Wrapping & Mapping",
      description:
        "The UTXO multi-chain asset bridge, with its Wrapping function, breaks the barriers between chains to package assets. The Mapping function establishes mappings to ensure the integrity of information and promote the smooth flow of assets.",
    },
    {
      icon: <Maximize className="h-6 w-6" />,
      title: "Rollup UTXO chain asset Mapping to BTC main chain",
      description:
        "Rollup operation pools UTXO chains' asset mappings to BTC main chain, boosting efficiency, easing load, ensuring info reliability via BTC's authority, and augmenting network scalability and user trust.",
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Compliant MBN side chains",
      description:
        "MVC (MicroVisionChain) and its replica chains, FB (Fractal BTC) and its replica chains, BCH (Bitcoin Cash), BSV (Bitcoin SV), XEC (eCash)",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "MBN Side Chain Formation Conditions",
      description:
        "It is a Permissionless Public Chain, It is homophylic To Bitcoin, Including Adopting The UTXO Architecture And Supporting Legacy Addresses, Etc",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth pt-16 md:pt-24">
      <Header />

      {/* Hero Section */}
      <section
        id="what"
        className="scroll-mt-16 md:scroll-mt-24 min-h-screen flex items-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/space-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-8 text-white/90">
              What Is MetaBitcoin Network
            </h1>
            <p className="text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed mb-12">
              The MetaBitcoin Network, centered on the BTC chain, can
              dynamically link other Bitcoin isomorphic chains, forming a
              scalable network. It fully solves Bitcoin&apos;s expansion issue
              and enables building a Bitcoin-based Web3 network for 80 billion
              people globally to use.
            </p>
            <div className="space-y-6 bg-[#9B7C68]/10 p-6 rounded-xl">
              {renderFeatures()}
            </div>
          </div>
        </div>
      </section>

      {/* MetaID Boosts Section */}
      {/* MetaID Boosts Section */}
      <section
        id="comparing"
        className="scroll-mt-16 md:scroll-mt-24 py-12 md:py-20 bg-gradient-to-b from-black to-stone-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <div className="flex flex-col items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
                  <Image
                    src="/METAID.svg"
                    alt="MetaID"
                    width={48}
                    height={96}
                    className="w-8 h-16 md:w-12 md:h-24"
                  />
                  <span className="text-orange-500"> Boosts</span>
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
                  <Image
                    src="/Bitcoin.svg"
                    alt="Bitcoin"
                    width={48}
                    height={48}
                    className="w-8 h-8 md:w-12 md:h-12"
                  />
                  <span className="text-white/90">BTC Scalability</span>
                </h2>
              </div>
              <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                MetaID supercharges BTC&apos;s trading flow via novel tech and
                architecture. It streamlines storage-verification, slashing
                redundancies for a speed boost. With smart resource
                distribution, it equalizes high-traffic node loads, banishing
                jams and lags. Thus, BTC can juggle more trades, handling small
                and large sums with ease, broadening its application and
                fortifying its stability.
              </p>
            </div>
            <div className="flex-1">
              <Image
                src="/puzzle.png"
                alt="BTC Scalability"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Comparison Table */}
      {/* Comparison Table */}
      <section className="scroll-mt-16 md:scroll-mt-24 py-12 md:py-20 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 md:mb-12 text-center text-white/90">
            Bitcoin Scalability Solutions Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-stone-800">
                  <th className="p-3 md:p-4 text-left text-white/90 text-xs md:text-sm">
                    Category
                  </th>
                  <th className="p-3 md:p-4 text-left text-white/90 text-xs md:text-sm">
                    On-chain Expansion Plan
                  </th>
                  <th className="p-3 md:p-4 text-left text-white/90 text-xs md:text-sm">
                    Off-chain Expansion Plan
                  </th>
                  <th className="p-3 md:p-4 text-left text-white/90 text-xs md:text-sm">
                    Fork Expansion Plan
                  </th>
                  <th className="p-3 md:p-4 text-left bg-orange-500/10 text-white/90 text-xs md:text-sm">
                    MetaBitcoin Plan
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-b border-stone-800">
                    <td className="p-3 md:p-4 text-white/70 text-xs md:text-sm">
                      {row.label}
                    </td>
                    {row.values.map((value, j) => (
                      <td
                        key={j}
                        className={`p-3 md:p-4 ${
                          j === 3 ? "bg-orange-500/10" : ""
                        } text-white/70 text-xs md:text-sm`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Important Section */}
      {/* Why Important Section */}
      <section
        id="why"
        className="scroll-mt-16 pt-24 md:scroll-mt-24 py-12 md:py-20 relative overflow-hidden"
        style={{
          backgroundImage: "url('/galaxy-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 md:mb-8 text-center text-white/90">
            Why is it important
          </h2>
          <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl mb-8 md:mb-12 text-white/70">
            Briefly speaking, MBN enables Bitcoin to...
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-xl border border-stone-800">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 text-white/90">
                A Web3 world for 8 billion people can be built on Bitcoin
              </h3>
              <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                Based on the trust of Bitcoin, leveraging its characteristics
                and potential to meet the needs of a large number of users and
                achieve Web3 functional innovations such as identity
                authentication and value exchange.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-xl border border-stone-800">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 text-white/90">
                Bitcoin and native Bitcoin assets can be atomically transferred
                to other side chains.
              </h3>
              <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                Atomic transfer ensures the security and integrity of assets
                through cryptographic algorithms and smart contracts. It
                increases the flexibility of use, allowing the selection of a
                trading environment according to the characteristics of the side
                chain, such as a side chain with low fees, a side chain for
                industrial applications, etc. This promotes the development of
                the side chain ecosystem, brings value and liquidity, and
                attracts developers and users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {/* How It Works Section */}
      <section
        id="how"
        className="scroll-mt-16 md:scroll-mt-24 py-12 md:py-20 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-purple-500/5 to-orange-500/5"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 md:mb-12 text-center text-white/90">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {howItWorksCards.map((card, index) => (
              <Card
                key={index}
                className="bg-black/40 backdrop-blur-md border-stone-800"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                    <div className="text-orange-500">{card.icon}</div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4 text-white/90">
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* FAQ Section */}
      <section
        id="faq"
        className="scroll-mt-16 md:scroll-mt-24 py-12 md:py-20 relative overflow-hidden"
        style={{
          backgroundImage: "url('/faq-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 md:mb-12 text-center text-white/90">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {renderFAQs()}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="py-6 md:py-8 bg-black border-t border-stone-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70 text-xs md:text-sm mb-4 md:mb-0">
              MetaBitcoin Network Copyright @2024
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              {[
                "MetaID Protocol Labs",
                "MVC DAO",
                "Metalet Team",
                "Octopus Team",
              ].map((item, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-white/70 text-xs md:text-sm hover:text-orange-500 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
