module Button where 

import Html exposing (..)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)

type Action = Click 

type alias Model = Bool

init : Model 
init = True

update : Action -> Model -> Model
update action model = not model 

view : Signal.Address Action -> Model -> Html
view address model =
  button 
  [ style [("backgroundColor", if model then "green" else "red")]
  , onClick address Click
  ] 
  [ text "Click"] 



isActive : Model -> Bool
isActive model = model 