import { Suspense } from "react";
import Fallback from "@/app/_ui/Fallback";
import Spinner from "@/app/_components/Spinner";
import CardWraper from "@/app/_components/profileComponents/CardWraper";
import PostTable from "@/app/_components/postsComponents/PostTable";

function Page() {
  return (
    <div>
      <h1 className="text-xl text-secondary-700 mb-8">داشبورد</h1>
      <Suspense fallback={<Fallback />}>
        <CardWraper />
      </Suspense>
      <h2 className="text-xl text-secondary-600 mb-4">پست‌های اخیر</h2>

      <Suspense fallback={<Spinner />}>
        <PostTable query="sort=latest&limit=5" />
      </Suspense>
    </div>
  );
}

export default Page;
