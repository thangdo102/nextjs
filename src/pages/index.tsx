/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

export default function Home(props: any) {
  const { recipes } = props;

  return (
    <div>
      <Head>
        <title>Thang's Kitchen </title>
      </Head>

      <ul className="recipes-list">
        {recipes.length > 0 &&
          recipes.map((recipe: any) => (
            <li key={recipe.id} className="recipes-card">
              <Link href={`recipes/${recipe.slug}`}>
                <img src={recipe.image} alt="" />
                <span>{recipe.recipe}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(params: any) {
  const res = await axios.get(`${process.env.BASE_URL}/recipes`);
  return {
    props: {
      recipes: res.data,
    },
  };
}
