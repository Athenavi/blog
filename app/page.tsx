import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export default function Home() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title,
      date: data.date,
    }
  })

  // Sort posts by date
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </Link>
            <p className="text-gray-500">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

