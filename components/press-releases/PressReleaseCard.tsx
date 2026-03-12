import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Badge } from "@/components/ui";

interface PressReleaseCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  location?: string;
}

export function PressReleaseCard({
  slug,
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  location,
}: PressReleaseCardProps) {
  return (
    <Link href={`/press-release/${slug}`} className="group">
      <Card className="h-full hover:shadow-primary-lg hover:border-ocean-500 transition-all duration-300 hover:-translate-y-1">
        <CardHeader>
          <div className="mb-3">
            <Badge variant="default" className="bg-gradient-to-r from-slate-100 to-ocean-50 text-ocean-700 border border-ocean-200 shadow-sm">{category}</Badge>
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-ocean-700 transition-colors">{title}</CardTitle>
          <CardDescription className="line-clamp-3 mt-2 text-slate-600">
            {excerpt}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-200 pt-4">
          <span className="font-medium text-slate-700">{author}</span>
          <div className="flex items-center gap-2">
            <span>📖 {readTime}</span>
            <span>•</span>
            <time>📅 {date}</time>
            {location && (
              <>
                <span>•</span>
                <span>📍 {location}</span>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
