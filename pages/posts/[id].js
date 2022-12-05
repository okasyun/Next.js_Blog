import Head from "next/head";

import Layout from "../../components/layout";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

import { getAllPostIds, getPostData } from "../../lib/post";

// paths: {params: {id: string;};}[]のparamsを取得？
export async function getStaticProps({ params }) {
  // awaitの関数が返されないとそれ以降の処理を実行できない（非同期通信）
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

// idがとりうる値のリストを返す
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* ブラウザ DOM における innerHTML の React での代替 */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
