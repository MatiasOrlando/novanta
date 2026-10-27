import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'

const BASE_URL = 'https://dummyjson.com/products'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    // const controller = new AbortController()

    const loadProducts = async () => {
      try {
        const res = await fetch(BASE_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setProducts(data.products)
      } catch (error) {
        if (error.name === 'AbortError') return
        setError(error.message)
      } finally {
        // if (!controller.signal.aborted) setLoading(false)
        setLoading(false)
      }
    }

    loadProducts()
    // return () => controller.abort()
  }, [])

  const q = query.trim().toLowerCase()
  const filtered = q
    ? products.filter((p) => p.title.toLowerCase().includes(q))
    : products

  return (
    <div className="catalog">
      <header className="catalog__header">
        <h1 className="catalog__title">Product Catalog</h1>

        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search" className="search__label">
            Search products by title
          </label>
          <input
            type="search"
            id="search"
            className="search__input"
            placeholder="e.g. mascara"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </header>

      <main className="catalog__main" aria-busy={loading}>
        {loading && (
          <p className="catalog__state" role="status">Loading products…</p>
        )}

        {error && (
          <p className="catalog__state catalog__state--error" role="alert">
            Could not load products ({error}).
          </p>
        )}

        {!loading && !error && (
          <>
            <p className="catalog__count" role="status" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
              {q && <> matching “{query.trim()}”</>}
            </p>

            {filtered.length > 0 ? (
              <ul className="product-grid" role="list">
                {filtered.map((product) => (
                  <li key={product.id} className="product-grid__item">
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="catalog__state">No products match your search.</p>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
