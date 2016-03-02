module Counter where 

import Html exposing (..)

type Action = Increment Bool 

type alias Model = Int

init : Model 
init = 0

update : Action -> Model -> Model
update action model = 
  case action of 
    Increment True -> 
      if model >= 10 then model + 2 else model + 1
    Increment False -> 
      model + 1

increment : Bool -> Model -> Model
increment button model = 
  update (Increment button) model


view : Signal.Address Action -> Model -> Html
view address model =
  div []
  [ text <| toString model] 
