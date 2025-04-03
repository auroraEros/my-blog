import CommentsTable from "@/app/_components/commentsComponents/CommentsTable";
import Fallback from "@/app/_ui/Fallback";
import { Suspense } from "react";

function Page() {
  return (
    <div>
      <h1 className="text-secondary-700 text-xl font-bold mb-8">لیست نظرات</h1>

      <div>
        <Suspense fallback={<Fallback />}>
          <CommentsTable />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
