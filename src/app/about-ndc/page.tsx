import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NdcIdExplainer from "@/components/NdcIdExplainer";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const SITE = "https://ndc2021a.vercel.app";

export const metadata: Metadata = {
  title: { absolute: "About Notre Dame College, Dhaka: history and student ID guide" },
  description:
    "Notre Dame College (NDC) Dhaka in brief: its history, Room 153 in the Father Tim Building, how the 8-digit student ID works, and a campus map.",
  alternates: {
    canonical: "/about-ndc",
  },
  openGraph: {
    title: "About Notre Dame College, Dhaka and Batch 2021 Group A",
    description:
      "Notre Dame College (NDC) Dhaka: history, Room 153 in the Father Tim Building, the student ID breakdown and the campus location.",
    url: "/about-ndc",
    type: "article",
    images: [
      {
        url: "/images/campus/father-timm-bhaban.jpg",
        width: 1440,
        height: 1080,
        alt: "Father Timm Bhaban at Notre Dame College, Dhaka",
      },
    ],
  },
};

export default function AboutNdcPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Notre Dame College, Dhaka and Batch 2021 Group A",
    description:
      "Overview of Notre Dame College (NDC) Dhaka, classroom details for Father Tim Building Room 153, student ID structure breakdown, and campus location.",
    url: `${SITE}/about-ndc`,
    mainEntityOfPage: `${SITE}/about-ndc`,
    image: `${SITE}/images/campus/father-timm-bhaban.jpg`,
    author: {
      "@type": "Person",
      name: "Md. Al Shahoriar Hossain",
      url: "https://shahoriar.bd",
    },
    publisher: {
      "@type": "Organization",
      name: "NDC 2021 Group A Community",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/logo-512.png`,
      },
    },
    about: {
      "@type": "CollegeOrUniversity",
      name: "Notre Dame College, Dhaka",
      url: "https://ndc.edu.bd",
      sameAs: "https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "About Notre Dame College", item: `${SITE}/about-ndc` },
    ],
  };

  return (
    <>
      <SiteHeader current="about" />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
        />

        <header className="container page-head">
          <h1>Notre Dame College, Dhaka and Batch 2021 Group A</h1>
          <p className="lead">
            Founded in 1949 by the Congregation of Holy Cross, Notre Dame College (NDC) is one of the premier colleges
            in Bangladesh, known for high academic standards and student discipline.
          </p>
        </header>

        {/* History */}
        <section className="section band" aria-labelledby="history-title">
          <div className="container split">
            <h2 id="history-title">About Notre Dame College</h2>
            <div className="prose">
              <p>
                Notre Dame College was established in November 1949 in Laxmibazar, Dhaka, by the Roman Catholic
                Congregation of Holy Cross. In May 1954, the college relocated to its present Arambagh, Motijheel
                campus. Over the decades, thousands of students have graduated from NDC to become notable scientists,
                educators, public servants, and entrepreneurs across Bangladesh and worldwide.
              </p>
              <p>
                The college is widely known for its separate admission test, weekly Sunday quizzes, strict
                punctuality requirements, and more than 24 student-run co-curricular clubs.
              </p>
              <p className="refs">
                <span className="refs__title">Primary references</span>
                <a href="https://ndc.edu.bd/" target="_blank" rel="noopener noreferrer">
                  Official NDC website (ndc.edu.bd)
                </a>
                <a
                  href="https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Notre Dame College, Dhaka on Wikipedia
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Room 153 */}
        <section className="section" aria-labelledby="room-title">
          <div className="container split split--even">
            <figure className="photo">
              <div className="photo__frame">
                <Image
                  src="/images/campus/father-timm-bhaban.jpg"
                  alt="The brick and white Father Timm Bhaban at Notre Dame College, Dhaka"
                  width={1440}
                  height={1080}
                  sizes="(min-width: 60rem) 50vw, 100vw"
                />
              </div>
              <figcaption>
                Father Timm Bhaban. Image source:{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Father_Timm_Bhaban_at_Notre_Dame_College,_Dhaka.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikimedia Commons / Wikipedia (CC0)
                </a>
              </figcaption>
            </figure>
            <div style={{ display: "grid", gap: "var(--space-xl)" }}>
              <h2 id="room-title">Father Tim Building: Room 153</h2>
              <div className="prose">
                <p>
                  For <strong>Batch 2021 Group A</strong> (Business Studies), our classes took place on the ground
                  floor of the <strong>Father Tim Building (Father Timm Bhaban)</strong> in <strong>Room 153</strong>.
                </p>
                <p>
                  The building is named after <strong>Father Richard William Timm, CSC</strong> (1923 to 2020). He was
                  an American zoologist, educator, the 6th principal of Notre Dame College, Ramon Magsaysay Award
                  laureate, and recipient of the Friends of Liberation War Honour by Bangladesh for his support during
                  the 1971 Liberation War.
                </p>
              </div>
              <dl className="facts">
                <div>
                  <dt>Classroom location</dt>
                  <dd>Father Tim Building, Ground Floor, Room 153, Notre Dame College, Arambagh, Dhaka.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ID decoder */}
        <section className="section band" aria-labelledby="id-guide-title">
          <div className="container">
            <NdcIdExplainer />
          </div>
        </section>

        {/* Campus photographs */}
        <section className="section" aria-labelledby="campus-title">
          <div className="container">
            <div className="section__head">
              <h2 id="campus-title">Campus photos and grounds</h2>
            </div>
            <div className="showcase">
              <figure className="photo">
                <div className="photo__frame">
                  <Image
                    src="/images/campus/entrance.jpg"
                    alt="Notre Dame College main entrance"
                    width={1440}
                    height={833}
                    sizes="(min-width: 60rem) 58vw, 100vw"
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  Main college entrance gate. Source:{" "}
                  <a
                    href="https://commons.wikimedia.org/wiki/File:Notre_Dame_College_entrance.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikimedia Commons / Wikipedia
                  </a>
                </figcaption>
              </figure>
              <figure className="photo">
                <div className="photo__frame">
                  <Image
                    src="/images/campus/field.jpg"
                    alt="Notre Dame College sports field"
                    width={1440}
                    height={960}
                    sizes="(min-width: 60rem) 40vw, 100vw"
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  Campus sports field. Source:{" "}
                  <a
                    href="https://commons.wikimedia.org/wiki/File:Field_of_Notre_Dame_College,_Dhaka.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikimedia Commons / Wikipedia
                  </a>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Directory link */}
        <section className="section band band--ink" aria-labelledby="connect-title">
          <div className="container statement-wrap">
            <h2 id="connect-title" className="statement">
              Connecting Batch 2021 Group A
            </h2>
            <div className="statement-wrap__row">
              <p>
                After completing HSC in 2021, students moved on to different universities, career paths, and cities
                across Bangladesh and abroad. This site helps all 132 classmates from Group A find contacts and social
                profiles, and stay connected as alumni.
              </p>
              <Link className="btn btn--sheet" href="/">
                View the student directory
              </Link>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="section" aria-labelledby="map-title">
          <div className="container">
            <div className="section__head">
              <h2 id="map-title">Campus location</h2>
              <div style={{ display: "grid", gap: "var(--space-md)", justifyItems: "start" }}>
                <address className="address lead">
                  Toyenbee Circular Road, Arambagh, Motijheel, Dhaka 1000, Bangladesh.
                </address>
                <a
                  className="btn"
                  href="https://maps.google.com/?cid=14324905845214487465"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
            <div className="map">
              <iframe
                title="Notre Dame College Dhaka on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.4764426543265!2d90.41838637599026!3d23.730389389552194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85a34079867%3A0xc6cbfaeb8ff923a9!2sNotre%20Dame%20College!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="440"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
