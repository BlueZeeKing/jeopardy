import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jeopardy</title>
        <meta name="description" content="Jeopardy website for engineering club" />
      </Head>

      <main>
        <h1>Jeopardy</h1>
      </main>

      <footer>
        <h3 className="text-gray-500 text-center absolute w-screen bottom-0 underline p-6"><a href="github.com/BlueZeeKing24">BlueZeeKing24</a></h3>
      </footer>
    </div>
  )
}
