import PropTypes from 'prop-types';
import styles from './RecipeCard.module.css';

function RecipeCard({ name, ingredients, preparation }) {
  return (
    <article className={`${styles.card} ${styles.recipes__card}`}>
      <h3 className={styles.card__title}>{name}</h3>
      <div className={styles.card__ingredients}>
        <h4 className={styles.card__subtitle}>Ingredientes:</h4>
        <ul className={styles.card__list}>
          {ingredients.map((ingredient) => {
            return (
              <li className={styles.card__item} key={ingredient.id}>
                <p className={styles.card__text}>{ingredient.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.card__preparation}>
        <h4 className={styles.card__subtitle}>Modo de preparo:</h4>
        <p className={styles.card__text}>{preparation}</p>
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
