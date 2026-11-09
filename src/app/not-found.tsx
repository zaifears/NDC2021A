import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: { absolute: "Page not found | NDC 2021 Group A" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="lost">
        <div className="container lost__inner">
          <p className="lost__code num" aria-hidden="true">
            404
          </p>
          <h1>This page is not in the directory</h1>
          <p className="lead">The link may be old, or the name may have been spelled differently.</p>
          <div className="lost__actions">
            <Link className="btn btn--primary" href="/#directory">
              Search the directory
            </Link>
            <Link className="btn" href="/about-ndc">
              About the college
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
