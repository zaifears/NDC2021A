import Image from "next/image";
import Link from "next/link";

type Props = { current?: "home" | "about" };

export default function SiteHeader({ current }: Props) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container site-header__bar">
          <Link href="/" className="wordmark" aria-label="NDC 2021 Group A, student directory home">
            <Image src="/ndc.svg" alt="" width={40} height={42} priority />
            <span>NDC 2021 Group A</span>
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <Link href="/#directory" aria-current={current === "home" ? "page" : undefined}>
              Directory
            </Link>
            <Link href="/about-ndc" aria-current={current === "about" ? "page" : undefined}>
              About the college
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
