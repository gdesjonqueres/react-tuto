'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var units = {
  'c': 'Celsius',
  'f': 'Farenheit'
};

var toFarenheit = function toFarenheit(celsius) {
  return celsius * 9 / 5 + 32;
};

var toCelsius = function toCelsius(farenheit) {
  return (farenheit - 32) * 5 / 9;
};

var tryConvert = function tryConvert(temp, convert) {
  var input = parseFloat(temp);
  if (Number.isNaN(input)) {
    return '';
  }
  var output = convert(input);
  var rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
};

var BoilingVerdict = function BoilingVerdict(_ref) {
  var celsius = _ref.celsius;

  if (!Number.isNaN(celsius) && celsius >= 100) {
    return React.createElement(
      'p',
      null,
      'Water is boiling.'
    );
  }
  return React.createElement(
    'p',
    null,
    'Water is not boiling.'
  );
};

var TemperatureInput = function TemperatureInput(_ref2) {
  var unit = _ref2.unit,
      temperature = _ref2.temperature,
      updateTemperature = _ref2.updateTemperature;


  var handleChange = function handleChange(e) {
    updateTemperature(e.target.value);
  };

  return React.createElement(
    'form',
    null,
    React.createElement('input', { type: 'text'
      // if (this.state.unit === 'c') {
      //   celsius = this.state.temp
      //   farenheit = tryConvert(celsius, toFarenheit)
      // } else {
      //   farenheit = this.state.temp
      //   celsius = tryConvert(farenheit, toCelsius)
      // }

      , value: temperature,
      onChange: handleChange,
      placeholder: 'Enter temperature in ' + units[unit]
    }),
    '\xA0',
    units[unit]
  );
};

var TemperatureCalculator = function (_React$Component) {
  _inherits(TemperatureCalculator, _React$Component);

  function TemperatureCalculator() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, TemperatureCalculator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = TemperatureCalculator.__proto__ || Object.getPrototypeOf(TemperatureCalculator)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
      temp: 0,
      unit: 'c'
    }, _this.updateCelsius = function (temp) {
      _this.setState({
        temp: temp,
        unit: 'c'
      });
    }, _this.updateFarenheit = function (temp) {
      _this.setState({
        temp: temp,
        unit: 'f'
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TemperatureCalculator, [{
    key: 'render',
    value: function render() {
      // let celsius, farenheit = 0
      var temp = this.state.temp;
      var celsius = this.state.unit === 'c' ? temp : tryConvert(temp, toCelsius);
      var farenheit = this.state.unit === 'f' ? temp : tryConvert(temp, toFarenheit);

      return React.createElement(
        'div',
        null,
        React.createElement(TemperatureInput, {
          unit: 'c',
          temperature: celsius,
          updateTemperature: this.updateCelsius
        }),
        React.createElement(TemperatureInput, {
          unit: 'f',
          temperature: farenheit,
          updateTemperature: this.updateFarenheit
        }),
        React.createElement(BoilingVerdict, { celsius: parseFloat(celsius) })
      );
    }
  }]);

  return TemperatureCalculator;
}(React.Component);

var domContainer = document.querySelector('#temperature_converter_container');
ReactDOM.render(React.createElement(TemperatureCalculator, null), domContainer);