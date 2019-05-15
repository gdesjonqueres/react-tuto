'use strict'

const product_data = [
  {
    'name': 'Clavier',
    'category': 'Ordinateur',
    'inStock': true,
    'price': 20
  },
  {
    'name': 'Souris',
    'category': 'Ordinateur',
    'inStock': true,
    'price': 12
  },
  {
    'name': 'Modem',
    'category': 'Ordinateur',
    'inStock': false,
    'price': 60
  },
  {
    'name': 'Casserole',
    'category': 'Cuisine',
    'inStock': true,
    'price': 45
  },
  {
    'name': 'Spatule',
    'category': 'Cuisine',
    'inStock': true,
    'price': 8
  },
  {
    'name': 'Fouet',
    'category': 'Cuisine',
    'inStock': false,
    'price': 5
  },
  {
    'name': 'Fourchette',
    'category': 'Cuisine',
    'inStock': true,
    'price': 1
  },
]

const ProductRow = ({ product }) => {
  const name = product.inStock ? product.name : <span style={{color: 'red'}}>{product.name}</span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <th colSpan='2'>{category}</th>
    </tr>
  )
}

// const ProductTable = ({ filterText, inStockOnly, products }) => {
//   let productRows = []
//   let lastCategory = ''
//
//   products.forEach(product => {
//     let row
//     let productSelected = true
//
//     if (filterText && product.name.indexOf(filterText) == -1) {
//       productSelected = false
//     }
//     if (inStockOnly && !product.inStock) {
//       productSelected = false
//     }
//
//     if (productSelected) {
//       if (product.category !== lastCategory) {
//         row = <ProductCategoryRow
//           key={product.category}
//           category={product.category}
//         />
//         productRows.push(row)
//       }
//
//       row = <ProductRow
//         key={product.name}
//         product={product}
//       />
//       productRows.push(row)
//       lastCategory = product.category
//     }
//   })
//
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         {productRows}
//       </tbody>
//     </table>
//   )
// }

const ProductTable = ({ filterText, inStockOnly, products }) => {
  const productRows = []
  let lastCategory = ''

  products.forEach(product => {
    if (filterText && product.name.indexOf(filterText) === -1) {
      return false
    }
    if (inStockOnly && !product.inStock) {
      return false
    }

    if (product.category !== lastCategory) {
      productRows.push(
        <ProductCategoryRow
          key={product.category}
          category={product.category}
        />)
    }

    productRows.push(
      <ProductRow
        key={product.name}
        product={product}
      />)

    lastCategory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
  )
}

const SearchBar = ({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockChange
}) => {
  const handleFilterTextChange = e => {
    onFilterTextChange(e.target.value)
  }

  const handleInStockChange = e => {
    onInStockChange(e.target.checked)
  }

  return (
    <form>
        <input
          type='text'
          value={filterText}
          onChange={handleFilterTextChange}
          placeholder='Search...'
        />
      <p>
        <input
          type='checkbox'
          checked={inStockOnly}
          onChange={handleInStockChange}
        />
        {' '}
        Only show products in stock
      </p>
    </form>
  )
}

class FilterableProductTable extends React.Component {
  state = {
    'filterText': '',
    'inStockOnly': false
  }

  onFilterTextChange = (filterText) => {
    this.setState({ filterText })
  }

  onInStockChange = (inStockOnly) => {
    this.setState({ inStockOnly })
  }

  render () {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.onFilterTextChange}
          onInStockChange={this.onInStockChange}
        />
        <br />
        <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          products={this.props.data}
        />
      </div>
    )
  }
}

let domContainer = document.querySelector('#filterable_product_table_container');
ReactDOM.render(<FilterableProductTable data={product_data} />, domContainer);
