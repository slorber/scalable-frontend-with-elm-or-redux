import Html exposing (..)

import StartApp 
import Task exposing (Task)
import Effects exposing (Effects, Never)

import RandomGif
import RandomGifPair
import RandomPairOfPair
import Button
import Counter


type Action = 
  Top RandomGif.Action | Pair RandomGifPair.Action 
  | PairOfPair RandomPairOfPair.Action
  | Button Button.Action | Counter Counter.Action 

type alias Model = 
  { topGif : RandomGif.Model
  , gifPair : RandomGifPair.Model
  , gifPairOfPair : RandomPairOfPair.Model
  , button: Button.Model
  , counter : Counter.Model
  }

init : (Model, Effects Action)
init = 
  let 
    (topGif, topFx) = RandomGif.init "dogs" 
    (gifPair, pairFx) = RandomGifPair.init "cats" "lemurs" 
    (gifPairOfPair', pairOfPaiFx) = RandomPairOfPair.init "unicorns" "minions" "pokemon" "lizards"
    model = 
      { topGif = topGif, gifPair = gifPair
      , gifPairOfPair = gifPairOfPair'
      , button=Button.init, counter = Counter.init }

  in 
    (model, Effects.batch [Effects.map Top topFx, Effects.map Pair pairFx, Effects.map PairOfPair pairOfPaiFx])


update : Action -> Model -> (Model, Effects Action)
update action model = 
  case action of 
    Top act -> 
      let 
        (topGif', fx) = RandomGif.update act model.topGif
        counter' = 
          if RandomGif.isNewGif act 
          then Counter.increment (Button.isActive model.button) model.counter
          else model.counter 
      in 
        ({ model | topGif = topGif', counter=counter'}, Effects.map Top fx)

    Pair act -> 
      let 
        (gifPair', fx) = RandomGifPair.update act model.gifPair
        counter' = 
          if RandomGifPair.isNewGif act 
          then Counter.increment (Button.isActive model.button) model.counter
          else model.counter 
      in 
        ({ model | gifPair = gifPair', counter=counter'}, Effects.map Pair fx)

    PairOfPair act -> 
      let 
        (gifPairOfPair', fx) = RandomPairOfPair.update act model.gifPairOfPair
        counter' = 
          if RandomPairOfPair.isNewGif act 
          then Counter.increment (Button.isActive model.button) model.counter
          else model.counter 
      in 
        ({ model | gifPairOfPair = gifPairOfPair', counter=counter'}, Effects.map PairOfPair fx)

    Button act -> 
      let 
        button' = Button.update act model.button
      in 
        ({ model | button = button'}, Effects.none)

    _ -> 
      (model, Effects.none)


view : Signal.Address Action -> Model -> Html
view address model = 
  let 
    fwd = Signal.forwardTo address 
    sep = br [] [] 
  in 
    div []
    [ RandomGif.view (fwd Top) model.topGif
    , sep
    , RandomGifPair.view (fwd Pair) model.gifPair
    , sep
    , RandomPairOfPair.view (fwd PairOfPair) model.gifPairOfPair
    , sep
    , Button.view (fwd Button) model.button
    , sep
    , Counter.view (fwd Counter) model.counter
    ]

app : StartApp.App Model
app = StartApp.start 
  { init = init 
  , update = update 
  , view = view 
  , inputs = []}

main : Signal Html
main = app.html


port tasks : Signal (Task Never ())
port tasks = app.tasks