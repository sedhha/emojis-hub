interface IEmoji {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
  unicode: string[];
}

interface IEmojiResponse {
  emojis: IEmoji[];
  total: number;
}

export type { IEmoji, IEmojiResponse };
