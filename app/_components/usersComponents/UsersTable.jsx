"use client";
import Table from "@/app/_ui/Table";
import UserRow from "./UserRow";
import { useUsers } from "@/app/_hooks/useUsers";
import Spinner from "../Spinner";
import Fallback from "@/app/_ui/Fallback";

function UsersTable() {
  const { data, error, isLoading } = useUsers();
  const users = data?.users ?? [];

  if (isLoading) {
    return (
     <Fallback/>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        خطا در دریافت اطلاعات کاربران
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center text-secondary-700 py-8">
        هیچ کاربری وجود ندارد!
      </div>
    );
  }

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>نام</th>
        <th>ایمیل</th>
        <th>بوک‌مارک شده‌ها</th>
        <th>لایک‌ شده‌ها</th>
        <th>تاریخ ایجاد</th>
      </Table.Header>
      <Table.Body>
        {users.map((user, index) => (
          <UserRow key={user._id} user={user} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default UsersTable;
