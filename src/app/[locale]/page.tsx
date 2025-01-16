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
import { Share2, Film, Maximize, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const locale = pathname && pathname.includes("/zh") ? "zh" : "en";

  const navItems = [
    { href: "#what", label: t("nav.whatsMBN") },
    { href: "#comparing", label: t("nav.comparing") },
    { href: "#why", label: t("nav.whyImportant") },
    { href: "#how", label: t("nav.howItWorks") },
    { href: "#faq", label: t("nav.faq") },
  ];

  const languageLabel = locale === "zh" ? "中文" : "EN";

  return (
    <header className="w-full h-16 md:h-24 fixed top-0 z-[100] bg-opacity-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-full flex items-center justify-between md:max-w-[1200px]">
        <div className="flex items-center">
          <button
            className="md:hidden mr-4 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Image src="/mbn-logo.svg" width={40} height={40} alt="MBN" />
          {/* <div className="text-2xl font-bold cursor-pointer text-white">
            MBN
          </div> */}
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
          <DropdownMenuTrigger asChild>
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
            align="center"
            side="top"
            className="bg-black/90 backdrop-blur-md border-stone-800 z-[500] w-32 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black/30"
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
        className={`md:hidden fixed inset-0 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="h-screen flex flex-col bg-black/90 backdrop-blur-lg">
          <div className="flex justify-end p-4">
            <button className="text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white/90 text-2xl py-4 hover:text-orange-500 transition-colors animate-in fade-in slide-in-from-left duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const LandingPage = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname && pathname.includes("/zh") ? "zh" : "en";

  const features = [
    t("hero.features.0"),
    t("hero.features.1"),
    t("hero.features.2"),
    t("hero.features.3"),
  ];

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedBlock, setSelectedBlock] = useState("103508");

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

    return (
      <>
        {faqs.map((faq, i) => (
          <Card
            key={i}
            className="bg-white/10 border-none transition-colors relative"
          >
            <CardContent className="p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white/90">
                {faq.title}
              </h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                {faq.content}
              </p>
              <Button
                variant="link"
                className="text-orange-500 p-0 flex items-center hover:text-orange-400 transition-colors gap-0 hover:no-underline text-sm md:text-base"
                onClick={() => setExpandedFAQ(i)}
              >
                {t("faq.learnMore")}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
            {expandedFAQ === i && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-in fade-in duration-300"
                onClick={() => setExpandedFAQ(null)}
              >
                <div
                  className="bg-white/10 backdrop-blur-md p-6 rounded-lg max-w-lg w-[90%] md:w-full relative text-white max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-white"
                    onClick={() => setExpandedFAQ(null)}
                  >
                    <X size={18} />
                  </button>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    {faq.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed mb-4">
                    {faq.content}
                  </p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </>
    );
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
      title: t("how.point4.title"),
      description: (
        <ul className="list-inside text-white/70 text-xs md:text-sm leading-relaxed list-none space-y-[18px]">
          <li className="flex items-center gap-x-2">
            <Image src="/network/mvc.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.0")}</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Image src="/network/fb.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.1")}</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Image src="/network/bch.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.2")}</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Image src="/network/bsv.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.3")}</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Image src="/network/xec.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.4")}</span>
          </li>
        </ul>
      ),
    },
    {
      title: t("how.point5.title"),
      description: (
        <ul className="list-inside text-white/70 text-xs md:text-sm leading-relaxed list-decimal">
          <li>{t("how.point5.list.0")}</li>
          <li>{t("how.point5.list.1")}</li>
          <li>{t("how.point5.list.2")}</li>
        </ul>
      ),
    },
  ];

  const whySection = [
    {
      title: t("why.point1.title"),
      description: t("why.point1.description"),
    },
    {
      title: t("why.point2.title"),
      description: t("why.point2.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">
      <Header />

      <section className="bg-black min-h-screen pt-16 md:pt-24 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl font-bold mb-8 text-white">
            MetaBitcoin
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Mempool Card */}
            <div className="relative">
              <div className="text-white text-center mb-2">mempool</div>
              <div 
                className={`bg-[#FA9600] rounded-lg p-4 cursor-pointer relative transition-all duration-200 ${
                  selectedBlock === "mempool" ? "ring-2 ring-white/30" : ""
                }`}
                onClick={() => setSelectedBlock("mempool")}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#090909] mb-4">
                    TX: 3,517
                  </div>
                  <div className="text-sm text-[#090909] space-y-1">
                    <div>BTC: 2,517 TX</div>
                    <div>MVC: 1,000 TX</div>
                  </div>
                </div>
                <div className="text-xs text-[#090909]/80 mt-4 text-center">
                  2分钟之内
                </div>
              </div>
              {/* Vertical Divider Line */}
              <div className="hidden md:block absolute right-[-16px] top-0 bottom-0 border-r border-dashed border-white/30" />
            </div>

            {/* Block Cards */}
            {[
              {
                id: "103508",
                tx: "8,594",
                btc: "4,432 TX",
                mvc: "4,162 TX",
                time: "13分钟前",
              },
              {
                id: "103507",
                tx: "5,843",
                btc: "3,432 TX",
                mvc: "2,411 TX",
                time: "32分钟前",
              },
              {
                id: "103506",
                tx: "5,843",
                btc: "3,432 TX",
                mvc: "2,411 TX",
                time: "45分钟前",
              },
              {
                id: "103505",
                tx: "3,124",
                btc: "1,432 TX",
                mvc: "1,692 TX",
                time: "54分钟前",
              },
            ].map((block) => (
              <div key={block.id}>
                <div className="text-white text-center mb-2"># {block.id}</div>
                <div
                  className={`rounded-lg p-4 cursor-pointer relative transition-all duration-200 ${
                    selectedBlock === block.id ? "ring-2 ring-white/30" : ""
                  }`}
                  style={{ backgroundColor: "#FFC060" }}
                  onClick={() => setSelectedBlock(block.id)}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#090909] mb-4">
                      TX: {block.tx}
                    </div>
                    <div className="text-sm text-[#090909] space-y-1">
                      <div>BTC: {block.btc}</div>
                      <div>MVC: {block.mvc}</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#090909]/80 mt-4 text-center">
                    {block.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar Section */}
          <div className={`mt-12 bg-[#28211b] backdrop-blur-[40px] rounded-2xl p-4 md:p-8 border border-[#F39800]/50 relative
            before:content-[''] before:absolute before:border-[16px] before:border-transparent before:border-b-[#F39800]/50 before:-mt-[1px]
            before:transition-all before:duration-300
            after:content-[''] after:absolute after:border-[14px] after:border-transparent after:border-b-[#28211b]
            after:transition-all after:duration-300
            animate-in fade-in duration-300
            ${
              selectedBlock === "mempool"
                ? "before:left-[10%] before:bottom-full before:-translate-x-1/2 before:opacity-100 after:left-[10%] after:bottom-full after:-translate-x-1/2 after:opacity-100"
                : selectedBlock === "103508"
                ? "before:left-[30%] before:bottom-full before:-translate-x-1/2 before:opacity-100 after:left-[30%] after:bottom-full after:-translate-x-1/2 after:opacity-100"
                : selectedBlock === "103507"
                ? "before:left-[50%] before:bottom-full before:-translate-x-1/2 before:opacity-100 after:left-[50%] after:bottom-full after:-translate-x-1/2 after:opacity-100"
                : selectedBlock === "103506"
                ? "before:left-[70%] before:bottom-full before:-translate-x-1/2 before:opacity-100 after:left-[70%] after:bottom-full after:-translate-x-1/2 after:opacity-100"
                : selectedBlock === "103505"
                ? "before:left-[90%] before:bottom-full before:-translate-x-1/2 before:opacity-100 after:left-[90%] after:bottom-full after:-translate-x-1/2 after:opacity-100"
                : "before:opacity-0 after:opacity-0"
            }
          `}>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
              {/* Left Column */}
              <div className="w-full lg:w-auto lg:flex-shrink-0">
                {/* BTC Section */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
                  {/* BTC Label */}
                  <div className="relative h-[60px] lg:h-[80px] w-[120px] lg:w-[140px] bg-[#28211b] border border-[#FFA317] rounded-lg p-3 lg:p-4 flex items-center before:content-[''] before:absolute before:left-full before:top-1/2 before:border-[11px] before:border-transparent before:border-l-[#FFA317] before:-mt-[11px] after:content-[''] after:absolute after:left-full after:top-1/2 after:border-[9px] after:border-transparent after:border-l-[#28211b] after:-mt-[9px] after:pointer-events-none">
                    <div className="flex items-center justify-center gap-2 lg:gap-2.5 w-full">
                      <Image
                        src="/network/btc.png"
                        alt="BTC"
                        width={20}
                        height={20}
                        className="w-5 h-5 lg:w-[22px] lg:h-[22px]"
                      />
                      <span className="text-white text-xl lg:text-[26px]">BTC</span>
                    </div>
                  </div>

                  {/* BTC Content */}
                  <div className="flex-1 w-full lg:w-auto bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10">
                    {/* Progress Bar */}
                    <div className="px-4 lg:px-[18px] py-3 space-y-4 lg:space-y-[18px]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white text-base lg:text-lg">
                          Block Progress Bar
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-[#FA9600] text-sm lg:text-base">65 Blocks</div>
                          <div className="text-white/50 text-sm lg:text-base">/ 144 Blocks</div>
                        </div>
                      </div>
                      <div className="h-2 bg-[#3D3935] rounded-full">
                        <div className="h-full w-[45%] bg-[#FA9600] rounded-full"></div>
                      </div>
                    </div>

                    {/* BTC Blocks */}
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3 p-4 lg:px-[18px] lg:pb-3">
                      {[
                        { id: "103505", tx: "2,517", time: "4分钟之前" },
                        { id: "103504", tx: "4,432", time: "23分钟之前" },
                        { id: "103503", tx: "3,432", time: "45分钟之前" },
                        { id: "103502", tx: "3,432", time: "1个小时之前" },
                      ].map((block) => (
                        <div
                          key={block.id}
                          className="bg-[#FA9600] rounded-lg text-center p-3 flex flex-col items-center justify-center gap-2"
                        >
                          <div className="text-[#6C655E] text-xs">
                            # {block.id}
                          </div>
                          <div className="text-[#3D3935] font-semibold text-sm">
                            {block.tx} TX
                          </div>
                          <div className="text-[#6C655E] text-xs">
                            {block.time}
                          </div>
                        </div>
                      ))}
                      <div className="text-white/50 self-center text-lg tracking-widest text-center">
                        ......
                      </div>
                      <div className="bg-[#FA9600] rounded-lg text-center p-3 flex flex-col items-center justify-center gap-2">
                        <div className="text-[#6C655E] text-xs"># 103361</div>
                        <div className="text-[#3D3935] font-semibold text-sm">
                          1,432 TX
                        </div>
                        <div className="text-[#6C655E] text-xs">
                          7个小时之前
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MVC Section */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center mt-6">
                  {/* MVC Label */}
                  <div className="relative h-[60px] lg:h-[80px] w-[120px] lg:w-[140px] bg-[#28211b] border border-[#FFA317] rounded-lg p-3 lg:p-4 flex items-center before:content-[''] before:absolute before:left-full before:top-1/2 before:border-[11px] before:border-transparent before:border-l-[#FFA317] before:-mt-[11px] after:content-[''] after:absolute after:left-full after:top-1/2 after:border-[9px] after:border-transparent after:border-l-[#28211b] after:-mt-[9px] after:pointer-events-none">
                    <div className="flex items-center justify-center gap-2 lg:gap-2.5 w-full">
                      <Image
                        src="/network/mvc.png"
                        alt="MVC"
                        width={20}
                        height={20}
                        className="w-5 h-5 lg:w-[22px] lg:h-[22px]"
                      />
                      <span className="text-white text-xl lg:text-[26px]">MVC</span>
                    </div>
                  </div>

                  {/* MVC Content */}
                  <div className="flex-1 w-full lg:w-auto bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10">
                    {/* MVC Blocks */}
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3 p-4 lg:px-[18px] lg:pb-3">
                      {[
                        { id: "103505", tx: "1,000", time: "4分钟之前" },
                        { id: "103504", tx: "4,162", time: "23分钟之前" },
                        { id: "103503", tx: "2,411", time: "45分钟之前" },
                        { id: "103502", tx: "2,411", time: "1个小时之前" },
                      ].map((block) => (
                        <div
                          key={block.id}
                          className="bg-[#FA9600] rounded-lg text-center p-3 flex flex-col items-center justify-center gap-2"
                        >
                          <div className="text-[#6C655E] text-xs">
                            # {block.id}
                          </div>
                          <div className="text-[#3D3935] font-semibold text-sm">
                            {block.tx} TX
                          </div>
                          <div className="text-[#6C655E] text-xs">
                            {block.time}
                          </div>
                        </div>
                      ))}
                      <div className="text-white/50 self-center text-lg tracking-widest text-center">
                        ......
                      </div>
                      <div className="bg-[#FA9600] rounded-lg text-center p-3 flex flex-col items-center justify-center gap-2">
                        <div className="text-[#6C655E] text-xs"># 103361</div>
                        <div className="text-[#3D3935] font-semibold text-sm">
                          1,692 TX
                        </div>
                        <div className="text-[#6C655E] text-xs">
                          7个小时之前
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10 py-6 lg:py-[50px] px-4 lg:px-[30px]">
                <div className="text-xl lg:text-2xl font-medium text-white mb-4 text-center">
                  Metablock Details
                </div>

                {/* Tabs and Network Toggle Container */}
                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 lg:justify-between mb-5">
                  {/* Tabs */}
                  <div className="flex space-x-4 bg-[#28211b] backdrop-blur-lg rounded-[40px] border border-[#47413D] px-4 py-2 overflow-x-auto scrollbar-none">
                    {["All", "Consolidation", "Coinjoin", "Data"].map(
                      (tab, index) => (
                        <button
                          key={tab}
                          className={`text-xs font-medium rounded-full transition-colors ${
                            index === 0
                              ? "text-white"
                              : "text-[#928D8A] hover:text-white"
                          }`}
                        >
                          {tab}
                        </button>
                      )
                    )}
                  </div>

                  {/* Network Toggle */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-sm bg-[#FA9600]"></div>
                      <span className="text-sm font-medium text-white">
                        BTC
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-sm bg-[#8385F7]"></div>
                      <span className="text-sm font-medium text-white">
                        MVC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visualization Area */}
                <div className="grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] w-full aspect-square">
                  {(() => {
                    const gridSize = 20;
                    const cells: {
                      row: number;
                      col: number;
                      size: number;
                      color: string;
                    }[] = [];

                    // Create a 2D array to track used positions
                    const grid = Array(gridSize)
                      .fill(null)
                      .map(() => Array(gridSize).fill(false));

                    // Check if an area is available
                    const isAreaAvailable = (
                      row: number,
                      col: number,
                      size: number
                    ) => {
                      if (row + size > gridSize || col + size > gridSize)
                        return false;
                      for (let i = 0; i < size; i++) {
                        for (let j = 0; j < size; j++) {
                          if (grid[row + i][col + j]) return false;
                        }
                      }
                      return true;
                    };

                    // Mark an area as used
                    const markArea = (
                      row: number,
                      col: number,
                      size: number
                    ) => {
                      for (let i = 0; i < size; i++) {
                        for (let j = 0; j < size; j++) {
                          grid[row + i][col + j] = true;
                        }
                      }
                    };

                    // Try to place a block
                    const tryPlaceBlock = (size: number) => {
                      const attempts = size === 4 ? 10 : size === 2 ? 30 : 100;
                      for (let attempt = 0; attempt < attempts; attempt++) {
                        const row = Math.floor(
                          Math.random() * (gridSize - size + 1)
                        );
                        const col = Math.floor(
                          Math.random() * (gridSize - size + 1)
                        );

                        if (isAreaAvailable(row, col, size)) {
                          markArea(row, col, size);
                          cells.push({
                            row,
                            col,
                            size,
                            color:
                              Math.random() > 0.5
                                ? "bg-[#FA9600]"
                                : "bg-[#8385F7]",
                          });
                          return true;
                        }
                      }
                      return false;
                    };

                    // Place large blocks first
                    for (let i = 0; i < 5; i++) tryPlaceBlock(4);
                    // Then medium blocks
                    for (let i = 0; i < 15; i++) tryPlaceBlock(2);
                    // Finally fill with small blocks
                    for (let row = 0; row < gridSize; row++) {
                      for (let col = 0; col < gridSize; col++) {
                        if (!grid[row][col]) {
                          markArea(row, col, 1);
                          cells.push({
                            row,
                            col,
                            size: 1,
                            color:
                              Math.random() > 0.5
                                ? "bg-[#FA9600]"
                                : "bg-[#8385F7]",
                          });
                        }
                      }
                    }

                    return cells.map((cell, i) => (
                      <div
                        key={i}
                        style={{
                          gridColumn: `${cell.col + 1} / span ${cell.size}`,
                          gridRow: `${cell.row + 1} / span ${cell.size}`,
                          animationDelay: `${i * 10}ms`,
                        }}
                        className={`${cell.color} border border-black animate-in fade-in duration-300 fill-mode-both`}
                      />
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section
        id="what"
        className="scroll-mt-16 md:scroll-mt-24 min-h-screen flex items-center relative overflow-hidden pt-16 md:pt-24"
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
            <p className="text-white/70 text-base md:text-xl lg:text-2xl leading-loose mb-8 md:mb-12">
              {t("hero.description")}
            </p>
            <div className="space-y-4 md:space-y-6 bg-[#28211b] p-4 md:p-6 rounded-xl">
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
        <section className="scroll-mt-16 md:scroll-mt-24 pt-16 md:pt-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <div className="flex-1 flex flex-col items-start hidden">
                <div className="flex flex-col items-start gap-2 md:gap-4 mb-4 md:mb-6">
                  <h2 className="flex items-center gap-x-2 md:gap-x-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold whitespace-nowrap">
                    <Image
                      src="/METAID.svg"
                      alt="MetaID"
                      width={0}
                      height={0}
                      className="w-24 md:w-36"
                    />
                    <span>{t("comparing.title1")}</span>
                  </h2>
                  <h2 className="flex items-center gap-x-2 md:gap-x-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                    <Image
                      src="/Bitcoin.svg"
                      alt="Bitcoin"
                      width={48}
                      height={48}
                      className="size-8 md:size-10 lg:size-12"
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
                  className="lg:max-w-[800px] w-full h-auto mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparing" className="scroll-mt-16 md:scroll-mt-24 pb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 md:mb-12 text-center text-white/90 max-w-[600px] text-balance mx-auto">
              {t("comparison.title")}
            </h2>
            <Image
              src={`/table_${locale}.png`}
              alt="comparing"
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
        className="scroll-mt-16 md:scroll-mt-24 pt-16 md:pt-24 relative overflow-hidden min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/galaxy-bg.png')",
        }}
      >
        <div className="container mx-auto px-4 relative z-10 sm:mt-60">
          <div className="max-w-4xl mx-auto md:mr-0 md:ml-auto text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-white">
              {t("why.title")}
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
              {whySection.map((point, index) => (
                <div key={index} className="lg:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
                    {point.title}
                  </h3>
                  <p className="text-white/70 text-base md:text-lg leading-loose">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Image
        src="/planet-bg.png"
        alt="Solutions"
        width={500}
        height={500}
        className="max-w-[960px] mx-auto w-full h-auto"
      />
      {/* How It Works Section */}
      <section
        id="how"
        className="scroll-mt-16 md:scroll-mt-24 pt-16 md:pt-24 overflow-hidden pb-12"
      >
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-6 md:mb-8 text-white/90 text-center">
            {t("how.title")}
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
                  {card.icon && (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3 md:mb-4">
                      <div className="text-orange-500">{card.icon}</div>
                    </div>
                  )}
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-white/90">
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-loose mt-[18px]">
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
        className="scroll-mt-16 md:scroll-mt-24 pt-16 md:pt-24 relative overflow-hidden lg:min-h-[800px]"
        style={{
          backgroundImage: "url('/faq-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-6 md:mb-8 text-white/90 text-center">
            {t("faq.title")}
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
              {t("footer.copyright")}
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
