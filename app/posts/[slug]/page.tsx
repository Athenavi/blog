import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// 根据您的帖子目录调整路径
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }))
}

// 定义 Post Props 的类型
interface PostProps {
  params: {
    slug: string
  }
}

export default async function Post({ params }: PostProps) {
  // 使用 await 等待 params 的解析
  const { slug } = await params;

  // 构建 markdown 文件的完整路径
  const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);

  return (
    <article>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: processedContent.toString() }} />
    </article>
  );
}