"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  Share2,
  Film,
  Maximize,
  Network,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const locale = pathname.includes("/zh") ? "zh" : "en";

  const navItems = [
    { href: "#what", label: t("nav.whatsMBN") },
    { href: "#comparing", label: t("nav.comparing") },
    { href: "#why", label: t("nav.whyImportant") },
    { href: "#how", label: t("nav.howItWorks") },
    { href: "#faq", label: t("nav.faq") },
  ];

  const languageLabel = locale === "zh" ? "中文" : "EN";

  return (
    <header className="w-full h-16 md:h-24 fixed top-0 z-[100] bg-opacity-50 backdrop-blur">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="md:hidden mr-4 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="text-2xl font-bold cursor-pointer text-white">
            MBN
          </div>
        </div>

        <nav className="hidden md:flex items-center flex-1 justify-center">
          <div className="flex items-center gap-x-8 px-8 py-2.5 rounded-full">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white/90 text-base font-normal leading-loose hover:text-orange-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        {/* FIXME: dropdown menu shake */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="sm"
              className="text-white border-none outline-none hover:outline-none"
            >
              <Globe className="h-4 w-4 mr-2" />
              {languageLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black/90 backdrop-blur-md border-stone-800 z-[500] w-32"
          >
            <DropdownMenuItem
              className="text-white/90 hover:text-orange-500"
              onClick={() => router.push("/en")}
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white/90 hover:text-orange-500"
              onClick={() => router.push("/zh")}
            >
              中文
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button className="text-white" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-center mt-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-white/90 text-xl py-4 hover:text-orange-500 transition-colors animate-in fade-in slide-in-from-left duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

const LandingPage = () => {
  const t = useTranslations();

  const features = [
    t("hero.features.0"),
    t("hero.features.1"),
    t("hero.features.2"),
    t("hero.features.3"),
  ];

  const renderFeatures = () => {
    return features.map((feature, index) => (
      <div key={index} className="flex items-start gap-4">
        <div className="w-4 h-4 md:w-5 md:h-5 mt-1 rounded-full bg-orange-500 flex-shrink-0"></div>
        <p className="flex-1 text-white/90 text-base md:text-lg font-medium leading-7">
          {feature}
        </p>
      </div>
    ));
  };

  const renderFAQs = () => {
    const faqs = [
      {
        title: t("faq.questions.0.title"),
        content: t("faq.questions.0.content"),
      },
      {
        title: t("faq.questions.1.title"),
        content: t("faq.questions.1.content"),
      },
      {
        title: t("faq.questions.2.title"),
        content: t("faq.questions.2.content"),
      },
      {
        title: t("faq.questions.3.title"),
        content: t("faq.questions.3.content"),
      },
    ];

    return faqs.map((faq, i) => (
      <Card
        key={i}
        className="bg-white/10 border-none transition-colors relative"
      >
        <CardContent className="p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white/90">
            {faq.title}
          </h3>
          <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4">
            {faq.content}
          </p>
          <Button
            variant="link"
            className="text-orange-500 p-0 flex items-center hover:text-orange-400 transition-colors absolute right-4 md:right-6 bottom-2 gap-0 hover:no-underline text-sm md:text-base"
          >
            {t("faq.learnMore")}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    ));
  };

  const howItWorksCards = [
    {
      icon: <Share2 className="h-5 w-5 md:h-6 md:w-6" />,
      title: t("how.point1.title"),
      description: t("how.point1.description"),
    },
    {
      icon: <Film className="h-5 w-5 md:h-6 md:w-6" />,
      title: t("how.point2.title"),
      description: t("how.point2.description"),
    },
    {
      icon: <Maximize className="h-5 w-5 md:h-6 md:w-6" />,
      title: t("how.point3.title"),
      description: t("how.point3.description"),
    },
    {
      icon: <Network className="h-5 w-5 md:h-6 md:w-6" />,
      title: t("how.point4.title"),
      description: t("how.point4.description"),
    },
    {
      icon: <Shield className="h-5 w-5 md:h-6 md:w-6" />,
      title: t("how.point5.title"),
      description: t("how.point5.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">
      <Header />

      {/* Hero Section */}
      <section
        id="what"
        className="scroll-mt-16 md:scroll-mt-24 min-h-screen flex items-center relative overflow-hidden pt-16 md:pt-0"
        style={{
          backgroundImage: "url('/space-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-6 md:mb-8 text-white/90">
              {t("hero.title")}
            </h1>
            <p className="text-white/70 text-base md:text-xl lg:text-2xl leading-relaxed mb-8 md:mb-12">
              {t("hero.description")}
            </p>
            <div className="space-y-4 md:space-y-6 bg-[#9B7C68]/10 p-4 md:p-6 rounded-xl">
              {renderFeatures()}
            </div>
          </div>
        </div>
      </section>

      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg2.png')",
        }}
      >
        {/* MetaID Boosts Section */}
        <section
          id="comparing"
          className="scroll-mt-16 md:scroll-mt-24 py-8 md:py-20 relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <div className="flex-1 flex flex-col items-start">
                <div className="flex flex-col items-start gap-2 md:gap-4 mb-4 md:mb-6">
                  <h2 className="flex items-center gap-x-2 md:gap-x-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                    <Image
                      src="/METAID.svg"
                      alt="MetaID"
                      width={215}
                      height={43}
                      className="w-32 md:w-auto"
                    />
                    <span>{t("comparing.title1")}</span>
                  </h2>
                  <h2 className="flex items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                    <Image
                      src="/Bitcoin.svg"
                      alt="Bitcoin"
                      width={48}
                      height={48}
                      className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12"
                    />
                    <span className="text-white">{t("comparing.title2")}</span>
                  </h2>
                </div>
                <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                  {t("comparing.description")}
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
        </section>

        {/* Comparison Table */}
        <section className="scroll-mt-16 md:scroll-mt-24 py-8 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 md:mb-12 text-center text-white/90">
              {t("comparison.title")}
            </h2>
            <Image
              src="/table.png"
              alt="Solutions"
              width={500}
              height={500}
              className="max-w-[960px] mx-auto w-full h-auto"
            />
          </div>
        </section>
      </div>

      {/* Why Important Section */}
      <section
        id="why"
        className="scroll-mt-16 md:scroll-mt-24 py-20 md:py-32 relative overflow-hidden min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/galaxy-bg.png')",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto md:mr-0 md:ml-auto text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-white">
              {t("why.title")}
            </h2>
            <p className="text-lg text-white/70 mb-12">
              {t("why.description")}
            </p>
            <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
              <div className="lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
                  {t("why.point1.title")}
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  {t("why.point1.description")}
                </p>
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
                  {t("why.point2.title")}
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  {t("why.point2.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how"
        className="scroll-mt-16 md:scroll-mt-24 py-8 md:py-20 overflow-hidden"
      >
        <Image
          src="/planet-bg.png"
          alt="Solutions"
          width={500}
          height={500}
          className="max-w-[960px] mx-auto w-full h-auto"
        />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 md:mb-8 text-center text-white/90">
            How It Works
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {howItWorksCards.map((card, index) => (
              <Card
                key={index}
                className={`bg-black/40 backdrop-blur-md border-stone-800 ${
                  index === 3 ? "lg:col-span-2" : ""
                }`}
                style={
                  index === 4
                    ? {
                        backgroundImage: "url('/grid-sm-bg.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }
                    : index === 3
                    ? {
                        backgroundImage: "url('/grid-bg.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }
                    : {}
                }
              >
                <CardContent className="p-3 md:p-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3 md:mb-4">
                    <div className="text-orange-500">{card.icon}</div>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-white/90">
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="scroll-mt-16 md:scroll-mt-24 py-8 md:py-20 relative overflow-hidden lg:min-h-[800px]"
        style={{
          backgroundImage: "url('/faq-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 md:mb-8 text-center text-white/90">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {renderFAQs()}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 md:py-6 bg-black border-t border-stone-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70 text-xs mb-2 md:mb-0">
              MetaBitcoin Network Copyright @2024
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-4">
              {[
                "MetaID Protocol Labs",
                "MVC DAO",
                "Metalet Team",
                "Octopus Team",
              ].map((item, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-white/70 text-xs hover:text-orange-500 transition-colors"
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
};

export default LandingPage;
