import PropTypes from 'prop-types';
import './RecipeCard.css';

function RecipeCard({ name, ingredients, preparation }) {
  return (
    <article className="recipe-card recipes__recipe-card">
      <h3 className="recipe-card__title">{name}</h3>
      <div className="recipe-card__ingredients">
        <h4 className="recipe-card__subtitle">Ingredientes:</h4>
        <ul className="recipe-card__list">
          {ingredients.map((ingredient) => {
            return (
              <li key={ingredient.id}>
                <p>{ingredient.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="recipe-card__preparation">
        <h4 className="recipe-card__subtitle">Modo de preparo:</h4>
        <p className="recipe-card__text">{preparation}</p>
      </div>
    </article>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  preparation: PropTypes.string.isRequired,
};

export default RecipeCard;
