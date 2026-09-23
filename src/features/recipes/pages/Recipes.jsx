import Button from '../../../shared/components/ui/button/Button.jsx';
import Input from '../../../shared/components/ui/input/Input.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import { useState } from 'react';
import useTodayRecipes from '../hooks/useTodayRecipes.js';
import Loader from '../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../shared/components/ui/toast/Toast.jsx';
import useSearchRecipes from '../hooks/useSearchRecipes.js';
import './Recipes.css';

function Recipes() {
  const [recipeToSearch, setRecipeToSearch] = useState('');

  const { todayRecipes, loading, error } = useTodayRecipes();

  const {
    loadSearchRecipes,
    loading: searchLoading,
    error: searchError,
    searchedRecipes,
  } = useSearchRecipes();

  const handleChange = (e) => {
    setRecipeToSearch(e.target.value);
  };

  const handleSearch = async (data) => {
    const result = await loadSearchRecipes(data);

    if (result.success) {
      setRecipeToSearch('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(recipeToSearch);
  };

  if (loading) {
    return (
      <Loader className="recipes__loader content__recipes-loader">Carregando receitas...</Loader>
    );
  }

  if (error) {
    return (
      <Toast
        className="recipes__toast content__recipes-toast"
        message={`Erro ao carregar receitas. ${error.message}`}
      />
    );
  }

  return (
    <section className="recipes content__recipes">
      <h1 className="recipes__title">Sugestões de hoje</h1>
      <ul className="recipes__list">
        {todayRecipes.map((recipe) => {
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

        {searchError && <Toast className="recipes__toast" message={searchError.message} />}

        <Button className="recipes__button" type="submit">
          {searchLoading ? 'Pesquisando...' : 'Pesquisar'}
        </Button>
      </form>

      {searchedRecipes.length > 0 && (
        <ul className="recipes__list recipes__list_searched">
          {searchedRecipes.map((recipe) => {
            return (
              <li className="recipes__item recipes__item_searched" key={recipe.id}>
                <RecipeCard
                  name={recipe.name}
                  ingredients={recipe.ingredients}
                  preparation={recipe.preparation}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Recipes;
