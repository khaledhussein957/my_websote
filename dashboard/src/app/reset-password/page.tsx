import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  return <ResetPasswordForm code={code} />;
}
