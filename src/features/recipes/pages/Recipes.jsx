import Button from '../../../shared/components/ui/button/Button.jsx';
import Input from '../../../shared/components/ui/input/Input.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import { useState } from 'react';
import './Recipes.css';

function Recipes() {
  const recipesList = [
    { id: 1, name: 'Sopa', ingredients: [], preparation: '' },
    { id: 2, name: 'Creme', ingredients: [], preparation: '' },
    { id: 3, name: 'Patê', ingredients: [], preparation: '' },
  ];

  const [recipeToSearch, setRecipeToSearch] = useState('');

  const handleChange = (e) => {
    setRecipeToSearch(e.target.value);
  };

  const handleSearch = async (data) => {
    console.log(data);

    // ...
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(recipeToSearch);
  };

  return (
    <section className="recipes content__recipes">
      <h1 className="recipes__title">Sugestões de hoje</h1>
      <ul className="recipes__list">
        {recipesList.map((recipe) => {
          return (
            <li className="recipes__item" key={recipe.id}>
              <RecipeCard
                name={recipe.name}
                ingredients={recipe.ingredients}
                preparation={recipe.preparation}
              />
            </li>
          );
        })}
      </ul>
      <h2 className="recipes__subtitle">Quer alguma outra sugestão?</h2>
      <form className="recipes__form" name="recipes" onSubmit={handleSubmit} /*noValidate*/>
        <label className="recipes__label" htmlFor="search">
          Pesquise você mesmo :)
        </label>
        <Input
          className="recipes__input"
          id="search"
          type="text"
          name="recipe"
          pattern="^[^<>]+$" /* bloqueia os caracteres < e > */
          title="Qual receita gostaria de pesquisar? Não são permitidos '<' e '>'."
          placeholder="Qual receita gostaria de pesquisar?"
          value={recipeToSearch}
          onChange={handleChange}
          required
        />
        <Button className="recipes__button" type="submit">
          Pesquisar
        </Button>
      </form>
    </section>
  );
}

export default Recipes;
