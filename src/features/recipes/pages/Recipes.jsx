import Button from '../../../shared/components/ui/button/Button.jsx';
import Input from '../../../shared/components/ui/input/Input.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import { useState, useRef, useEffect } from 'react';
import useTodayRecipes from '../hooks/useTodayRecipes.js';
import Loader from '../../../shared/components/ui/loader/Loader.jsx';
import Toast from '../../../shared/components/ui/toast/Toast.jsx';
import useSearchRecipes from '../hooks/useSearchRecipes.js';
import styles from './Recipes.module.css';

function Recipes() {
  const searchedResultsRef = useRef(null);

  const [recipeToSearch, setRecipeToSearch] = useState('');

  const { todayRecipes, loading: todayLoading, localError: todayError } = useTodayRecipes();

  const {
    loadSearchRecipes,
    loading: searchLoading,
    localError: searchError,
    searchedRecipes,
  } = useSearchRecipes();

  useEffect(() => {
    if (searchedRecipes.length > 0) {
      searchedResultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [searchedRecipes]);

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

  if (todayLoading) {
    return (
      <Loader className={`${styles.recipes__loader} ${styles['content__recipes-loader']}`}>
        Carregando receitas...
      </Loader>
    );
  }

  if (todayError) {
    return (
      <Toast
        className={`${styles.recipes__toast} ${styles['content__recipes-toast']}`}
        message={`Erro ao carregar receitas. ${todayError.message}`}
      />
    );
  }

  return (
    <section className={`${styles.recipes} ${styles.content__recipes}`}>
      <h1 className={styles.recipes__title}>Sugestões de hoje</h1>
      <ul className={styles.recipes__list}>
        {todayRecipes.map((recipe) => {
          return (
            <li className={styles.recipes__item} key={recipe.id}>
              <RecipeCard
                name={recipe.name}
                ingredients={recipe.ingredients}
                preparation={recipe.preparation}
              />
            </li>
          );
        })}
      </ul>

      <div className={styles['recipes__form-box']}>
        <h2 className={styles.recipes__subtitle}>Quer alguma outra sugestão?</h2>
        <form
          className={styles.recipes__form}
          name="recipes"
          onSubmit={handleSubmit} /*noValidate*/
        >
          <label className={styles.recipes__label} htmlFor="search">
            Pesquise você mesmo :)
          </label>
          <Input
            className={styles.recipes__input}
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

          {searchError && <Toast className={styles.recipes__toast} message={searchError.message} />}

          <Button className={styles.recipes__button} type="submit">
            {searchLoading ? 'Pesquisando...' : 'Pesquisar'}
          </Button>
        </form>
      </div>

      {searchedRecipes.length > 0 && (
        <ul
          className={`${styles.recipes__list} ${styles.recipes__list_searched}`}
          ref={searchedResultsRef}
        >
          {searchedRecipes.map((recipe) => {
            return (
              <li
                className={`${styles.recipes__item} ${styles.recipes__item_searched}`}
                key={recipe.id}
              >
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
