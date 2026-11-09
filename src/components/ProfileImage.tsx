import Image from "next/image";

/**
 * The student's own photograph. Visible with scripting off: no opacity gate, the frame's
 * paper wash is the only placeholder while the picture loads.
 */
export default function ProfileImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="profile__photo" style={{ margin: 0 }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 60rem) 360px, 420px"
        priority
      />
    </figure>
  );
}
