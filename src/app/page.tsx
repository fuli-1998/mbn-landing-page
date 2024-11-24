import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Header */}
      <header className="w-full h-24 fixed top-0 z-50 bg-stone-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="text-2xl font-bold">MBN</div>
          <nav className="hidden md:flex items-center gap-12">
            <Link
              href="#what"
              className="text-white text-base font-semibold leading-loose"
            >
              What&apos;s MBN
            </Link>
            <Link
              href="#comparing"
              className="text-white text-base font-normal leading-loose"
            >
              Comparing
            </Link>
            <Link
              href="#why"
              className="text-white text-base font-normal leading-loose"
            >
              Why Important
            </Link>
            <Link
              href="#how"
              className="text-white text-base font-normal leading-loose"
            >
              How It Works
            </Link>
            <Link
              href="#faq"
              className="text-white text-base font-normal leading-loose"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <span className="text-white text-base font-normal leading-loose">
              CN
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="what"
        className="pt-24 min-h-screen flex items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-700/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-amber-600/40 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-semibold leading-tight mb-8">
              What Is <br />
              MetaBitcoin Network
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-12">
              The MetaBitcoin Network, centered on the BTC chain, can
              dynamically link other Bitcoin isomorphic chains, forming a
              scalable network. It fully solves Bitcoin&apos;s expansion issue and
              enables building a Bitcoin-based Web3 network for 80 billion
              people globally to use.
            </p>
            <div className="space-y-6">
              {[
                "Entirely built on Bitcoin's tech and consensus, skipping the need for new inventions.",
                "Able to hook up with mainstream UTXO chains, skipping hefty dev or new public chain launches.",
                "It drives dynamic, limitless expansion, bearing the world's daily Web3 needs.",
                "It can fully utilize the infrastructures of other side chains, such as layer-one smart contracts or layer-two EVMs.",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-5 h-5 mt-1 rounded-full bg-amber-500 flex-shrink-0"></div>
                  <p className="flex-1 text-white text-lg font-medium leading-7">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BTC Scalability Section */}
      <section
        id="comparing"
        className="py-20 bg-gradient-to-b from-stone-950 to-neutral-900"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-5xl font-semibold mb-6">
                <span className="text-white">BTC Scalability</span>
                <span className="text-amber-500"> Boosts</span>
              </h2>
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/placeholder.svg"
                  alt="Bitcoin"
                  width={24}
                  height={24}
                  className="w-16 h-16"
                />
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
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
                src="/placeholder.svg"
                alt="BTC Scalability"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-stone-900">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-semibold mb-12 text-center">
            Bitcoin Scalability Solutions Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-stone-800">
                  <th className="p-4 text-left">Represent</th>
                  <th className="p-4 text-left">On-chain Expansion Plan</th>
                  <th className="p-4 text-left">Off-chain Expansion Plan</th>
                  <th className="p-4 text-left">Fork Expansion Plan</th>
                  <th className="p-4 text-left bg-amber-600/10">
                    MetaBitcoin Plan
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Scalability", "Low", "High", "Middle", "High"],
                  ["Suitable for building Web3", "No", "No", "No", "Yes"],
                  ["Technical Difficulty", "High", "Middle", "High", "Middle"],
                  ["Security", "High", "Low", "High", "High"],
                  [
                    "Friendly to Bitcoin miners",
                    "Amicable",
                    "No Amicable",
                    "Amicable",
                    "Amicable",
                  ],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-stone-800">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`p-4 ${j === 4 ? "bg-amber-600/10" : ""}`}
                      >
                        {cell}
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
      <section
        id="why"
        className="py-20 bg-gradient-to-b from-stone-900 to-neutral-900"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-semibold mb-12 text-center">
            Why is it important
          </h2>
          <p className="text-center text-lg mb-12">
            Briefly speaking, MBN enables Bitcoin to...
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                A Web3 world for 8 billion people can be built on Bitcoin
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                Based on the trust of Bitcoin, leveraging its characteristics
                and potential to meet the needs of a large number of users and
                achieve Web3 functional innovations such as identity
                authentication and value exchange.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Bitcoin and native Bitcoin assets can be atomically transferred
                to other side chains.
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
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
      <section id="how" className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-semibold mb-12 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Utilize existing compliant UTXO public chains
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Existing compliant UTXO public chains are the bedrock. Mature,
                  stable, they slash costs & time. Nodes & power, ready-made.
                  Their models, a springboard for complex apps.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  UTXO multi-chain bridge: Wrapping & Mapping
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  The UTXO multi-chain asset bridge, with its Wrapping function,
                  breaks the barriers between chains to package assets. The
                  Mapping function establishes mappings to ensure the integrity
                  of information and promote the smooth flow of assets.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Rollup UTXO chain asset Mapping to BTC main chain
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Rollup operation pools UTXO chains&apos; asset mappings to BTC main
                  chain, boosting efficiency, easing load, ensuring info
                  reliability via BTC&apos;s authority, and augmenting network
                  scalability and user trust.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Compliant MBN side chains
                </h3>
                <ul className="list-disc list-inside text-white/70 space-y-2">
                  <li>MVC (MicrovisionChain) and its replica chains</li>
                  <li>FB (Fractal Bitch) and its replica chains</li>
                  <li>BCH (Bitcoin Cash)</li>
                  <li>BSV (Bitcoin SV)</li>
                  <li>XEC (ECash)</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  MBN side chain formation conditions
                </h3>
                <ol className="list-decimal list-inside text-white/70 space-y-2">
                  <li>It is a permissionless public chain.</li>
                  <li>
                    It is isomorphic to Bitcoin, including adopting the UTXO
                    architecture and supporting Legacy addresses, etc.
                  </li>
                  <li>
                    It adopts the SHA256 mining algorithm and the average
                    computing power within 30 days is not lower than 10 ph/s.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 bg-gradient-to-b from-neutral-900 to-stone-950"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-semibold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title:
                  "Is MetaBitcoin Network a specific blockchain? Does it have project tokens?",
                content:
                  "MBN isn't a specific blockchain or project. It's a simple and feasible plan to expand the Bitcoin network. It forms a Bitcoin-based Web3 solution by leveraging the already launched UTXO public chains and technologies, along with appropriate asset bridges and data Rollup schemes...",
              },
              {
                title:
                  "Why does MetaBitcoin Network connect UTXO public chains like MVC and BCH?",
                content:
                  "MBN can be compatible with most of the mainstream UTXO public chains nowadays, including BCH, BSV, FB and MVC, etc. MBN has no preference for any UTXO public chains that meet the standards. MBN will link the mainstream UTXO public chains and their replica chains. Ultimately, ...",
              },
              {
                title:
                  "What's the relationship between MetaBitcoin Network and MetaID?",
                content:
                  "MetaBitcoin is a Bitcoin expansion plan proposed by the MetaID protocol team. The MetaID protocol is a Web3 construction plan designed for Bitcoin. Based on the MetaID protocol, various Web3 applications can be developed in the Bitcoin ecosystem, such as...",
              },
              {
                title:
                  "What's the relationship between MetaBitcoin Network and FB?",
                content:
                  "Some of the goals and visions of MBN and FB are the same. They both aim to expand Bitcoin and do so by connecting other chains with BTC as the core. However, there are three main differences:...",
              },
            ].map((faq, i) => (
              <Card
                key={i}
                className="bg-stone-800 border-
stone-700"
              >
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">{faq.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {faq.content}
                  </p>
                  <Button variant="link" className="text-amber-500 p-0">
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-stone-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70 text-sm mb-4 md:mb-0">
              MetaBitcoin Network Copyright @2024
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {[
                "MetaID Protocol Labs",
                "MVC DAO",
                "Metalet Team",
                "Octopus Team",
              ].map((item, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-white/70 text-sm hover:text-white transition-colors"
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
