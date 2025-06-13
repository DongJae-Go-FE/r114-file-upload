import LoginForm from "@/components/LoginForm";

export default async function Login() {
  return (
    <main className="w-[100dvw] h-[100dvh] bg-gray-200 flex justify-center items-center">
      <LoginForm className="w-[400px]" />
    </main>
  );
}
