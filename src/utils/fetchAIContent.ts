import {
  postAITitle,
  postAIThumbnail,
  postAIFullScript,
  postAIReference,
  type ScriptRequest,
} from '@/api/command';
import useAIFormStore from '@/stores/useAIFormStore';

/** 4개 AI API를 병렬 호출하고, 응답마다 store에 즉시 반영 */
export const fetchAIContent = (data: ScriptRequest) => {
  const { initLoadingData, patchData } = useAIFormStore.getState();
  initLoadingData();

  postAITitle(data)
    .then(res => patchData({ suggestedTitles: (res.suggestedTitles ?? []).slice(0, 3) }))
    .catch(err => console.error('제목 요청 실패:', err));

  postAIThumbnail(data)
    .then(res =>
      patchData({
        thumbnail: {
          thumbnailImage: res.thumbnailImage ?? '',
          thumbnailGuide: res.thumbnailGuide ?? '',
        },
      }),
    )
    .catch(err => console.error('썸네일 요청 실패:', err));

  postAIFullScript(data)
    .then(res => patchData({ fullScript: res.fullScript ?? '' }))
    .catch(err => console.error('대본 요청 실패:', err));

  postAIReference(data)
    .then(res =>
      patchData({
        similarVideos: res.similarVideos ?? [],
        similarCreators: res.similarCreators ?? [],
      }),
    )
    .catch(err => console.error('참고 요청 실패:', err));
};
