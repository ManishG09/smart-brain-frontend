import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import "./App.css";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import React from "react";
import { useState } from "react";
import FaceRecognistion from "./components/FaceRecognistion/FaceRecognistion";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";


function App() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("register");
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user,setUser] = useState({
            id : '',
            name: '',
            email: '',
            entries: 0,
            joined:'',
  })


  const loadUser = (data) => {
    setUser({
        ...user, 
        id: data._id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    });
    console.log(loadUser.name)
};
 
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onHandleClick = () => {
    setImage(input);

    const PAT = "91459dca5a884d3ebd253c83f2fcc9b5";
    const USER_ID = "manish";
    const APP_ID = "First-App";
    const MODEL_ID = "face-detection";
    const IMAGE_URL = input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((res) => res.json())
  //     .then(response => {
  //       if(response){
  //         fetch('http://localhost:3000/image, {
  //           method: 'put',
  //           headers: {'Content-Type': 'application/json'},
  //           body: JSON.stringify({
  //           id:user.id
  //           })
  //         })
  //         .then(response => response.json())
  //         .then(count => {
  //           setUser({
  //             ...state,
  //             entries:count,
  //         }})
  //         })
  //      displayFaceBox(calculateFaceLocation(response))
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
 
.then(response => {
    if (response) {
        fetch('http://localhost:3100/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: user.id
            })
        })
        .then(response => response.json())
        .then(count => {
            setUser({
                ...user,
                entries: count
            });
        })
        .then(() => {
            displayFaceBox(calculateFaceLocation(response));
            console.log("Successfully processed response and updated user entries.");
        })
        .catch((error) => console.log("Error updating user entries:", error));
    } else {
        console.log("Response is empty.");
    }
})
.catch((error) => console.log("Error fetching Clarifai data:", error));

   };


  const calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onRouteChange = (route) => {
    if (route === 'signout'){
      setIsSignedIn(false)
    }else if (route === 'home'){
      setIsSignedIn(true)
    }
    setRoute(route);
  };
  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries}/>
          <ImageLinkForm
            onInputChange={onInputChange}
            onHandleClick={onHandleClick}
          />
          <FaceRecognistion box={box} image={image} />
        </>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser}/>
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
