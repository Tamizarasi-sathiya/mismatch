import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>MisMatch | Where differences spark connections</title>
        <meta name="description" content="MisMatch dating app" />
      </Head>
      <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#FAFAFE] to-[#F3F0FF]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#A78BFA] mb-4">MisMatch</h1>
          <p className="text-[#6B7280]">Where differences spark connections.</p>
        </div>
      </main>
    </>
  );
}
