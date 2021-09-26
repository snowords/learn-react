import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const snoword = { name: 'Word', nick: 'Snow' }  

function nickName(snoword, reverse) {
  if (reverse === '1') {
    return snoword.nick + ' ' + snoword.name
  } else {
    return snoword.name + ' ' + snoword.nick
  }
}

// 两种定义组件的方式

// function Welcome(prop) {
//   console.log(prop)
//   return <h1>Hello, {nickName(snoword, '1')}. Hello, {nickName(snoword)}</h1>
// }

class Welcome extends React.Component {
  render() {
    console.log(this.props)
    return <h1>Hello, {this.props.name}</h1>
  }
}
// const element = <Welcome name="Sara" />;
// 将三个组件合并成一个根组件
function App(props) {
  if(!props.show) {
    return null
  }
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  )
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  )
}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

const commentInfo = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64'
  }
}


function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}</h2>
}
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <FormattedDate date={this.state.date} />
      </div>
    )
  }
}

function DemoForm() {
  const [isToggleOn, setIsToogleOn] = useState(true)
  function handleSubmit(e) {
    e.preventDefault()
    console.log(e)
  }
  function handleClick() {
    setIsToogleOn(!isToggleOn)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          Submit
        </button>
      </form>
      <button onClick={handleClick}>{isToggleOn ? 'ON' : 'OFF'}</button>
      {/* 条件渲染 */}
      {!isToggleOn && <h2>哈哈哈我出来拉</h2>}
      {!isToggleOn ? <h2>我起来拉</h2> : <h2>我进去拉</h2>}
      <App show={isToggleOn} />
    </div>
  )
}

// 列表渲染
function ListItem(props) {
  return <li>{props.value}</li>
}
function NumberList(props) {
  const numbers = props.numbers
  const lists = numbers.map(number => 
    <ListItem key={number.toString()} value={number} />
  )
  return (
    <ul>
      {lists}
    </ul>
  )
}

// 温度转换
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
// 练习demo组件
function Demo() {
  const listItems = [1, 2, 3, 4, 5]
  return (
    <div>
      <App />
      <Comment 
        date={commentInfo.date}
        text={commentInfo.text}
        author={commentInfo.author}
      />
      {/* <Clock /> */}
      <DemoForm />
      <NumberList numbers={listItems} />
      <Calculator />
      
    </div>
  )
}
ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);