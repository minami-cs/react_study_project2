import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello World!</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}
var funcStyle = 'color:blue';
var funcId = 0;
function FuncComp(props) {
  // React의 useState에서 state의 초기값(props.initNumber)을 인자로 넣어주면
  var numberState = useState(props.initNumber);
  // useState() 배열의 0번째 값에 현재의 state(initNumber)값이 들어간다.
  var number = numberState[0];
  // class component의 setState처럼 상태를 바꾸려면 배열의 1번째 데이터를 바꾼다.
  var setNumber = numberState[1];

  // var dateState = useState((new Date()).toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];
  // 바로 위 3줄로 나눠서 쓴 것과 똑같이 동작하는 축약형 코드
  var [_date, setDate] = useState((new Date()).toString());

  // 함수형 컴포넌트에서 useEffect는 클래스형 컴포넌트의 componentDidMount, componentDidUpdate와 같은 역할
  // useEffect의 effect는 side effect
  // Main effect는 return() 안에 작성한 화면 렌더링
  // side effect(useEffect)는 이미 렌더링된 후에 값을 변경하는 것
  // useEffect는 여러 개 설치 가능
  useEffect(function() {
    console.log('%cfunc => useEffect (componentDidMount & componentDidUpdate) A' + (++funcId), funcStyle);
    document.title = number + ' : ' + _date;
  });
  useEffect(function() {
    console.log('%cfunc => useEffect (componentDidMount & componentDidUpdate) B' + (++funcId), funcStyle);
    document.title = number + ' : ' + _date;
  });

  // useState()를 쓰면 무조건 2개의 값으로 이루어진 배열이 리턴됨
  // console.log('numberState', numberState);
  console.log('%cfunc => render' + (++funcId), funcStyle);
  return (
    <div className="container">
      <h2>Function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input type="button" value="random" onClick={
        function() {
          setNumber(Math.random());
        }
      }></input>
      <input type="button" value="date" onClick={
        function() {
          setDate((new Date()).toString());
        }
      }></input>
    </div>
  );
}
var classStyle = 'color:red';
class ClassComp extends React.Component {
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }
  componentWillMount() {
    console.log('%cclass => componentWillMount',classStyle);
  }
  componentDidMount() {
    console.log('%cclass => componentDidMount',classStyle);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cclass => shouldComponentUpdate',classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('%cclass => componentWillUpdate',classStyle);
  }
  componentDidUpdate(nextProps, nextState) {
    console.log('%cclass => componentDidUpdate',classStyle);
  }
  render() {
    console.log('%cclass => render',classStyle);
    return (
      <div className="container">
        <h2>Class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick= {
          function() {
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>
        <input type="button" value="date" onClick= {
          function() {
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }></input>
      </div>
    )
  }
}

export default App;
