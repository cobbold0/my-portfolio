import Image from "next/image";
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Card className="h-full overflow-hidden">
      <Image
        src={post.coverImage || "/projects/placeholder.svg"}
        alt={post.title}
        width={1200}
        height={675}
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{post.summary}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          {new Date(post.date).toLocaleDateString()} · {post.readingTime}
        </p>
      </CardContent>
    </Card>
  );
}
