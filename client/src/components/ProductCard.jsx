export default function ProductCard({ name, description, image, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>${price.toFixed(2)}</p>
    </div>
  )
}
