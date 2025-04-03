import { fetchCardsData } from "@/app/_lib/data";
import { Card } from "./Card";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";

async function CardWraper() {
  const { numOfUsers, numOfComments, numOfPosts } = await fetchCardsData();
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-8">
      <Card title="کاربران" value={toPersianDigits(numOfUsers)} type="users" />
      <Card title="پست‌ها" value={toPersianDigits(numOfPosts)} type="posts" />
      <Card
        title="نظرات"
        value={toPersianDigits(numOfComments)}
        type="comments"
      />
    </div>
  );
}

export default CardWraper;
