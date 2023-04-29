import axios from "axios";

export default function OneRecipe({ ingredient }: any) {
  return (
    <article>
      <h1>{ingredient.recipe}</h1>
      <main className="mainOne">
        <img src={ingredient.image} />
        <div className="instruction">
          <ul className="ingredients">
            {ingredient.ingredients.map((ing: any, index: any) => (
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
  const res = await axios.get("http://localhost:3001/recipes");
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
    `http://localhost:3001/ingredients/${params.slug}`
  );
  const ingredient = res.data;
  return { props: { ingredient } };
}
