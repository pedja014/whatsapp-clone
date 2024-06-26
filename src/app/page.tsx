import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center dark:bg-black dark:text-white">
      <h1 className="mb-1 text-6xl font-extrabold text-blue-500">Messenger-4-Us</h1>
      <p className="mb-10 ">Chatting app</p>
      <Button as={Link} href="/chat">
        Start chatting
      </Button>
    </div>
  );
}
