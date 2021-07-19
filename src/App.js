import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello world</h1>
      <input type="button" value="remove func" onClick={function(){
        setFuncShow(false);
      }}></input>
      <input type="button" value="remove class" onClick={function(){
        setClassShow(false);
      }}></input>
      {funcShow? <FuncComp initNumber={2}></FuncComp>:null}
      {classShow? <ClassComp initNumber={2}></ClassComp>:null}
    </div>
  );
}
var funcStyle = 'color:blue';
var funcId=0;
function FuncComp(props){
  var numberState = useState(props.initNumber); //2개 값으로 이뤄진 배열 리턴
  var number = numberState[0]; //상태값
  var setNumber = numberState[1]; //상태 바꾸는 함수

  // var dateState = useState(new Date().toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];

  var [_date,setDate]=useState((new Date()).toString());

  useEffect(function(){ 
    console.log('%cfunc => useEffect (componentDidMount)' + (++funcId), funcStyle);
    document.title = number;
    return function(){
      console.log('%cfunc => useEffect return (componentWillUnMount)' + (++funcId), funcStyle);
    }
  }, []); //대괄호 안 비우면 1회만 실행

  //side effect , ex)구독 시스템 생활코딩 4.2.3
  useEffect(function(){ 
    console.log('%cfunc => useEffect number (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    document.title = number;
    return function(){ //clean up, useEffect(이전 실행 정리)
      console.log('%cfunc => useEffect number return (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    }
  }, [number]); //대괄호 안의 원소가 바뀌었을때만 콜백함수 호출

  useEffect(function(){ 
    console.log('%cfunc => useEffect _date (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    document.title = _date;
    return function(){
      console.log('%cfunc => useEffect _date return (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    }
  }, [_date]); 

  console.log('%cfunc => render' + (++funcId), funcStyle);
  return (
    <div className='container'>
      <h2>function atyle component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>

      <input type="button" value="random" onClick={
          function(){
            setNumber(Math.random());
          }}></input>
      <input type="button" value="date" onClick={
          function(){
            setDate((new Date()).toString());
          }}></input>
    </div>
  );
}

var classStyle = 'color:red';
//componentWillMount => render => compnentDidMount
//shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate
class ClassComp extends React.Component{
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }
  componentWillMount(){
    console.log('%cclass => componentWillMount', classStyle);
  }
  componentDidMount(){
    console.log('%cclass => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState){
    console.log('%cclass => componentWillUpdate', classStyle);
  }
  componentDidUpdate(nextProps, nextState){
    console.log('%cclass => componentlDidUpdate', classStyle);
  }
  componentWillUnmount(){
    console.log('%cclass => componentWillUnmount', classStyle);
  }
  
  render(){
    console.log('%cclass => render', classStyle);

    return ( 
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)}></input>
        <input type="button" value="date" onClick={
        function(){
          this.setState({date:(new Date()).toString()})
          }.bind(this)}></input>
      </div>
    )
  }
}
export default App;
