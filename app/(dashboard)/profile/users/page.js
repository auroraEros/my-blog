import UsersTable from "@/app/_components/usersComponents/UsersTable"

function Page() {
  return (
    <div>
      <h1 className="text-secondary-700 text-xl font-bold mb-8">لیست کاربران</h1>

      <div>
       <UsersTable/>
      </div>
    </div>
  )
}

export default Page
