import api from './axios';
import { toBraceFormat } from '@/utils/formatBraceList';

export type VideoType = 'long' | 'short';

// ===== Request Types =====

interface RecommendRequest {
  requestURL: string;
  keywords: string;
  category: string;
  videoType: VideoType;
}

interface ScriptRequest {
  requestURL: string;
  keywords: string;
  category: string;
  time?: number | null;
  title: string;
  concept: string;
  videoType: VideoType;
}

// ===== Response Types =====

export interface VideoAnalysisResponse {
  videoInfo: {
    videoId: string;
    title: string;
    thumbnailUrl: string;
    viewCount: number;
    uploadDate: string;
    category: string;
    keyword: string;
    durationSeconds: number;
    videoType: VideoType;
    score: {
      overall: number;
      topPercent: number;
      description: string;
    };
  };
  factors: {
    name: string;
    score: number;
    topPercent?: number;
    changePercent?: number;
    description: string;
  }[];
  audienceRetention: {
    sections: {
      timeSeconds: number;
      label: string;
      retentionPercent: number;
    }[];
    avgWatchSeconds: number;
    mainDropOffSegment: {
      startSeconds: number;
      endSeconds: number;
      description: string;
    };
  };
  insight: string;
  improvements: {
    title: string;
    description: string;
  }[];
  recommendedActions: {
    title: string;
    description: string;
  }[];
  scoreBasis: string[];
  viewGrowthData: {
    video: {
      day: number;
      views: number;
    }[];
    channelAvg: {
      day: number;
      avgViews: number;
    }[];
  };
}

// ===== API Functions =====

const serializeScriptParams = (params: Record<string, string | number | null>) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) =>
      value === null
        ? `${encodeURIComponent(key)}=null`
        : `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');

const buildScriptParams = (data: ScriptRequest): Record<string, string | number | null> => ({
  requestURL: data.requestURL,
  title: data.title,
  concept: data.concept,
  keywords: data.keywords,
  category: toBraceFormat(data.category),
  videoType: data.videoType,
  time: data.videoType === 'short' ? null : (data.time ?? null),
});

// POST /login_guest - 비회원(guest) 토큰 발급
export const postGuestLogin = async (): Promise<{ guestToken: string }> => {
  const response = await api.post('/login_guest');
  return response.data;
};

/** POST /login_test 응답 항목 */
export interface MemberLoginResponse {
  memberToken: string;
  channelName: string;
  channelUrl: string;
  userEmail: string;
  joinDate: string;
  category: string;
}

// POST /login_test - 테스트 계정 목록 조회
export const postTestLogin = async (): Promise<MemberLoginResponse[]> => {
  const response = await api.post('/login_test');
  return response.data;
};

// POST /ai_recommend - AI 추천 주제 요청
export const postRecommend = async (data: RecommendRequest) => {
  const params: Record<string, string> = {
    keywords: data.keywords,
    category: toBraceFormat(data.category),
    videoType: data.videoType,
  };
  if (data.requestURL) {
    params.requestURL = data.requestURL;
  }
  const response = await api.post('/ai_recommend', null, { params });
  return response.data;
};

// POST /ai_script - AI 제목/스크립트 요청
export const postScript = async (data: ScriptRequest) => {
  const response = await api.post('/ai_script', null, {
    params: buildScriptParams(data),
    paramsSerializer: serializeScriptParams,
  });
  return response.data;
};

// POST /ai_titleResearch - AI 추천 제목 1개 재생성
export const postTitleResearch = async (
  data: ScriptRequest,
): Promise<{ suggestedTitle: string }> => {
  const response = await api.post('/ai_titleResearch', null, {
    params: buildScriptParams(data),
    paramsSerializer: serializeScriptParams,
  });
  return response.data;
};

// GET /analyze/channel - 채널 분석 요청
export const getChannelAnalysis = async (channelURL: string, force = false) => {
  const response = await api.get('/analyze/channel', {
    params: { channel: channelURL, force },
  });
  return response.data;
};

// GET /analyze/video/{videoId} - 영상 상세 분석 요청
export const getVideoAnalysis = async (videoId: string): Promise<VideoAnalysisResponse> => {
  const response = await api.get(`/analyze/video/${videoId}`);
  return response.data;
};

// GET /keywords - 트렌드 키워드 요청
export const getKeywords = async (): Promise<{ text: string; value: number }[]> => {
  const response = await api.get('/keywords');
  return response.data;
};
