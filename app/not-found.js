import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
function notFound() {
  return (
    <div className="container xl:max-w-screen-xl">
      <div className="flex justify-center pt-10">
        <div>
          <h1 className="text-xl font-bold text-red-600 mb-8">
            صفحه‌ای که دنبالش بودید، پیدا نشد
          </h1>

          <Link
            href="/"
            className="flex items-center gap-x-2 text-secondary-500"
          >
            <ArrowRightIcon className="w-6 h-6 text-primary-900" />
            <span>بازگشت به خانه</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default notFound;
