import Image from "next/image";
import Link from "next/link";
import { decodeHtml } from "@/lib/ln24";

export default function ArticleCard({
  post_id,
  title,
  image,
  excerpt,
  date,
}: {
  post_id: number;
  title: string;
  image: string;
  excerpt?: string;
  date?: string;
}) {
  return (
    <Link href={`/post/${post_id}`} className="block px-4 py-4 group">
      <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-card">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        )}
      </div>
      <h2 className="mt-3 text-2xl font-extrabold leading-tight text-foreground group-hover:text-primary">
        {title}
      </h2>
      {!!excerpt && (
        <p className="mt-2 text-lg leading-snug text-muted line-clamp-3">
          {decodeHtml(excerpt.replace(/<[^>]*>/g, "")).trim()}
        </p>
      )}
      {!!date && (
        <p className="mt-3 text-base text-muted">
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
    </Link>
  );
}
