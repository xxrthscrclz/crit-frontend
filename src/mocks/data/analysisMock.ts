// Analysis 페이지 Mock 데이터

const mockChannelProfile = {
  handle: '@CRiT',
  profileImageUrl: '',
  channelId: 'UCpJw2H9KKqwCCGQKRh1Bf2w',
  name: 'CRiT',
  subscriberCount: 100000000,
};

const mockPercentileVideoAnalysis = [
  {
    videoId: 'VXEXCOUOOBM',
    title: 'AI 추천 CRiT의 등장',
    thumbnailUrl: '',
    percentileScore: 51,
    reason:
      '콘텐츠 만족도이(가) 상위 7%로 뛰어나요. 도달력을(를) 개선하면 점수가 올라갈 수 있어요.',
  },
  {
    videoId: 'IT0mlafrYEM',
    title: 'AI로 성장하는 인플루언서',
    thumbnailUrl: '',
    percentileScore: 65,
    reason: '시청자 반응이(가) 상위 6%로 뛰어나요. 도달력을(를) 개선하면 점수가 올라갈 수 있어요.',
  },
  {
    videoId: 'Ia5dP5DTR-8',
    title: '수상할 정도로 카직스를 잘하는',
    thumbnailUrl: '',
    percentileScore: 61,
    reason:
      '콘텐츠 만족도이(가) 상위 14%로 뛰어나요. 도달력을(를) 개선하면 점수가 올라갈 수 있어요.',
  },
  {
    videoId: 'adhfGPYJFtk',
    title: '증바람',
    thumbnailUrl: '',
    percentileScore: 72,
    reason: '콘텐츠 만족도이(가) 상위 26%로 뛰어나요. 전반적으로 균형 잡힌 성과를 보이고 있어요.',
  },
  {
    videoId: 'k5UC25k6cK4',
    title: '5년 만에 페이커 손에 쥐어진 총검',
    thumbnailUrl: '',
    percentileScore: 75,
    reason: '콘텐츠 만족도이(가) 상위 15%로 뛰어나요. 전반적으로 균형 잡힌 성과를 보이고 있어요.',
  },
  {
    videoId: '9-i2b4aCxLQ',
    title: '화제의 페이커 암베사 정글 챌린지',
    thumbnailUrl: '',
    percentileScore: 58,
    reason:
      '콘텐츠 만족도이(가) 상위 11%로 뛰어나요. 도달력을(를) 개선하면 점수가 올라갈 수 있어요.',
  },
  {
    videoId: 'Z7l05JEefxw',
    title: '현준이 교육 들어갑니다',
    thumbnailUrl: '',
    percentileScore: 73,
    reason: '콘텐츠 만족도이(가) 상위 10%로 뛰어나요. 전반적으로 균형 잡힌 성과를 보이고 있어요.',
  },
  {
    videoId: 'JnnmPHpAbg0',
    title: '신을 뵙습니다',
    thumbnailUrl: '',
    percentileScore: 74,
    reason: '콘텐츠 만족도이(가) 상위 14%로 뛰어나요. 전반적으로 균형 잡힌 성과를 보이고 있어요.',
  },
  {
    videoId: 'pkVtkP-TFuw',
    title: '두바이 쫀득 구체',
    thumbnailUrl: '',
    percentileScore: 73,
    reason: '콘텐츠 만족도이(가) 상위 14%로 뛰어나요. 전반적으로 균형 잡힌 성과를 보이고 있어요.',
  },
  {
    videoId: 'EBO3CWo-81A',
    title: '페즈리얼 많이 세다, 자기 전에 생각 많이 날거야',
    thumbnailUrl: '',
    percentileScore: 76,
    reason: '콘텐츠 만족도이(가) 상위 17%로 뛰어나요. 전반적으로 균형 잡힌 성과를 보이고 있어요.',
  },
];

export const mockChannelAnalysisResponse = {
  channel: mockChannelProfile,
  channelScore: {
    overall: 58,
    topPercent: 42,
    comment: '구독자 수가 적지만 시청자 반응이 좋은 편이며, 콘텐츠 만족도 개선이 필요해 보입니다.',
    factors: [
      {
        weight: 40,
        score: 69,
        name: '도달력',
        description: '구독자 대비 조회수',
      },
      {
        weight: 40,
        score: 76,
        name: '채널 평균 대비',
        description: '채널 평소 성적 대비 상대 성과',
      },
      {
        weight: 20,
        score: 0,
        name: '일평균 조회수',
        description: '시간 대비 조회수 성장 속도',
      },
    ],
  },
  summary: {
    avgViewCount: 109.0,
    avgViewCountChange: null,
    uploadFrequencyPerWeek: 0.0,
    uploadFrequencyChange: null,
    avgWatchDurationSeconds: 0.0,
    avgWatchDurationChange: null,
    subscriberChange: 0,
    subscriberChangePercent: 0.0,
    isFirstAnalysis: true,
  },
  guides: [
    {
      title: '시청자 반응 증진을 통한 영향력 확대',
      description:
        '시청자 반응(engagement) 지표는 현재 상위 25% 수준인 0.0367로 양호한 편입니다. 하지만 시청자 참여도를 더욱 높여 지속적인 채널 성장을 도모할 필요가 있습니다. 영상 내용의 흥미도와 가치성을 높이고, 시청자와의 상호작용을 강화하는 등의 노력으로 시청자 반응 지표를 개선해 나가세요.',
      metric: 'engagement',
      current: 0.03669724770642202,
      target: 0.017719649825967725,
      benchmark: {
        p75: 0.017719649825967725,
        p25: 0.008189655172413794,
        p50: 0.012291294742664471,
      },
    },
    {
      title: '조회수 증대를 통한 콘텐츠 영향력 제고',
      description:
        '채널의 평균 일일 조회수는 16회로 하위 25% 수준에 머물러 있습니다. 고퀄리티 콘텐츠 제작, 태그/제목/썸네일 최적화, 관련 동영상 및 플레이리스트 활용 등을 통해 조회수를 지속적으로 높여나가세요. 이를 통해 채널의 노출과 잠재적 구독자 기반을 확대할 수 있습니다.',
      metric: 'dailyViews',
      current: 15.571428571428571,
      target: 549677.0,
      benchmark: {
        p75: 549677.0,
        p25: 14604.0,
        p50: 57639.0,
      },
    },
    {
      title: '구독자 수 증대를 통한 지속적인 성장 기반 마련',
      description:
        '채널의 VPS(조회수/구독자) 지표는 12.111로 상위 25% 수준에 해당합니다. 현재 구독자 수가 9명으로 매우 적은 편이므로, 양질의 콘텐츠 제작과 적극적인 구독자 유치 활동을 통해 구독자 수를 늘려나가세요. 안정적인 구독자 기반을 확보하면 지속가능한 채널 성장이 가능할 것입니다.',
      metric: 'vps',
      current: 12.11111111111111,
      target: 20.98404858299595,
      benchmark: {
        p75: 20.98404858299595,
        p25: 0.5828,
        p50: 2.897280701754386,
      },
    },
  ],
  percentileVideoAnalysis: mockPercentileVideoAnalysis,
  percentileDataCollectedAt: '2026-05-04T05:32:04.674274+00:00',
};

/** force=true 갱신 시 반환할 mock (점수만 변경) */
export const mockChannelAnalysisForceRefreshResponse = {
  ...mockChannelAnalysisResponse,
  channelScore: {
    ...mockChannelAnalysisResponse.channelScore,
    overall: 65,
    topPercent: 35,
    factors: mockChannelAnalysisResponse.channelScore.factors.map(factor => ({
      ...factor,
      score: factor.score + 8,
    })),
  },
  percentileVideoAnalysis: mockPercentileVideoAnalysis.map(video => ({
    ...video,
    percentileScore: video.percentileScore + 7,
  })),
  percentileDataCollectedAt: new Date().toISOString(),
};
