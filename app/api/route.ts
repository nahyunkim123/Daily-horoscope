import { NextRequest, NextResponse } from "next/server";

interface Content {
  name: string;
  keyword?: string;
  desc: string;
  index: string;
}

interface DateDetail {
  title: string;
  date: string;
  content: Content[];
}

interface UserData {
  year: string;
  constellation: string;
}

interface Result {
  day: DateDetail;
  tomorrow: DateDetail;
  month: DateDetail;
  userData: UserData;
}

interface JsonResponse {
  result: Result;
  resultMSG: string;
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const query = req.nextUrl.searchParams;
  const gender = query.get("gender");
  const birthdate = query.get("birthdate");
  const month = query.get("month");
  const time = query.get("time");
  console.log(gender, birthdate, month, time);
  const res = await fetch(
    `https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0&gender=${gender}&birth=${birthdate}&solarCal=${month}&time=${time}`
  );
  console.log(res);

  function convert(str: string): JsonResponse | null {
    const fixedStr = str
      .replace(/^window\.__jindo2_callback\._fortune_my_0\(/, "")
      .replace(/\);$/, "");

    try {
      const parsedJson: JsonResponse = JSON.parse(
        fixedStr.replace(/([\w]+) ?:/g, '"$1":')
      );
      if (parsedJson) {
        return parsedJson;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  const resTxt = await res.text();
  const resultData = convert(resTxt);
  console.log(resultData);

  // https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver

  return NextResponse.json(resultData);
};
