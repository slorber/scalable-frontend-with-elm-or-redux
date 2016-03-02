module RandomPairOfPair where

import Effects exposing (Effects)
import Html exposing (..)
import Html.Attributes exposing (..)

import RandomGifPair


-- MODEL

type alias Model =
    { left : RandomGifPair.Model
    , right : RandomGifPair.Model
    }


init : String -> String -> String -> String -> (Model, Effects Action)
init leftTopic1 leftTopic2 rightTopic1 rightTopic2 =
  let
    (left, leftFx) = RandomGifPair.init leftTopic1 leftTopic2
    (right, rightFx) = RandomGifPair.init rightTopic1 rightTopic2
  in
    ( Model left right
    , Effects.batch
        [ Effects.map Left leftFx
        , Effects.map Right rightFx
        ]
    )


-- UPDATE

type Action
    = Left RandomGifPair.Action
    | Right RandomGifPair.Action

isNewGif : Action -> Bool
isNewGif action = 
  case action of 
    Left act -> RandomGifPair.isNewGif act 
    Right act -> RandomGifPair.isNewGif act

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    Left act ->
      let
        (left, fx) = RandomGifPair.update act model.left
      in
        ( Model left model.right
        , Effects.map Left fx
        )

    Right act ->
      let
        (right, fx) = RandomGifPair.update act model.right
      in
        ( Model model.left right
        , Effects.map Right fx
        )


-- VIEW

view : Signal.Address Action -> Model -> Html
view address model =
  div [ style [ ("display", "flex") ] ]
    [ RandomGifPair.view (Signal.forwardTo address Left) model.left
    , RandomGifPair.view (Signal.forwardTo address Right) model.right
    ]
