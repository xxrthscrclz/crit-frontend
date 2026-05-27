import { http, HttpResponse } from 'msw';
import {
  mockRecommendLongResponse,
  mockRecommendShortResponse,
  mockAITitleLongResponse,
  mockAITitleShortResponse,
  mockAIThumbnailLongResponse,
  mockAIThumbnailShortResponse,
  mockAIScriptLongResponse,
  mockAIScriptShortResponse,
  mockAIFullScriptLongResponse,
  mockAIFullScriptShortResponse,
  mockAIReferenceLongResponse,
  mockAIReferenceShortResponse,
  mockTitleResearchLongResponses,
  mockTitleResearchShortResponses,
} from '@/mocks/data/recommendMock';
import {
  mockChannelAnalysisResponse,
  mockChannelAnalysisForceRefreshResponse,
} from '@/mocks/data/analysisMock';
import { mockVideoAnalysisResponse } from '@/mocks/data/videoAnalysisMock';
import { mockKeywordsResponse } from '@/mocks/data/keywordsMock';
import { mockTrendingResponse } from '@/mocks/data/trendMock';
import { mockTestLoginResponses } from '@/mocks/data/userMock';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getVideoType = (request: Request): 'long' | 'short' => {
  const videoType = new URL(request.url).searchParams.get('videoType');
  return videoType === 'short' ? 'short' : 'long';
};

export const handlers = [
  // POST /login_guest - 비회원 토큰 발급
  http.post(`${SERVER_URL}/login_guest`, () => {
    return HttpResponse.json({ guestToken: 'mock-guest-token' }, { status: 200 });
  }),

  // POST /login_test - 테스트 계정 로그인
  http.post(`${SERVER_URL}/login_test`, () => {
    return HttpResponse.json(mockTestLoginResponses, { status: 200 });
  }),

  // POST /ai_recommend - AI 추천 주제 요청
  http.post(`${SERVER_URL}/ai_recommend`, ({ request }) => {
    const response =
      getVideoType(request) === 'short' ? mockRecommendShortResponse : mockRecommendLongResponse;
    return HttpResponse.json(response, { status: 200 });
  }),

  // POST /ai_title - AI 추천 제목 요청
  http.post(`${SERVER_URL}/ai_title`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const response =
      getVideoType(request) === 'short' ? mockAITitleShortResponse : mockAITitleLongResponse;
    return HttpResponse.json(response, { status: 200 });
  }),

  // POST /ai_thumbnail - AI 썸네일 가이드 요청
  http.post(`${SERVER_URL}/ai_thumbnail`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    const response =
      getVideoType(request) === 'short'
        ? mockAIThumbnailShortResponse
        : mockAIThumbnailLongResponse;
    return HttpResponse.json(response, { status: 200 });
  }),

  // POST /ai_script - AI 대본 초안(짧은 버전) 요청
  http.post(`${SERVER_URL}/ai_script`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response =
      getVideoType(request) === 'short' ? mockAIScriptShortResponse : mockAIScriptLongResponse;
    return HttpResponse.json(response, { status: 200 });
  }),

  // POST /ai_fullScript - 풀버전 대본 생성 버튼용
  http.post(`${SERVER_URL}/ai_fullScript`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const response =
      getVideoType(request) === 'short'
        ? mockAIFullScriptShortResponse
        : mockAIFullScriptLongResponse;
    return HttpResponse.json(response, { status: 200 });
  }),

  // POST /ai_reference - AI 참고 영상/크리에이터 요청
  http.post(`${SERVER_URL}/ai_reference`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, 900));
    const response =
      getVideoType(request) === 'short'
        ? mockAIReferenceShortResponse
        : mockAIReferenceLongResponse;
    return HttpResponse.json(response, { status: 200 });
  }),

  // POST /ai_titleResearch - AI 추천 제목 1개 재생성
  http.post(`${SERVER_URL}/ai_titleResearch`, ({ request }) => {
    const titles =
      getVideoType(request) === 'short'
        ? mockTitleResearchShortResponses
        : mockTitleResearchLongResponses;
    const index = Math.floor(Math.random() * titles.length);
    return HttpResponse.json(titles[index], { status: 200 });
  }),

  // GET /analyze/channel - 채널 분석 요청 (force=true 시 갱신 데이터)
  http.get(`${SERVER_URL}/analyze/channel`, async ({ request }) => {
    const force = new URL(request.url).searchParams.get('force') === 'true';
    if (force) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return HttpResponse.json(
      force ? mockChannelAnalysisForceRefreshResponse : mockChannelAnalysisResponse,
      { status: 200 },
    );
  }),

  // GET /analyze/video/:videoId - 영상 상세 분석 요청
  http.get(`${SERVER_URL}/analyze/video/:videoId`, () => {
    return HttpResponse.json(mockVideoAnalysisResponse, { status: 200 });
  }),

  // GET /keywords - 트렌드 키워드 요청
  http.get(`${SERVER_URL}/keywords`, () => {
    return HttpResponse.json(mockKeywordsResponse, { status: 200 });
  }),

  // GET /trending - 트렌드 페이지 전체 데이터
  http.get(`${SERVER_URL}/trending`, () => {
    return HttpResponse.json(mockTrendingResponse, { status: 200 });
  }),
];
