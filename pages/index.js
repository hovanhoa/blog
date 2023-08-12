import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Robert Ho</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <Image
              src="/hovanhoa-notion.jpg"
              width="80"
              height="80"
            />
            <svg
              height="80"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="12 0.18999999999999906 487.619 510.941"
            >
            </svg>
            <h2>hey, I'm Robert 👋</h2>
          </div>
          <p>
            I'm Software Engineer with an academic background in Computer Science and a passion for problem solving and software development. 
            I've been working on Odoo app development for one year now.
            <br/>
            <br/>
            Thank you for visiting. Have a good day👌
            {/* <a href={`https://www.notion.so/${databaseId}`}>this table</a>. Get
            the source code on{" "}
            <a href="https://github.com/samuelkraft/notion-blog-nextjs">
              Github
            </a>{" "}
            or read{" "}
            <a href="https://samuelkraft.com/blog/building-a-notion-blog-with-public-api">
              my blogpost
            </a>{" "}
            on building your own. */}
          </p>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <Text text={post.properties.Name.title} />
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/${post.id}`}>Read post →</Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
