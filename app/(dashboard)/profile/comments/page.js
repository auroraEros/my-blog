import CommentsTable from "./_components/CommentsTable";

function Page() {
  return (
    <div>
      <h1 className="text-secondary-700 text-xl font-bold">لیست نظرات</h1>

      <div>
        <CommentsTable />
      </div>
    </div>
  );
}

export default Page;
