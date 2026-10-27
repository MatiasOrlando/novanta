const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const statusModifier = (status = '') => {
  const s = status.toLowerCase()
  if (s.includes('out')) return 'out'
  if (s.includes('low')) return 'low'
  return 'in'
}

const ProductCard = ({ product }) => {
  const { id, title, description, price, sku, thumbnail, availabilityStatus, rating, reviews, tags } = product
  const titleId = `product-${id}-title`

  return (
    <article className="product-card" aria-labelledby={titleId}>
      <div className="product-card__media">
        <img
          className="product-card__image"
          src={thumbnail}
          alt={title}
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
        />
        {availabilityStatus && (
          <span className={`badge badge--${statusModifier(availabilityStatus)}`}>
            <span className="visually-hidden">Availability: </span>
            {availabilityStatus}
          </span>
        )}
      </div>

      <div className="product-card__body">
        <h2 id={titleId} className="product-card__title">{title}</h2>
        <p className="product-card__description">{description}</p>

        <div className="product-card__meta">
          <p className="product-card__price">
            <span className="visually-hidden">Price: </span>
            {priceFormatter.format(price)}
          </p>
          {rating != null && (
            <p className="product-card__rating">
              <span aria-hidden="true">★ </span>
              <span className="visually-hidden">Rated </span>
              {rating.toFixed(1)}
              <span className="visually-hidden"> out of 5</span>
            </p>
          )}
        </div>

        <p className="product-card__sku">SKU: {sku}</p>

        {tags?.length > 0 && (
          <ul className="tags" role="list" aria-label="Tags">
            {tags.map((tag) => (
              <li key={tag} className="tags__item">{tag}</li>
            ))}
          </ul>
        )}

        {reviews?.length > 0 && (
          <details className="reviews">
            <summary className="reviews__summary">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </summary>
            <ul className="reviews__list" role="list">
              {reviews.map((review, index) => (
                <li key={index} className="reviews__item">
                  <strong>{review.reviewerName}</strong>{' '}
                  <span aria-label={`${review.rating} out of 5`}>({review.rating}/5)</span>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </article>
  )
}

export default ProductCard
