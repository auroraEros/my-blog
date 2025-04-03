"use client";
import ProfileEditForm from "@/app/_components/userComponents/ProfileEditForm";
import { useAuth } from "@/app/_context/AuthContext";

function Page() {
  const { user } = useAuth();
 

  return (
    <div>
      <h1 className="text-secondary-700 text-xl font-bold mb-8">ویرایش پروفایل</h1>

      <div>{user ? <ProfileEditForm user={user}/> : null}</div>
    </div>
  );
}

export default Page;
