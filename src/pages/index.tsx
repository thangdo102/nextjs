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

      <h1>Welcome to Thang's Kitchen</h1>

      <ul className="recipes-list">
        {recipes.length > 0 &&
          recipes.map((recipe: any) => (
            <li key={recipe.id} className="recipes-card">
              <Link href={`recipes/${recipe.slug}`}>
                <img src={recipe.image} alt=""></img>
                <span>{recipe.recipce}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(params: any) {
  const res = await axios.get("http://localhost:3001/recipes");
  return {
    props: {
      recipes: res.data,
    },
  };
}
