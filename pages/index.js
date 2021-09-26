import Head from 'next/head'
import Link from 'next/link'
import Posts from './posts'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main-content">
        <header className="text-center">Welcome to next app</header>
        <Link href="posts">
          <div className="text-h2 text-center" style={{cursor: 'pointer'}}>See all posts click</div>
        </Link>
      </div>
    </div>
  )
}