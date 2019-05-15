'use strict'

const units = {
  'c': 'Celsius',
  'f': 'Farenheit'
}

const toFarenheit = celsius => {
  return (celsius * 9 / 5) + 32
}

const toCelsius = farenheit => {
  return (farenheit - 32) * 5 / 9
}

const tryConvert = (temp, convert) => {
  const input = parseFloat(temp)
  if (Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

const BoilingVerdict = ({ celsius }) => {
  if (!Number.isNaN(celsius) && celsius >= 100) {
    return <p>Water is boiling.</p>
  }
  return <p>Water is not boiling.</p>
}

const TemperatureInput = ({ unit, temperature, updateTemperature }) => {

  const handleChange = (e) => {
    updateTemperature(e.target.value)
  }

  return (
    <form>
      <input type='text'
    // if (this.state.unit === 'c') {
    //   celsius = this.state.temp
    //   farenheit = tryConvert(celsius, toFarenheit)
    // } else {
    //   farenheit = this.state.temp
    //   celsius = tryConvert(farenheit, toCelsius)
    // }

        value={temperature}
        onChange={handleChange}
        placeholder={`Enter temperature in ${units[unit]}`}
      />&nbsp;
      {units[unit]}
    </form>
  )
}

class TemperatureCalculator extends React.Component {
  state = {
    temp: 0,
    unit: 'c'
  }

  updateCelsius = (temp) => {
    this.setState({
      temp: temp,
      unit: 'c'
    })
  }

  updateFarenheit = (temp) => {
    this.setState({
      temp: temp,
      unit: 'f'
    })
  }

  render () {
    // let celsius, farenheit = 0
    const temp = this.state.temp
    const celsius = this.state.unit === 'c' ? temp : tryConvert(temp, toCelsius)
    const farenheit = this.state.unit === 'f' ? temp : tryConvert(temp, toFarenheit)

    return (
      <div>
        <TemperatureInput
          unit='c'
          temperature={celsius}
          updateTemperature={this.updateCelsius}
        />
        <TemperatureInput
          unit='f'
          temperature={farenheit}
          updateTemperature={this.updateFarenheit}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    )
  }
}

let domContainer = document.querySelector('#temperature_converter_container');
ReactDOM.render(<TemperatureCalculator />, domContainer);
