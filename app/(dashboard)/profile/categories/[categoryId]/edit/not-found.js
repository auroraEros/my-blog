import Link from "next/link";

function NotFound() {
  return (
    <div className="container xl:max-w-screen-xl">
      <div className="flex justify-center pt-10">
        <div>
          <p className="text-2xl font-semibold text-secondary-500 mb-8">
            هیچ دسته‌بندی‌ای یافت نشد
          </p>
          <Link href="/profile" className="text-primary-900 text-lg font-bold">
            بازگشت به پروفایل
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
