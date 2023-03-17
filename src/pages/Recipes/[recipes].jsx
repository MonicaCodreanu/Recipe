import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Recipe() {
  const [recipeData, setRecipeData] = useState({});
  const router = useRouter();
  const { recipes } = router.query;
  const [ingredients, setIngredients] = useState([]);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipes}`;
  const fetchData = () => {
    if (recipes) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          for (let i = 1; i <= 20; i++) {
            if (data.meals[0][`strIngredient${i}`]) {
              setIngredients((prev) => [
                ...prev,
                {
                  ingredient: data.meals[0][`strIngredient${i}`],
                  measure: data.meals[0][`strMeasure${i}`],
                },
              ]);
            }
          }

          setRecipeData(data.meals[0]);
        });
    }
  };

  useEffect(fetchData, [recipes]);
  return (
    <>
      <div className="pages">
        <h1>{recipeData.strMeal}</h1>
        <img className="bigImage" src={recipeData.strMealThumb} alt="" />
        <div className="ingredients">
          <h3>Needed ingredients:</h3>
          <ul>
            {ingredients &&
              ingredients.map((el, index) => {
                return (
                  <li key={index}>
                    {el.ingredient} - {el.measure}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="instructions">
          <h3>Instructions:</h3>
          <ol>
            {recipeData.strInstructions &&
              recipeData.strInstructions
                .trim()
                .split(".")
                .map((el, index) => {
                  if (el) {
                    return <li key={index}>{el}.</li>;
                  } else {
                    return;
                  }
                })}
          </ol>
        </div>
      </div>
    </>
  );
}
export default Recipe;
