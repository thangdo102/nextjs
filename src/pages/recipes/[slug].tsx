import axios from "axios";

export default function OneRecipe({ ingredient }: any) {
  const ingredients = ingredient?.ingredients.replace(/'/g, '"'); //replacing all ' with "

  return (
    <article>
      <h1>{ingredient.recipe}</h1>
      <main className="mainOne">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ingredient.image} alt="" />
        <div className="instruction">
          <ul className="ingredients">
            {JSON.parse(ingredients).map((ing: any, index: any) => (
              <li className="ingredient" key={index}>
                {ing}
              </li>
            ))}
          </ul>
          <h3>{ingredient.instruction}</h3>
        </div>
      </main>
    </article>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(`${process.env.BASE_URL}/recipes`);
  const recipes = res.data;

  const paths = recipes.map((re: any) => ({
    params: { slug: re.slug },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await axios.get(
    `${process.env.BASE_URL}/ingredients/${params.slug}`
  );

  const ingredient = res.data;
  return { props: { ingredient } };
}
