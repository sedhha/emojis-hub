import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { IEmoji, IEmojiResponse } from '@/interfaces/EmojiResponse';
import { addToCache, getFromCache } from '@/backend/utils/cache';

const GET = async (req: NextRequest): Promise<NextResponse<IEmojiResponse>> => {
  const { searchParams } = new URL(req.url);
  const limit = Math.floor(+(searchParams.get('limit') ?? -1));
  const skip = Math.floor(+(searchParams.get('skip') ?? 0));
  const category = searchParams.get('category') ?? '';
  const cacheKey = `${limit}-${skip}-${category}`;
  const cacheItem = getFromCache(cacheKey);
  if (!!cacheItem) return NextResponse.json(cacheItem);
  return axios
    .get<IEmoji[]>(`https://emojihub.yurace.pro/api/all`)
    .then(({ data, status }) => {
      if (status !== 200) return NextResponse.json({ emojis: [], total: 0 });
      const newContent = !!category
        ? data.filter((item) => item.category.toLocaleLowerCase() === category)
        : data;
      const slicedContent = newContent.slice(
        skip,
        limit !== -1 ? skip + limit : undefined
      );
      const result = { emojis: slicedContent, total: newContent.length };
      addToCache(cacheKey, result);
      return NextResponse.json(result);
    });
};

export { GET };
