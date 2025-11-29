import React from 'react'

import {useState} from "react";

const Bulb = ({light}) =>{

}

export default function UseState() {

    
  //const arrayState = useState(0); 
  //여기에는 실제 상태값, 상태를 변경할 수 있는 함수 이렇게 2개를 배열로 저장함.
  const [count, setCount] = useState(0); //(0) 이거는 초기값!
  const [light, setLight] = useState("OFF");

  console.log(count);

        return (
        <>
            <div>count : {count}</div>
            <button onClick={()=>{
                setCount(count + 1);
            }}>+1</button>
            <div>light : {light}</div>
            <button onClick={()=>{
                setLight(light === "ON" ? "OFF" : "ON");
            }}>{light === "ON" ? "끄기" : "커기"}</button>
        </>
    )
}