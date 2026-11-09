import Image from "next/image";
import Link from "next/link";
import ScrollWrapper from "@/components/ScrollWrapper";

export default function SiteFooter() {
  return (
    <>
      <ScrollWrapper />
      <footer className="site-footer">
        <div className="container site-footer__mast">
          <Link href="/" className="site-footer__brand" aria-label="NDC 2021 Group A, student directory home">
            <Image src="/ndc.svg" alt="" width={64} height={68} />
            <span>NDC 2021 Group A</span>
          </Link>
          <nav className="site-footer__links" aria-label="Footer">
            <Link href="/">Student directory</Link>
            <Link href="/about-ndc">About NDC and the ID guide</Link>
            <a href="https://ndc.edu.bd/" target="_blank" rel="noopener noreferrer">
              Official college portal
            </a>
          </nav>
          <div className="site-footer__credit">
            <p>
              Built with Next.js and TypeScript. Open source project by{" "}
              <a href="https://shahoriar.bd" target="_blank" rel="noopener noreferrer">
                Md Al Shahoriar Hossain (62101030)
              </a>
              .
            </p>
            <p data-credits>
              Photographs of the campus: Wikimedia Commons, credited beside each picture on the college guide.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
