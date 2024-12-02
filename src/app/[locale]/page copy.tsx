"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
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
  const t = useTranslations();

  const navItems = [
    { href: "#what", label: t("nav.whatsMBN") },
    { href: "#comparing", label: t("nav.comparing") },
    { href: "#why", label: t("nav.whyImportant") },
    { href: "#how", label: t("nav.howItWorks") },
    { href: "#faq", label: t("nav.faq") },
  ];

  return (
    <header className="w-full h-24 fixed top-0 z-50 bg-stone-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="md:hidden mr-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            MBN
          </div>
        </div>

        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-x-12 bg-[rgba(155,124,104,0.10)] px-[60px] py-2.5 rounded-full">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`text-white text-base ${
                  index === 0 ? "font-semibold" : "font-normal"
                } leading-loose hover:text-amber-500 transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 right-0 bg-stone-950/90 backdrop-blur-md p-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block py-2 text-white text-base font-normal leading-loose hover:text-amber-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-white" />
              <span className="sr-only">Toggle language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>中文</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default function Home() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const featureKeys = [
    "hero.features.0",
    "hero.features.1",
    "hero.features.2",
    "hero.features.3",
  ];
  const features = featureKeys.map((key) => t(key));

  const renderFeatures = () => {
    return features.map((feature, index) => (
      <div key={index} className="flex items-start gap-4">
        <div className="w-5 h-5 mt-1 rounded-full bg-amber-500 flex-shrink-0"></div>
        <p className="flex-1 text-white text-lg font-medium leading-7">
          {feature}
        </p>
      </div>
    ));
  };

  const renderList = (key: string, count: number) => {
    const listKeys = Array.from({ length: count }, (_, i) => `${key}.${i}`);
    return listKeys.map((listKey, index) => <li key={index}>{t(listKey)}</li>);
  };

  const renderFAQs = () => {
    const faqKeys = ["faq.questions.0", "faq.questions.1", "faq.questions.2", "faq.questions.3"];
    return faqKeys.map((key, i) => {
      const title = t(`${key}.title`);
      const content = t(`${key}.content`);
      return (
        <Card key={i} className="bg-stone-800 border-stone-700">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {content}
            </p>
            <Button variant="link" className="text-amber-500 p-0">
              {t("faq.learnMore")}
            </Button>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <Header />
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
              {t("hero.title")}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-12">
              {t("hero.description")}
            </p>
            <div className="space-y-6">{renderFeatures()}</div>
          </div>
        </div>
      </section>

      <section
        id="comparing"
        className="py-20 bg-gradient-to-b from-stone-950 to-neutral-900"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-5xl font-semibold mb-6">
                <span className="text-white">{t("comparing.title1")}</span>
                <span className="text-amber-500">{t("comparing.title2")}</span>
              </h2>
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/Bitcoin.svg"
                  alt="Bitcoin"
                  width={24}
                  height={24}
                  className="w-16 h-16"
                />
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                {t("comparing.description")}
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

      <section className="py-20 bg-stone-900">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-semibold mb-12 text-center">
            {t("comparison.title")}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-stone-800">
                  <th className="p-4 text-left">
                    {t("comparison.table.represent")}
                  </th>
                  <th className="p-4 text-left">
                    {t("comparison.table.onChain")}
                  </th>
                  <th className="p-4 text-left">
                    {t("comparison.table.offChain")}
                  </th>
                  <th className="p-4 text-left">
                    {t("comparison.table.fork")}
                  </th>
                  <th className="p-4 text-left bg-amber-600/10">
                    {t("comparison.table.mbn")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    t("comparison.row1.scalability"),
                    t("comparison.row1.low"),
                    t("comparison.row1.high"),
                    t("comparison.row1.middle"),
                    t("comparison.row1.high"),
                  ],
                  [
                    t("comparison.row2.web3"),
                    t("comparison.row2.no"),
                    t("comparison.row2.no"),
                    t("comparison.row2.no"),
                    t("comparison.row2.yes"),
                  ],
                  [
                    t("comparison.row3.difficulty"),
                    t("comparison.row3.high"),
                    t("comparison.row3.middle"),
                    t("comparison.row3.high"),
                    t("comparison.row3.middle"),
                  ],
                  [
                    t("comparison.row4.security"),
                    t("comparison.row4.high"),
                    t("comparison.row4.low"),
                    t("comparison.row4.high"),
                    t("comparison.row4.high"),
                  ],
                  [
                    t("comparison.row5.miners"),
                    t("comparison.row5.amicable"),
                    t("comparison.row5.noAmicable"),
                    t("comparison.row5.amicable"),
                    t("comparison.row5.amicable"),
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

      <section
        id="why"
        className="py-20 bg-gradient-to-b from-stone-900 to-neutral-900"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-semibold mb-12 text-center">
            {t("why.title")}
          </h2>
          <p className="text-center text-lg mb-12">{t("why.description")}</p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                {t("why.point1.title")}
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                {t("why.point1.description")}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                {t("why.point2.title")}
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                {t("why.point2.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-semibold mb-12 text-center">
            {t("how.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {t("how.point1.title")}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t("how.point1.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {t("how.point2.title")}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t("how.point2.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {t("how.point3.title")}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {t("how.point3.description")}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {t("how.point4.title")}
                </h3>
                <ul className="list-disc list-inside text-white/70 space-y-2">
                  {renderList("how.point4.list", 5)}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {t("how.point5.title")}
                </h3>
                <ol className="list-decimal list-inside text-white/70 space-y-2">
                  {renderList("how.point5.list", 3)}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="py-20 bg-gradient-to-b from-neutral-900 to-stone-950"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-semibold mb-12 text-center">
            {t("faq.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">{renderFAQs()}</div>
        </div>
      </section>

      <footer className="py-8 bg-stone-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70 text-sm mb-4 md:mb-0">
              {t("footer.copyright")}
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
