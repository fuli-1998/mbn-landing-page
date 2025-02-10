// 定义接口返回的数据类型
export interface Chain {
  chain: string;
  preEndBlock: string;
  startBlock: string;
  endBlock: string;
}

export interface BlockData {
  header: string;
  preHeader: string;
  metablockHeight: number;
  chains: Chain[];
  onChain: string;
  timestamp: number;
  txHash: string;
  txIndex: number;
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

// 添加最新区块数据的接口类型
export interface LatestBlockResponse {
  blockData: BlockData;
  init: number;
  lastNumber: number;
  step: number;
}

// 添加统计数据的接口类型
export interface BlockStatistics {
  metablockHeight: number;
  metablockHeader: string;
  meatIdTxCount: number;
  metaIdTxFee: number;
  metaIdTxSize: number;
  chainName: string;
  blockHeight: number;
  blockHash: string;
  blockTime: number;
  txCount: number;
  blockSize: number;
  blockFee: number;
}

// 添加新的区块统计响应接口
export interface BlockStatisticsResponse {
  list: BlockStatistics[];
  btcStep: number;
}

interface TxInfo {
  txHash: string;
  txSize: number;
  txFee: number;
}

export interface TxStatistics {
  chainName: string;
  blockHeight: number;
  txList: TxInfo[] | null;
}

// 获取API基础URL的函数
const getApiBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return baseUrl;
};

// 通用的fetch封装
const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// 获取区块列表的具体函数
export const fetchBlockList = async (
  from: number,
  to: number
): Promise<ApiResponse<BlockData[]>> => {
  return fetchApi<BlockData[]>(`/api/block/list?from=${from}&to=${to}`);
};

// 获取最新区块的函数
export const fetchLatestBlock = async (): Promise<
  ApiResponse<LatestBlockResponse>
> => {
  return fetchApi<LatestBlockResponse>("/api/block/latest");
};

// 获取区块统计数据的函数
export const fetchBlockStatistics = async (
  height: number
): Promise<ApiResponse<BlockStatisticsResponse>> => {
  return fetchApi<BlockStatisticsResponse>(
    `/api/statistics/metablock?height=${height}`
  );
};

// 获取交易统计数据的函数
export const fetchTxStatistics = async (
  height: number
): Promise<ApiResponse<TxStatistics[]>> => {
  return fetchApi<TxStatistics[]>(`/api/statistics/tx?height=${height}`);
};

// 使用示例:
// const response = await fetchBlockList(0, 10);
// const blocks = response.data;
