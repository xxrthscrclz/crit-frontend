// 첫 번째 API (/ai_recommend) 모킹 응답 - 롱폼
export const mockRecommendLongResponse = [
  {
    suggestedTitle: '유튜브 알고리즘이 좋아하는 영상 구조 3가지',
    conceptSummary: '조회수를 높이는 영상 흐름을 실전 예시로 분석',
  },
  {
    suggestedTitle: '구독자 1000명까지 가장 빠른 방법',
    conceptSummary: '초기 채널 성장 전략을 단계별로 정리',
  },
  {
    suggestedTitle: '썸네일 클릭률을 2배 올리는 디자인 법칙',
    conceptSummary: 'CTR을 높이는 썸네일 구성 요소 분석',
  },
];

/** @deprecated mockRecommendLongResponse 사용 */
export const mockRecommendResponse = mockRecommendLongResponse;

// 첫 번째 API (/ai_recommend) 모킹 응답 - 숏폼
export const mockRecommendShortResponse = [
  {
    suggestedTitle: '30초 안에 끝내는 여행 브이로그 꿀팁',
    conceptSummary: '짧은 숏폼으로 여행지 분위기를 빠르게 전달하는 구성',
  },
  {
    suggestedTitle: '알고리즘이 좋아하는 숏폼 훅 5가지',
    conceptSummary: '첫 3초에 시청자를 붙잡는 오프닝 패턴 정리',
  },
  {
    suggestedTitle: '1분 챌린지로 조회수 올리기',
    conceptSummary: '짧은 챌린지 콘텐츠 기획과 편집 포인트',
  },
];

const longFormScript = `[0부] 인트로 및 오프닝
[카메라 응시]
안녕하세요! 여러분, 반갑습니다.
오늘도 영상 클릭해 주셔서 정말 감사합니다.

여러분, 혹시 그거 아셨나요?
우리가 매일 무심코 지나치는 일상 속에도 아주 작은 변화만 주면 완전히 새로운 세상이 열린다는 사실 말이죠.

그래서 오늘 준비했습니다.
정말 많은 분들이 댓글로 요청해 주셨던 바로 그 주제, 지금 바로 시작해 보겠습니다!

[1부] 본론 1: 무엇이 문제인가?
[화면 전환: 관련 자료 화면 또는 화면 캡처]
먼저 우리가 가장 많이 하는 실수부터 짚고 넘어가 볼까요?

보통 이 문제를 해결하려고 할 때, 다들 이렇게 생각하십니다.
"대충 이렇게 하면 되겠지?"

하지만 현실은 절대 그렇지 않죠.
오히려 시간과 노력만 낭비하게 되는 경우가 정말 많습니다.

그 이유가 뭘까요?
바로 '핵심 포인트'를 놓치고 있기 때문입니다.

우리의 목표는 빠르고, 정확하고, 게다가 효율적이어야 합니다.
세 가지 조건 중 하나라도 빠지면 안 되거든요.

자, 그럼 여기서 화면을 잘 집중해 주세요.

[2부] 본론 2: 해결책과 구체적인 방법
[화면 전환: 시연 장면, 클로즈업]
제가 직접해보면서 시행착오 끝에 알아낸 가장 확실한 방법, 지금부터 딱 3가지만 기억하시면 됩니다.

첫 번째는 기본 세팅입니다.
이게 가장 중요해요.
기초 공사가 튼튼해야 무너지지 않는 것처럼, 처음 시작할 때 5분만 투자해서 설정을 맞춰두면 앞으로의 과정이 정말 편해집니다.

두 번째는 템플릿 활용입니다.
매번 새롭게 만들 필요가 전혀 없습니다.
잘 만들어진 뼈대만 가져와서 내 입맛에 맞게 살짝 수정만 해주면 끝납니다.

세 번째는 마무리 검토입니다.
다 끝났다고 방심하면 안 되겠죠?
마지막에 딱 10초만 투자해서 전체적으로 확인을 해줘야 실수가 없습니다.

[3부] 클로징 및 아웃트로
[카메라 응시, 부드러운 미소]
자, 어떠신가요? 생각보다 정말 간단하지 않나요?

처음에는 조금 낯설고 어렵게 느껴질 수도 있지만, 딱 한 번만 직접 따라 해보시면 금방 감을 잡으실 수 있을 거예요.

오늘 영상 보시면서 이해가 안 가거나 더 궁금한 점이 있으시다면 언제든지 편하게 아래 댓글로 남겨주세요.
제가 아는 선에서 최대한 꼼꼼하게 답변해 드리겠습니다.

오늘 영상이 유익하셨다면 구독과 좋아요, 그리고 알림 설정까지 꼭 부탁드릴게요.
여러분의 작은 응원이 저에게는 정말 큰 힘이 됩니다.

그럼 저는 다음 주에 더 알차고 재미있는 영상으로 다시 찾아뵙겠습니다.
여러분, 모두 좋은 하루 보내세요! 안녕~!`;

const shortFormScript = `[0~3초] 훅
[빠른 컷 + 자막]
"이거 모르면 숏폼 조회수 절대 안 나와요."

[3~15초] 핵심 1
[화면 캡처 + 포인트 자막]
첫 3초에 결론을 보여주세요. 시청자는 기다려주지 않습니다.

[15~45초] 핵심 2~3
[빠른 B-roll + 숫자 강조]
① 강한 훅 ② 한 가지 메시지 ③ 마지막 CTA

[45~60초] 마무리
[카메라 or 텍스트 엔딩]
"저장해두고 다음 숏폼 만들 때 써보세요!"`;

// 두 번째 API (/ai_script) 모킹 응답 - 롱폼
export const mockScriptLongResponse = [
  {
    conceptSummary: longFormScript,
    suggestedTitles: [
      '유튜브 알고리즘이 좋아하는 영상 구조 3가지 (이것만 알면 조회수 달라짐)',
      '조회수 안 나오는 영상의 공통점 | 구조가 문제입니다',
      '유튜브 잘 되는 영상 vs 안 되는 영상 차이점 분석',
      '알고리즘 탈 수 있는 영상 만드는 법 (실전 비교)',
      '영상 구조만 바꿔도 조회수 2배 | 유튜브 성장 공식',
    ],
    thumbnail: {
      thumbnailImage:
        'https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2020/08/Youtube-thumbnail-banner.jpg?w=435&h=304&crop=1',
      thumbnailGuide: "밝은 배경에 큰 텍스트로 '3가지' 강조, 화살표 이미지로 상승 추세 표현",
    },
    similarVideos: [
      {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoTitle: '유튜브 조회수 늘리는 방법 TOP 5',
      },
      {
        videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        videoTitle: '영상 구조 분석 | 성공한 유튜버들의 공통점',
      },
      {
        videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        videoTitle: '알고리즘 이해하고 영상 만들기',
      },
    ],
    similarCreators: [
      {
        channelUrl: 'https://www.youtube.com/channel/UCxxxxxx',
        creatorName: '유튜브 성장 전문가 채널',
      },
      {
        channelUrl: 'https://www.youtube.com/channel/UCyyyyyy',
        creatorName: '콘텐츠 기획 마스터',
      },
    ],
  },
];

/** @deprecated mockScriptLongResponse 사용 */
export const mockScriptResponse = mockScriptLongResponse;

// 두 번째 API (/ai_script) 모킹 응답 - 숏폼
export const mockScriptShortResponse = [
  {
    conceptSummary: shortFormScript,
    suggestedTitles: [
      '30초 숏폼 훅 | 첫 3초가 전부입니다',
      '알고리즘이 좋아하는 1분 숏폼 공식',
      '숏폼 조회수 2배 | 이 3가지만 바꿔보세요',
      '릴스·쇼츠 필수 | 빠른 전개 스크립트',
      '1분 챌린지 숏폼 기획법 (초보도 OK)',
    ],
    thumbnail: {
      thumbnailImage:
        'https://www.shutterstock.com/ko/blog/wp-content/uploads/sites/17/2020/08/Youtube-thumbnail-banner.jpg?w=435&h=304&crop=1',
      thumbnailGuide: '세로 9:16 비율, 큰 숫자·짧은 문구, 대비 강한 색상으로 스크롤 멈춤 유도',
    },
    similarVideos: [
      {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoTitle: '숏폼 훅 5가지 | 첫 3초 공식',
      },
      {
        videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        videoTitle: '1분 챌린지 숏폼 편집 팁',
      },
    ],
    similarCreators: [
      {
        channelUrl: 'https://www.youtube.com/channel/UCzzzzzz',
        creatorName: '숏폼 크리에이터 랩',
      },
    ],
  },
];

export const mockTitleResearchLongResponses = [
  { suggestedTitle: '조회수 폭발! 유튜브 알고리즘이 원하는 영상 구조 (완벽 정리)' },
  { suggestedTitle: '이 구조만 알면 조회수 2배 | 유튜버 필수 영상 공식' },
  { suggestedTitle: '알고리즘 타는 영상 만드는 3가지 핵심 (초보도 가능)' },
];

/** @deprecated mockTitleResearchLongResponses 사용 */
export const mockTitleResearchResponses = mockTitleResearchLongResponses;

export const mockTitleResearchShortResponses = [
  { suggestedTitle: '30초 훅만 바꿔도 조회수 2배 | 숏폼 필수 공식' },
  { suggestedTitle: '알고리즘이 좋아하는 1분 숏폼 | 첫 3초가 전부' },
  { suggestedTitle: '릴스·쇼츠 조회수 올리는 스크립트 (초보도 OK)' },
];
