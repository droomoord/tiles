import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Images from "./comps/Images/Images";
import randomWords from "random-words";
import Message from "./comps/Message";

function App() {
  console.log("APP RENDER");
  const random = (max) => {
    return Math.floor(Math.random() * max);
  };
  const [words, setWords] = useState(randomWords(3));
  const [image, setImage] = useState(null);
  const [chosenWord, setChosenWord] = useState("");
  const [message, setMessage] = useState(null);
  const [streak, setStreak] = useState(1);

  const clicked = (e) => {
    if (e.target.innerText === chosenWord) {
      setStreak(streak + 1);
      setMessage(
        <Message text="Correct!" color="green" streak={streak}></Message>
      );
      setWords(randomWords(3));
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    } else {
      setStreak(1);
      setMessage(<Message text="Wrong!" color="red" streak={streak}></Message>);
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setChosenWord("");
        const query = words[random(3)];
        console.log("query = " + query);
        const { data } = await axios({
          method: "get",
          url: `https://api.unsplash.com/search/photos`,
          params: {
            query,
          },
          headers: {
            "Accept-Version": "v1",
            Authorization: "Client-ID " + process.env.REACT_APP_API_KEY,
          },
        });

        if (data.results && data.total > 200) {
          setChosenWord(query);
          console.log("chosen word = " + query);
          setImage(data.results[random(10)]);
        } else {
          console.log("creating new words!");
          setWords(randomWords(3));
        }
        console.log(data);
      } catch (error) {
        document.write(error);
      }
    };
    init();
  }, [words]);
  return (
    <div className="App">
      {message}
      <div className="word-options">
        {words.map((word, index) => {
          return (
            <h1 onClick={(e) => clicked(e)} key={index} value={word}>
              {word}
            </h1>
          );
        })}
      </div>
      {chosenWord ? <Images image={image} /> : null}
    </div>
  );
}

export default App;
