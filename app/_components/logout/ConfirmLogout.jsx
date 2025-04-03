"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_context/AuthContext";
import { logoutApi } from "@/app/_lib/authService";
import Button from "@/app/_ui/Button";

function ConfirmLogout({onClose}) {
  const router = useRouter();
  const { logout,  isLoading} = useAuth();

  async function logoutHandler() {
    await logoutApi();
    logout();
    router.refresh();
    onClose()
  }
  return (
    <div>
      <h2 className="font-bold text-base mb-8 text-secondary-700">
        آیا از خروج از حساب مطمئن هستید؟
      </h2>
      <div className="flex justify-between items-center gap-x-16">
        <Button
          className="flex-1"
          variant="outline"
          onClick={onClose}
          type="button"
        >
          لغو
        </Button>
        <Button
          type="button"
          disabled={isLoading}
          variant="danger"
          className="flex-1"
          onClick={logoutHandler}
        >
          تایید
        </Button>
      </div>
    </div>
  );
}

export default ConfirmLogout;
