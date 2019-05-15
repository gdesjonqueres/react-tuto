'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var product_data = [{
  'name': 'Clavier',
  'category': 'Ordinateur',
  'inStock': true,
  'price': 20
}, {
  'name': 'Souris',
  'category': 'Ordinateur',
  'inStock': true,
  'price': 12
}, {
  'name': 'Modem',
  'category': 'Ordinateur',
  'inStock': false,
  'price': 60
}, {
  'name': 'Casserole',
  'category': 'Cuisine',
  'inStock': true,
  'price': 45
}, {
  'name': 'Spatule',
  'category': 'Cuisine',
  'inStock': true,
  'price': 8
}, {
  'name': 'Fouet',
  'category': 'Cuisine',
  'inStock': false,
  'price': 5
}, {
  'name': 'Fourchette',
  'category': 'Cuisine',
  'inStock': true,
  'price': 1
}];

var ProductRow = function ProductRow(_ref) {
  var product = _ref.product;

  var name = product.inStock ? product.name : React.createElement(
    'span',
    { style: { color: 'red' } },
    product.name
  );

  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      null,
      name
    ),
    React.createElement(
      'td',
      null,
      product.price
    )
  );
};

var ProductCategoryRow = function ProductCategoryRow(_ref2) {
  var category = _ref2.category;

  return React.createElement(
    'tr',
    null,
    React.createElement(
      'th',
      { colSpan: '2' },
      category
    )
  );
};

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

var ProductTable = function ProductTable(_ref3) {
  var filterText = _ref3.filterText,
      inStockOnly = _ref3.inStockOnly,
      products = _ref3.products;

  var productRows = [];
  var lastCategory = '';

  products.forEach(function (product) {
    if (filterText && product.name.indexOf(filterText) === -1) {
      return false;
    }
    if (inStockOnly && !product.inStock) {
      return false;
    }

    if (product.category !== lastCategory) {
      productRows.push(React.createElement(ProductCategoryRow, {
        key: product.category,
        category: product.category
      }));
    }

    productRows.push(React.createElement(ProductRow, {
      key: product.name,
      product: product
    }));

    lastCategory = product.category;
  });

  return React.createElement(
    'table',
    null,
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          null,
          'Name'
        ),
        React.createElement(
          'th',
          null,
          'Price'
        )
      )
    ),
    React.createElement(
      'tbody',
      null,
      productRows
    )
  );
};

var SearchBar = function SearchBar(_ref4) {
  var filterText = _ref4.filterText,
      inStockOnly = _ref4.inStockOnly,
      onFilterTextChange = _ref4.onFilterTextChange,
      onInStockChange = _ref4.onInStockChange;

  var handleFilterTextChange = function handleFilterTextChange(e) {
    onFilterTextChange(e.target.value);
  };

  var handleInStockChange = function handleInStockChange(e) {
    onInStockChange(e.target.checked);
  };

  return React.createElement(
    'form',
    null,
    React.createElement('input', {
      type: 'text',
      value: filterText,
      onChange: handleFilterTextChange,
      placeholder: 'Search...'
    }),
    React.createElement(
      'p',
      null,
      React.createElement('input', {
        type: 'checkbox',
        checked: inStockOnly,
        onChange: handleInStockChange
      }),
      ' ',
      'Only show products in stock'
    )
  );
};

var FilterableProductTable = function (_React$Component) {
  _inherits(FilterableProductTable, _React$Component);

  function FilterableProductTable() {
    var _ref5;

    var _temp, _this, _ret;

    _classCallCheck(this, FilterableProductTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref5 = FilterableProductTable.__proto__ || Object.getPrototypeOf(FilterableProductTable)).call.apply(_ref5, [this].concat(args))), _this), _this.state = {
      'filterText': '',
      'inStockOnly': false
    }, _this.onFilterTextChange = function (filterText) {
      _this.setState({ filterText: filterText });
    }, _this.onInStockChange = function (inStockOnly) {
      _this.setState({ inStockOnly: inStockOnly });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FilterableProductTable, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(SearchBar, {
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly,
          onFilterTextChange: this.onFilterTextChange,
          onInStockChange: this.onInStockChange
        }),
        React.createElement('br', null),
        React.createElement(ProductTable, {
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly,
          products: this.props.data
        })
      );
    }
  }]);

  return FilterableProductTable;
}(React.Component);

var domContainer = document.querySelector('#filterable_product_table_container');
ReactDOM.render(React.createElement(FilterableProductTable, { data: product_data }), domContainer);