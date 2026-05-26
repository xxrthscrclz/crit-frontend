import { create } from 'zustand';

interface SimilarVideo {
  videoUrl: string;
  videoTitle: string;
}

interface SimilarCreator {
  channelUrl: string;
  creatorName: string;
}

interface AIFormData {
  conceptSummary: string;
  suggestedTitles: string[];
  thumbnail: {
    thumbnailImage: string;
    thumbnailGuide: string;
  };
  similarVideos: SimilarVideo[];
  similarCreators: SimilarCreator[];
}

const createEmptyAIFormData = (): AIFormData => ({
  conceptSummary: '',
  suggestedTitles: [],
  thumbnail: { thumbnailImage: '', thumbnailGuide: '' },
  similarVideos: [],
  similarCreators: [],
});

interface AIFormStore {
  data: AIFormData | null;
  setData: (data: AIFormData) => void;
  initLoadingData: () => void;
  patchData: (partial: Partial<AIFormData>) => void;
  updateSuggestedTitle: (index: number, title: string) => void;
  clear: () => void;
}

const useAIFormStore = create<AIFormStore>(set => ({
  data: null,
  setData: data => set({ data }),
  initLoadingData: () => set({ data: createEmptyAIFormData() }),
  patchData: partial =>
    set(state => {
      const base = state.data ?? createEmptyAIFormData();
      return {
        data: {
          ...base,
          ...partial,
          ...(partial.thumbnail && {
            thumbnail: { ...base.thumbnail, ...partial.thumbnail },
          }),
        },
      };
    }),
  updateSuggestedTitle: (index, title) =>
    set(state => {
      if (!state.data) return state;
      const suggestedTitles = [...state.data.suggestedTitles];
      suggestedTitles[index] = title;
      return { data: { ...state.data, suggestedTitles } };
    }),
  clear: () => set({ data: null }),
}));

export default useAIFormStore;
