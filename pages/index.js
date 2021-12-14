import Head from 'next/head'
import Image from 'next/image'

import React, { useRef, useState } from 'react'
import { nanoid } from 'nanoid'

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
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="icon" type="image/png" href="favicon.png" />
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
      score: state.score,
    })
  }

  return (
    <>
      <div className="flex-col flex h-full">
        <div className="flex flex-row w-full flex-grow border-[3px] border-black">
            {categories.map((item) => <Category onClick={clickHandler} key={item} value={item} />)}
        </div>
        <Scorer value={state.score} />
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
        <Square value={props.value} onClick={(item, item2) => { console.log(item, item2) }} text={true} />
        {[200,400,600,800,1000].map((item) => <Square active key={item} value={item} onClick={handleClick}/>)}
      </div>
    </div>
  )
}

function Square(props) {
  const square = useRef(null);
  const [show, setShow] = useState(true)

  function clickHandler() {
    if (props.active) {
      if (show) {
        let coords = square.current.getBoundingClientRect()

        props.onClick(props.value, coords)
        setShow(false)
      } else {
        setShow(true)
      }
    }
  }

  return (
    <SquareStyle text={false} ref={square} onClick={clickHandler} >
      <div className="flex-grow"></div>
      <p>{show ? props.value : ''}</p>
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
      <SquareStyleBig key="animate" onClick={increment} animate={{ x: [props.left, 10], y: [props.top, 10], width: [props.width, window.innerWidth - 20], height: [props.height, window.innerHeight - 20], opacity: [1, 1] }} transition={{ duration: 0.7 }}>
        <motion.div className="whitespace-nowrap w-full relative h-full" animate={{ scale: [0.5, 1], opacity: [0, 1] }} transition={{ duration: 0.3, delay: 0.7 }}><div className="w-full absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] whitespace-normal p-5">{side ? props.answer : props.question}</div></motion.div>
      </SquareStyleBig>
    )
  } else {
    try {
      return (
        <SquareStyleBig key="animate" onClick={increment} animate={{ x: window.innerWidth / 2, y: window.innerHeight / 2, width: 0, height: 0, opacity: [1, 0] }} transition={{ duration: 1 }}>
          <motion.div className="whitespace-nowrap w-full relative h-full" animate={{ scale: [1, 0.5], opacity: [1, 0] }} transition={{ duration: 0.5 }}><div className="w-full absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] whitespace-normal p-5">{side ? props.answer : props.question}</div></motion.div>
        </SquareStyleBig>
      )
    } catch {
      return (
        <SquareStyleBig key="animate" onClick={increment} animate={{ x: 500, y: 500, width: 0, height: 0, opacity: [1, 0] }} transition={{ duration: 1 }}>
          <motion.div className="whitespace-nowrap w-full relative h-full" animate={{ scale: [1, 0.5], opacity: [1, 0] }} transition={{ duration: 0.5 }}><div className="w-full absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] whitespace-normal p-5">{side ? props.answer : props.question}</div></motion.div>
        </SquareStyleBig>
      )
    }
  }
}

function ScoreSquare(props) {
  const [state, setState] = useState(`Team ${props.name}`)

  function handleChange(e) {
    setState(e.target.value)
  }

  return (
    <SquareStyle>
      <div className="flex-grow"></div>
      <input value={state} onChange={handleChange} type="text" className="w-full m-2 outline-none focus:outline-none bg-blue bg-opacity-0 text-center underline focus:text-yellow-200 hover:text-yellow-300" />
      <div className="flex flex-row mx-2">
        <div className="flex flex-col h-full flex-grow" onClick={() => { props.subtract(props.index) }}>
          <div className="flex-grow"></div>
          <span className="material-icons text-yellow-300 cursor-default">remove</span>
          <div className="flex-grow"></div>
        </div>
        <p className="text-yellow-300">{props.score}</p>
        <div className="flex flex-col h-full flex-grow" onClick={() => {props.add(props.index)}}>
          <div className="flex-grow"></div>
          <span className="material-icons text-yellow-300 cursor-default">add</span>
          <div className="flex-grow"></div>
        </div>
      </div>
      <p className="text-yellow-300 text-base underline font-normal cursor-pointer m-2 mt-0" onClick={() => {props.remove(props.index)}}>Remove</p>
      <div className="flex-grow"></div>
    </SquareStyle>
  )
}

function Scorer(props) {
  const [state, addScore, subtractScore, newTeam, removeTeam] = useScore(3)

  function add(index) {
    addScore(index, props.value)
  }

  function subtract(index) {
    subtractScore(index, props.value)
  }


  return (
    <div className="flex flex-row border-[3px] border-black mt-4">
      {state.map((item, index) => <ScoreSquare key={item['id']} index={index} add={add} subtract={subtract} name={index + 1} score={item['score']} onClick={console.log} remove={removeTeam} />)}
      <Square key="add" value={<span className="material-icons text-yellow-300 cursor-default">add</span>} onClick={newTeam} />
    </div>
  )
}

function useScore(numTeams) {
  let teams = []
  for (let i = 0; i < numTeams; i++) {
    teams[i] = { score: 0, id: nanoid() }
  }

  const [state, setState] = useState(teams)

  function addTeam(index, amount) {
    let stateCopy = JSON.parse(JSON.stringify(state))
    stateCopy[index]['score'] = stateCopy[index]['score'] + amount
    setState(stateCopy)
  }

  function subtractTeam(index, amount) {
    let stateCopy = JSON.parse(JSON.stringify(state))
    stateCopy[index]['score'] = stateCopy[index]['score'] - amount
    setState(stateCopy)
  }

  function newTeam() {
    let stateCopy = JSON.parse(JSON.stringify(state))
    stateCopy.push({score: 0, id: nanoid()})
    setState(stateCopy)
  }

  function removeTeam(index) {
    let stateCopy = JSON.parse(JSON.stringify(state))
    stateCopy.splice(index, 1)
    setState(stateCopy)
  }

  return [state, addTeam, subtractTeam, newTeam, removeTeam]
}