"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  fetchBlockList,
  fetchLatestBlock,
  fetchBlockStatistics,
  fetchTxStatistics,
  BlockData,
  BlockStatistics,
  TxStatistics,
} from "@/utils/api";
import { useTranslations } from "next-intl";

export const BlockchainVisualization = () => {
  const t = useTranslations("blockchain");
  const [selectedBlock, setSelectedBlock] = useState("103508");
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<BlockStatistics[]>([]);
  const [mempoolStats, setMempoolStats] = useState<TxStatistics[]>([]);
  const isTestnet = process.env.NEXT_PUBLIC_NETWORK === "testnet";
  const totalBlocks = isTestnet ? 500 : 144;

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        setLoading(true);
        // 先获取最新区块信息
        const latestResponse = await fetchLatestBlock();

        if (latestResponse.code === 0) {
          const lastNumber = latestResponse.data.lastNumber;
          // 计算起始位置：最新区块号减4
          const from = Math.max(0, lastNumber - 3);
          const to = lastNumber;

          // 获取区块列表
          const blocksResponse = await fetchBlockList(from, to);
          if (blocksResponse.code === 0) {
            const blocks = blocksResponse.data;
            setBlocks(blocks);

            // 设置选中最新的区块并加载其统计数据
            if (blocks.length > 0) {
              const latestBlock = blocks[0];
              setSelectedBlock(latestBlock.header);
              fetchStatisticsData(latestBlock.metablockHeight);
            }
          } else {
            setError(blocksResponse.message);
          }
        } else {
          setError(latestResponse.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blocks");
      } finally {
        setLoading(false);
      }
    };

    loadBlocks();
  }, []);

  const formatTimeDisplay = (timestamp: number) => {
    const timeDiff = Math.floor((Date.now() / 1000 - timestamp) / 60); // 转换为分钟
    if (timeDiff < 60) {
      return `${timeDiff}${t("minutesAgo")}`;
    } else if (timeDiff < 24 * 60) {
      return `${Math.floor(timeDiff / 60)}${t("hoursAgo")}`;
    } else {
      return `${Math.floor(timeDiff / (24 * 60))}${t("daysAgo")}`;
    }
  };

  const fetchStatisticsData = async (height: number) => {
    try {
      const response = await fetchBlockStatistics(height);
      if (response.code === 0) {
        setStatistics(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
    }
  };

  const fetchMempoolData = async () => {
    try {
      const response = await fetchTxStatistics(-1);
      if (response.code === 0) {
        setMempoolStats(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch mempool data:", err);
    }
  };

  const handleBlockClick = (block: BlockData) => {
    setSelectedBlock(block.header);
    fetchStatisticsData(block.metablockHeight);
  };

  useEffect(() => {
    fetchMempoolData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 你可以替换成更好的加载状态UI
  }

  if (error) {
    return <div>Error: {error}</div>; // 你可以替换成更好的错误状态UI
  }

  return (
    <section className="bg-black min-h-screen pt-16 md:pt-24 pb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl font-bold mb-8 text-white">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {/* Mempool Card */}
          <div className="relative">
            <div className="text-white text-center mb-2">{t("mempool")}</div>
            <div
              className={`bg-[#FA9600] rounded-lg p-4 cursor-pointer relative transition-all duration-200 ${
                selectedBlock === "mempool" ? "ring-2 ring-white/30" : ""
              }`}
              onClick={() => {
                setSelectedBlock("mempool");
                fetchStatisticsData(-1);
              }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#090909] mb-4">
                  {t("tx")}:{" "}
                  {mempoolStats.reduce(
                    (sum, stat) => sum + (stat.txList?.length || 0),
                    0
                  )}
                </div>
                <div className="text-sm text-[#090909] space-y-1">
                  <div>
                    BTC:{" "}
                    {mempoolStats.find((stat) => stat.chainName === "Bitcoin")
                      ?.txList?.length || 0}{" "}
                    TX
                  </div>
                  <div>
                    MVC:{" "}
                    {mempoolStats.find((stat) => stat.chainName === "MVC")
                      ?.txList?.length || 0}{" "}
                    TX
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#090909]/80 mt-4 text-center">
                {t("timeWithin")}
              </div>
            </div>
            {/* Vertical Divider Line */}
            <div className="hidden md:block absolute right-[-16px] top-0 bottom-0 border-r border-dashed border-white/30" />
          </div>

          {/* Block Cards */}
          {blocks.map((block) => {
            const btcChain = block.chains.find(
              (chain) => chain.chain === "Bitcoin"
            );
            const mvcChain = block.chains.find(
              (chain) => chain.chain === "MVC"
            );
            const timeDisplay = formatTimeDisplay(block.timestamp);

            return (
              <div key={block.header}>
                <div className="text-white text-center mb-2">
                  # {block.metablockHeight}
                </div>
                <div
                  className={`rounded-lg p-4 cursor-pointer relative transition-all duration-200 ${
                    selectedBlock === block.header ? "ring-2 ring-white/30" : ""
                  }`}
                  style={{ backgroundColor: "#FFC060" }}
                  onClick={() => handleBlockClick(block)}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#090909] mb-4">
                      {t("tx")}: {block.txIndex}
                    </div>
                    <div className="text-sm text-[#090909] space-y-1">
                      <div>
                        BTC: {btcChain ? `${btcChain.endBlock} TX` : "N/A"}
                      </div>
                      <div>
                        MVC: {mvcChain ? `${mvcChain.endBlock} TX` : "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-[#090909]/80 mt-4 text-center">
                    {timeDisplay}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar Section */}
        <div
          className={`mt-12 bg-[#28211b] backdrop-blur-[40px] rounded-2xl p-4 md:p-8 border border-[#F39800]/50 relative
            before:content-[''] before:absolute before:border-[16px] before:border-transparent before:border-b-[#F39800]/50 before:-mt-[1px]
            before:transition-all before:duration-300 before:bottom-full before:-translate-x-1/2
            after:content-[''] after:absolute after:border-[14px] after:border-transparent after:border-b-[#28211b]
            after:transition-all after:duration-300 after:bottom-full after:-translate-x-1/2
            animate-in fade-in duration-300
            ${
              selectedBlock === "mempool"
                ? "before:left-[10%] after:left-[10%]"
                : selectedBlock === blocks[3]?.header
                ? "before:left-[91%] after:left-[91%]"
                : selectedBlock === blocks[2]?.header
                ? "before:left-[70%] after:left-[70%]"
                : selectedBlock === blocks[1]?.header
                ? "before:left-[50%] after:left-[50%]"
                : selectedBlock === blocks[0]?.header
                ? "before:left-[30%] after:left-[30%]"
                : "before:opacity-0 after:opacity-0"
            }`}
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            {/* Left Column */}
            <div className="w-full lg:w-auto lg:flex-1">
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
                    <span className="text-white text-xl lg:text-[26px]">
                      BTC
                    </span>
                  </div>
                </div>

                {/* BTC Content */}
                <div className="flex-1 w-full lg:w-auto bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10">
                  {/* Progress Bar */}
                  <div className="px-4 lg:px-[18px] py-3 space-y-4 lg:space-y-[18px]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white text-base lg:text-lg">
                        {t("blockProgressBar")}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-[#FA9600] text-sm lg:text-base">
                          {
                            statistics.filter(
                              (stat) => stat.chainName === "Bitcoin"
                            ).length
                          }
                          {t("blocks")}
                        </div>
                        <div className="text-white/50 text-sm lg:text-base">
                          / {totalBlocks}
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-[#3D3935] rounded-full">
                      <div
                        className="h-full bg-[#FA9600] rounded-full"
                        style={{
                          width: `${
                            (statistics.filter(
                              (stat) => stat.chainName === "Bitcoin"
                            ).length /
                              totalBlocks) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* BTC Blocks */}
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3 p-4 lg:px-[18px] lg:pb-3">
                    {statistics
                      .filter((stat) => stat.chainName === "Bitcoin")
                      .sort((a, b) => a.blockHeight - b.blockHeight) // 按区块高度排序
                      .reduce((acc, block, index, array) => {
                        if (index < 4) {
                          // 添加前4个
                          acc.push(block);
                        } else if (
                          index === array.length - 1 &&
                          array.length > 4
                        ) {
                          // 如果有超过4个区块，添加省略号和最后一个
                          acc.push({ type: "ellipsis" } as const);
                          acc.push(block);
                        }
                        return acc;
                      }, [] as (BlockStatistics | { type: "ellipsis" })[])
                      .map((item) => {
                        if ("type" in item && item.type === "ellipsis") {
                          return (
                            <div
                              key="ellipsis"
                              className="text-white/50 self-center text-lg tracking-widest text-center"
                            >
                              ......
                            </div>
                          );
                        }

                        const block = item as BlockStatistics;
                        return (
                          <div
                            key={block.blockHash}
                            className="bg-[#FA9600] rounded-lg text-center p-3 flex flex-col items-center justify-center gap-2 aspect-square shrink-0"
                          >
                            <div className="text-[#6C655E] text-xs">
                              # {block.blockHeight}
                            </div>
                            <div className="text-[#3D3935] font-semibold text-sm">
                              {block.txCount} TX
                            </div>
                            <div className="text-[#6C655E] text-xs">
                              {formatTimeDisplay(block.blockTime)}
                            </div>
                          </div>
                        );
                      })}
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
                    <span className="text-white text-xl lg:text-[26px]">
                      MVC
                    </span>
                  </div>
                </div>

                {/* MVC Content */}
                <div className="flex-1 w-full lg:w-auto bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10">
                  {/* MVC Blocks */}
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-3 p-4 lg:px-[18px] lg:pb-3">
                    {statistics
                      .filter((stat) => stat.chainName === "MVC")
                      .sort((a, b) => a.blockHeight - b.blockHeight) // 按区块高度排序
                      .reduce((acc, block, index, array) => {
                        if (index < 4) {
                          // 添加前4个
                          acc.push(block);
                        } else if (
                          index === array.length - 1 &&
                          array.length > 4
                        ) {
                          // 如果有超过4个区块，添加省略号和最后一个
                          acc.push({ type: "ellipsis" } as const);
                          acc.push(block);
                        }
                        return acc;
                      }, [] as (BlockStatistics | { type: "ellipsis" })[])
                      .map((item) => {
                        if ("type" in item && item.type === "ellipsis") {
                          return (
                            <div
                              key="ellipsis"
                              className="text-white/50 self-center text-lg tracking-widest text-center"
                            >
                              ......
                            </div>
                          );
                        }

                        const block = item as BlockStatistics;
                        return (
                          <div
                            key={block.blockHash}
                            className="bg-[#FA9600] rounded-lg text-center p-3 flex flex-col items-center justify-center gap-2 aspect-square shrink-0"
                          >
                            <div className="text-[#6C655E] text-xs">
                              # {block.blockHeight}
                            </div>
                            <div className="text-[#3D3935] font-semibold text-sm">
                              {block.txCount} TX
                            </div>
                            <div className="text-[#6C655E] text-xs">
                              {formatTimeDisplay(block.blockTime)}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:flex-shrink-0 bg-[#28211b] backdrop-blur-[40px] rounded-lg border border-white/10 py-6 lg:py-[50px] px-4 lg:px-[30px] md:min-w-[450px]">
              <div className="text-xl lg:text-2xl font-medium text-white mb-4 text-center">
                {t("metablockDetails")}
              </div>

              {/* Tabs and Network Toggle Container */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 lg:justify-between mb-5">
                {/* Tabs */}
                <div className="flex space-x-4 bg-[#28211b] backdrop-blur-lg rounded-[40px] border border-[#47413D] px-4 py-2 overflow-x-auto scrollbar-none">
                  {[
                    { key: "all" },
                    { key: "consolidation" },
                    { key: "coinjoin" },
                    { key: "data" },
                  ].map((tab, index) => (
                    <button
                      key={tab.key}
                      className={`text-xs font-medium rounded-full transition-colors ${
                        index === 0
                          ? "text-white"
                          : "text-[#928D8A] hover:text-white"
                      }`}
                    >
                      {t(`tabs.${tab.key}`)}
                    </button>
                  ))}
                </div>

                {/* Network Toggle */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-sm bg-[#FA9600]"></div>
                    <span className="text-sm font-medium text-white">BTC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-sm bg-[#8385F7]"></div>
                    <span className="text-sm font-medium text-white">MVC</span>
                  </div>
                </div>
              </div>

              {/* Visualization Area */}
              <div className="grid grid-cols-[repeat(80,1fr)] grid-rows-[repeat(80,1fr)] w-full aspect-square">
                {(() => {
                  const gridSize = 80;
                  const cells: {
                    row: number;
                    col: number;
                    size: number;
                    color: string;
                  }[] = [];

                  // 如果没有统计数据，返回空数组
                  if (!statistics.length) return [];

                  // 计算总区块大小
                  const totalSize = statistics.reduce(
                    (sum, stat) => sum + stat.blockSize,
                    0
                  );

                  // 根据区块大小分配格子数量
                  const getBlockCells = (blockSize: number) => {
                    // 计算这个区块应该占据的格子数量
                    const cellCount = Math.max(
                      1,
                      Math.floor(
                        (blockSize / totalSize) * (gridSize * gridSize)
                      )
                    );
                    // 将格子数量转换为合适的方块大小
                    const size = Math.min(
                      16,
                      Math.max(1, Math.floor(Math.sqrt(cellCount)))
                    );
                    return { cellCount, size };
                  };

                  // 创建 2D 数组来跟踪已使用的位置
                  const grid = Array(gridSize)
                    .fill(null)
                    .map(() => Array(gridSize).fill(false));

                  // 检查区域是否可用
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

                  // 标记区域为已使用
                  const markArea = (row: number, col: number, size: number) => {
                    for (let i = 0; i < size; i++) {
                      for (let j = 0; j < size; j++) {
                        grid[row + i][col + j] = true;
                      }
                    }
                  };

                  // 尝试放置区块
                  const tryPlaceBlock = (
                    size: number,
                    chainName: string
                  ): boolean => {
                    const attempts = 1000;
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
                            chainName === "Bitcoin"
                              ? "bg-[#FA9600]"
                              : "bg-[#8385F7]",
                        });
                        return true;
                      }
                    }
                    return false;
                  };

                  // 处理每个区块的统计数据
                  statistics.forEach((stat) => {
                    const { size } = getBlockCells(stat.blockSize);
                    // 尝试放置区块，如果失败则尝试更小的尺寸
                    let currentSize = size;
                    while (
                      currentSize > 0 &&
                      !tryPlaceBlock(currentSize, stat.chainName)
                    ) {
                      currentSize--;
                    }
                  });

                  return cells.map((cell, i) => (
                    <div
                      key={i}
                      style={{
                        gridColumn: `${cell.col + 1} / span ${cell.size}`,
                        gridRow: `${cell.row + 1} / span ${cell.size}`,
                        animationDelay: `${i * 2}ms`,
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
  );
};
