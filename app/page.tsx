import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export default function Home() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  let posts = []

  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory)
    posts = fileNames.map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return {
        slug: fileName.replace(/\.md$/, ''),
        title: data.title,
        date: data.date,
      }
    })

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="block p-4 rounded-lg bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-muted-foreground">{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  )
}

