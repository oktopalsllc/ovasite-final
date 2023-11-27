import Link from './Link';
import SocialIcon from '@/components/social-icons';
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="py-4 lg:px-20 px-4 flex flex-col gap-4 lg:flex-row lg:justify-between items-center">
        <div className="flex flex-row space-x-2 text-sm text-gray-800 justify-between items-center">
          <Link href="/"><Image alt="Logo" src="/Logo.png" width={40} height={40} /></Link>
          <p className="text-base text-sm">{`© ${new Date().getFullYear()}`}</p>
        </div>
        <div className="flex flex-row lg:items-center text-base justify-between gap-4 text-sm text-gray-800">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <div>{` • `}</div>
          <Link href="/terms" className="hover:underline">
            Terms of Use
          </Link>
        </div>
        <div className="flex flex-row gap-2">
          <SocialIcon kind="mail" href={`mailto:contact@oktopals.com`} size={6} />
          <SocialIcon kind="linkedin" href='https://www.linkedin.com/company/httpswwwlinkedincomoktopalsllc'size={6} />
          <SocialIcon kind="twitter" href='https://twitter.com/oktopals' size={6} />
        </div>
      </div>
    </footer>
  );
};