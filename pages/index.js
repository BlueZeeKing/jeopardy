import Head from 'next/head'
import Image from 'next/image'

import React, { useRef, useState } from 'react'

import styled from 'styled-components';
import { motion } from "framer-motion"

import questions from '../questions';

const SquareStyle = styled.div`
  color: #FBBF24;
  width: 100%;
  height: 100%;
  font-weight: bold;
  background-color: blue;
  border: 3px solid black;
  font-size: 1.5rem;
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

const categories = Object.keys(questions)

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
    category: '',
    score: 0,
  })

  function clickHandler(category, value, coords) {
    setState({
      reveal: true,
      width: coords.width,
      height: coords.height,
      left: coords.x,
      top: coords.y,
      category: category,
      score: value,
    })
  }

  function disappear() {
    setState({
      reveal: false,
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      category: '',
      score: 0,
    })
  }

  console.log(state, questions)

  return (
    <>
      <div className="flex flex-row w-full h-full border-[3px] border-black">
        {categories.map((item) => <Category onClick={clickHandler} key={item} value={item} />)}
      </div>
      <AnimateSquare disappear={disappear} width={state.width} height={state.height} left={state.left} top={state.top} reveal={state.reveal} question={state.reveal ? questions[state.category][state.score]['question'] : ''} answer={state.reveal ? questions[state.category][state.score]['answer'] : ''} />
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
        {[200,400,600,800,1000].map((item) => <Square key={item} value={item} onClick={handleClick}/>)}
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

  function increment() {
    if (side) {
      props.disappear()
      setSide(false)
    } else {
      setSide(true)
    }
  }

  if (props.reveal) {
    return (
      <SquareStyleBig onClick={increment} animate={{ x: [props.left, 10], y: [props.top, 10], width: [props.width, window.innerWidth - 20], height: [props.height, window.innerHeight - 2], opacity: [1, 1] }} transition={{ duration: 1 }}>
        <motion.div className="whitespace-nowrap w-full relative h-full" animate={{ scale: [0.5, 1], opacity: [0, 1] }} transition={{ duration: 0.5, delay: 0.5 }}><div className="w-full absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] whitespace-normal p-5">{side ? props.answer : props.question}</div></motion.div>
      </SquareStyleBig>
    )
  } else {
    try {
      return (
        <SquareStyleBig onClick={increment} animate={{ x: window.innerWidth / 2, y: window.innerHeight / 2, width: 0, height: 0, opacity: [1, 0] }} transition={{ duration: 1 }}>
          <motion.div className="whitespace-nowrap w-full relative h-full" animate={{ scale: [1, 0.5], opacity: [1, 0] }} transition={{ duration: 0.5 }}><div className="w-full absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] whitespace-normal p-5">{side ? props.answer : props.question}</div></motion.div>
        </SquareStyleBig>
      )
    } catch {
      return null
    }
  }
}