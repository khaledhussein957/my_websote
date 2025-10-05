import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const initialEmail = searchParams?.email ?? "";
  return <ResetPasswordForm initialEmail={initialEmail} />;
}
