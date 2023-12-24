import {Component} from 'react'
import './App.css'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {
  Bgcontainer,
  Scorediv,
  Heading,
  Div,
  Scorborard,
  Button,
  Gameiconcontainer,
  Image,
  Rulesbutton,
  Imgrules,
  Resultcontainer,
  Resutantimgcont,
  Resulticoncont,
  Resultimage,
  Tryagainbutton,
  Para,
} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    randomid: '',
    randomurl: '',
    istrue: false,
    mainid: '',
    mainimage: '',
    resultmsg: '',
  }

  tryagain = () => {
    this.setState({istrue: false})
  }

  getRandom = (id, imageurl) => {
    const {score} = this.state
    const randomnumber = Math.floor(Math.random() * 3)
    const randomimg = choicesList[randomnumber]
    this.setState({
      randomid: randomimg.id,
      randomurl: randomimg.imageUrl,
      mainid: id,
      mainimage: imageurl,
      istrue: true,
    })

    if (id === randomimg.id) {
      this.setState({resultmsg: 'IT IS DRAW'})
    } else if (id === 'ROCK' && randomimg.id === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        resultmsg: 'You Won',
      }))
    } else if (id === 'SCISSORS' && randomimg.id === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        resultmsg: 'You Won',
      }))
    } else if (id === 'PAPER' && randomimg.id === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        resultmsg: 'You Won',
      }))
    } else if (id === 'SCISSORS' && randomimg.id === 'ROCK') {
      if (score <= 0) {
        this.setState({score: 0, resultmsg: 'YOU LOSE'})
      } else {
        this.setState(prevState => ({
          resultmsg: 'YOU LOSE',
          score: prevState.score - 1,
        }))
      }
    } else if (id === 'PAPER' && randomimg.id === 'SCISSORS') {
      if (score <= 0) {
        this.setState({score: 0, resultmsg: 'YOU LOSE'})
      } else {
        this.setState(prevState => ({
          resultmsg: 'YOU LOSE',
          score: prevState.score - 1,
        }))
      }
    } else if (id === 'ROCK' && randomimg.id === 'PAPER') {
      if (score <= 0) {
        this.setState({score: 0, resultmsg: 'YOU LOSE'})
      } else {
        this.setState(prevState => ({
          resultmsg: 'YOU LOSE',
          score: prevState.score - 1,
        }))
      }
    }
  }

  render() {
    const {
      score,
      istrue,
      randomid,
      randomurl,
      mainid,
      mainimage,
      resultmsg,
    } = this.state
    return (
      <Bgcontainer>
        <Scorborard>
          <Div>
            <Heading>
              Rock
              <br /> Paper <br />
              Scissors
            </Heading>
          </Div>
          <Scorediv>
            <Para>Score</Para>
            <Para>{score}</Para>
          </Scorediv>
        </Scorborard>
        {istrue ? (
          <Div>
            <Resultcontainer>
              <Resutantimgcont>
                <Resulticoncont>
                  <h1>you</h1>
                  <Resultimage src={mainimage} alt="your choice" />
                </Resulticoncont>
                <Resulticoncont>
                  <h1>Opponent</h1>
                  <Resultimage src={randomurl} alt="opponent choice" />
                </Resulticoncont>
              </Resutantimgcont>
              <Para>{resultmsg}</Para>
              <Tryagainbutton type="button" onClick={this.tryagain}>
                PLAY AGAIN
              </Tryagainbutton>
            </Resultcontainer>
          </Div>
        ) : (
          <Div>
            <Gameiconcontainer>
              {choicesList.map(eachchoice => {
                const {id, imageUrl} = eachchoice
                console.log()
                const mychoice = () => {
                  this.getRandom(id, imageUrl)
                }
                return (
                  <Button
                    type="button"
                    onClick={mychoice}
                    data-testid={id.toLowerCase().concat('Button')}
                  >
                    <Image src={eachchoice.imageUrl} alt={eachchoice.id} />
                  </Button>
                )
              })}
            </Gameiconcontainer>
          </Div>
        )}
        <Popup trigger={<Rulesbutton> Rules</Rulesbutton>} position="top" modal>
          {close => (
            <Div>
              <Rulesbutton
                onClick={() => {
                  console.log('modal closed ')
                  close()
                }}
              >
                <RiCloseLine />
              </Rulesbutton>
              <Imgrules
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png "
                alt="rules"
              />
            </Div>
          )}
        </Popup>
      </Bgcontainer>
    )
  }
}
export default App
