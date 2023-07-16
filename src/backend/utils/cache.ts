import { IEmoji, IEmojiResponse } from '@/interfaces/EmojiResponse';

const cache: Record<string, IEmojiResponse> = {};

const addToCache = (key: string, value: IEmojiResponse): void => {
  cache[key] = { emojis: [...value.emojis], total: value.total };
};

const getFromCache = (key: string): IEmojiResponse | void => cache[key];

export { addToCache, getFromCache };
