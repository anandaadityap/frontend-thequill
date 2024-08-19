import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

interface BackButtonProps {
  href: string;
}

const BackButton = ({ href }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-lg mb-5 text-slate-950 hover:text-slate-950/70 w-fit"
    >
      <IoMdArrowRoundBack />
      <p>Back</p>
    </Link>
  );
};

export default BackButton;
