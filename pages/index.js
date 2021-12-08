import Head from 'next/head'
import Image from 'next/image'

import React, { useRef, useState } from 'react'

import styled from 'styled-components';
import { motion } from "framer-motion"

const SquareStyle = styled.div`
  color: #FBBF24;
  width: 100%;
  height: 100%;
  font-weight: bold;
  background-color: blue;
  border: 3px solid black;
  font-size: 1.875rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const SquareStyleBig = styled(motion.div)`
  color: #FBBF24;
  width: 100%;
  height: 100%;
  font-weight: bold;
  background-color: blue;
  border: 3px solid black;
  font-size: 3rem;
  text-align: center;
  flex-grow: 1;
  position: absolute;
  top: 0;
  left: 0;
`

const categories = ['Math', 'Science', 'Engineering', 'English', 'History']

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jeopardy</title>
        <meta name="description" content="Jeopardy website for engineering club" />
      </Head>

      <main className="p-6 w-full h-screen bg-blue-light">
        <Jeopardy />
      </main>
    </div>
  )
}

function Jeopardy(props) {
  const [state, setState] = useState({
    reveal: false,
    width: 0,
    height: 0,
    marginLeft: 0,
    marginTop: 0,
  })

  function clickHandler(category, value, coords) {
    setState({
      reveal: true,
      width: coords.width,
      height: coords.height,
      left: coords.x,
      top: coords.y,
    })
  }

  return (
    <>
      <AnimateSquare width={state.width} height={state.height} left={state.left} top={state.top} reveal={state.reveal} question="The third planet to orbit the sun" answer="What is the Earth?" />
      <div className="flex flex-row w-full h-full border-[3px] border-black">
        {categories.map((item) => <Category onClick={clickHandler} key={item} value={item} />)}
      </div>
    </>
  )
}

function Category(props) {
  function handleClick(value, coords) {
    props.onClick(props.value, value, coords)
  }

  return (
    <div className="w-full">
      <div className="flex flex-col h-full">
        <Square value={props.value} onClick={(item, item2) => { console.log(item, item2) }} />
        {[100,200,300,400,500].map((item) => <Square key={item} value={item} onClick={handleClick}/>)}
      </div>
    </div>
  )
}

function Square(props) {
  const square = useRef(null);

  function clickHandler() {
    let coords = square.current.getBoundingClientRect()

    props.onClick(props.value, coords)
  }

  return (
    <SquareStyle ref={square} onClick={clickHandler} >
      <div className="flex-grow"></div>
      <p>{props.value}</p>
      <div className="flex-grow"></div>
    </SquareStyle>
  )
}

function AnimateSquare(props) {
  const [side, setSide] = useState(false) // question = false

  if (props.reveal) {
    return (
      <SquareStyleBig onClick={() => setSide(!side)} animate={{ x: [props.left, 10], y: [props.top, 10], width: [props.width, window.innerWidth - 20], height: [props.height, window.innerHeight - 20] }} transition={{ duration: 2 }}>
        <motion.p className="whitespace-nowrap w-full relative h-full" animate={{ scale: [0.17, 1] }} transition={{ duration: 2 }}><span className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">{side ? props.answer : props.question}</span></motion.p>
      </SquareStyleBig>
    )
  } else {
    return null
  }
}