import React, { useState, useEffect } from 'react'
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
// const element = <Welcome name="Sara" />
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
  )
}

function formatDate(date) {
  return date.toLocaleDateString()
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
  )
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
  // Hook 
  useEffect(() => {
    document.title = `${isToggleOn}-状态`
  })
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
      {props.first}
      {lists}
      {props.secend}
      {/* {props.children} */}
    </ul>
  )
}

// 温度转换
function tryConvert(type, temperature) {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) { return '' }
  const output = type === 'Fahrenheit' ? (input - 32) * 5 / 9 : (input * 9 / 5) + 32
  return (Math.round(output * 1000) / 1000).toString()
}

const BoilingVerdict = (props) => props.value >= 100 ? <p>这水TMD开了.</p> : <p>水还没有沸腾.</p>

function TemperatureInput (props) {
  const temperature = props.value
  const type = props.type
  function handleChange (e) {
    props.onChange(type, e.target.value)
  }
  return (
    <fieldset>
      <legend>输入温度，单位： {type}:</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  )
}

function Calculator (props) {
  const inputList = ['Celsius', 'Fahrenheit']
  const [type, setType] = useState('Celsius')
  const [temperature, setTemperature] = useState('')
  function handleValueChange (valueType, value) {
    setType(valueType)
    setTemperature(value)
  }
  const showTemperature = (valueType) => valueType === 'Fahrenheit' ? tryConvert(type, temperature) : temperature

  return (
    <div>
      {inputList.map(item => (
        <TemperatureInput key={item}
          value={showTemperature(item)}
          type={item}
          onChange={handleValueChange} />
      ))}
      <BoilingVerdict value={parseFloat(temperature)} />
    </div>
  )
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
      <NumberList numbers={listItems} first={
        <h1>数字列表的第1个插槽组件</h1>
      } secend={
        <h1>数字列表的第2个插槽组件</h1>
      }/>
      <Calculator />
      
    </div>
  )
}
ReactDOM.render(
  <Demo />,
  document.getElementById('root')
)