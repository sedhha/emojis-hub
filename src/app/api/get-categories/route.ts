import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { IEmoji } from '@/interfaces/EmojiResponse';

const GET = async (req: NextRequest) => {
  return axios
    .get<IEmoji[]>(`https://emojihub.yurace.pro/api/all`)
    .then(({ data }) => {
      if (data)
        return NextResponse.json(
          Array.from(new Set(data.map((item) => item.category)))
        );
    });
};

export { GET };
