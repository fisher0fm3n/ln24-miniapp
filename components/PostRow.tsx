import Image from "next/image";
import Link from "next/link";
import { decodeHtml } from "@/lib/ln24";

export default function PostRow({
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
    <Link href={`/post/${post_id}`} className="flex px-4 py-2 gap-3 group">
      <div className="relative w-[120px] h-[120px] rounded-lg overflow-hidden shrink-0 bg-card">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="120px"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-extrabold text-foreground line-clamp-2 group-hover:text-primary">
          {title}
        </h3>
        {!!excerpt && (
          <p className="text-[13px] text-muted mt-1 line-clamp-2">
            {decodeHtml(excerpt.replace(/<[^>]*>/g, "")).trim()}
          </p>
        )}
        {!!date && (
          <p className="text-[13px] text-muted mt-1.5">
            {new Date(date).toLocaleDateString()}
          </p>
        )}
      </div>
    </Link>
  );
}
