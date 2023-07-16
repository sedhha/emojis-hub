import { config } from '@/config';
import { IEmoji, IEmojiResponse } from '@/interfaces/EmojiResponse';
import { create } from 'zustand';

interface StoreState {
  category: string;
  categories: string[];
  emojis: IEmoji[];
  isLoading: boolean;
  skip: number;
  total: number;
  setCategory: (category: string) => void;
  setCategories: (categories: string[]) => void;
  setEmojis: (emojis: IEmojiResponse) => void;
  setSkip: (increase: boolean) => void;
  setLoading: (loading: boolean) => void;
}

const useCategoryStore = create<StoreState>((set) => ({
  category: '',
  categories: [],
  emojis: [],
  isLoading: false,
  total: 0,
  skip: 0,
  setCategory: (newCategory: string) => set(() => ({ category: newCategory })),
  setCategories: (categories: string[]) =>
    set(() => ({ categories: [...categories], skip: 0 })),
  setEmojis: (content: IEmojiResponse) =>
    set(() => ({ emojis: [...content.emojis], total: content.total })),
  setSkip: (increase: boolean) =>
    set(({ skip, total }) => {
      let newSkip = skip;
      if (increase) {
        newSkip =
          skip + config.limit <= total - config.limit
            ? skip + config.limit
            : total - config.limit;
      } else {
        newSkip = skip - config.limit >= 0 ? skip - config.limit : 0;
      }
      return { skip: newSkip };
    }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useCategoryStore;
