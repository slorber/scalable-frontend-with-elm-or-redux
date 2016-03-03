module Main (..) where

import Html exposing (..)
import StartApp
import Task exposing (Task)
import Effects exposing (Effects, Never)
import RandomGif
import RandomGifPair
import RandomPairOfPair
import Button
import Counter


type Action
  = Top RandomGif.Action
  | Pair RandomGifPair.Action
  | PairOfPair RandomPairOfPair.Action
  | Button Button.Action
  | Counter Counter.Action
  | SomeGifUpdated


type alias Model =
  { topGif : RandomGif.Model
  , gifPair : RandomGifPair.Model
  , gifPairOfPair : RandomPairOfPair.Model
  , button : Button.Model
  , counter : Counter.Model
  }


init : ( Model, Effects Action )
init =
  let
    ( topGif, topFx ) =
      RandomGif.init "dogs"

    ( gifPair, pairFx ) =
      RandomGifPair.init "cats" "lemurs"

    ( gifPairOfPair', pairOfPaiFx ) =
      RandomPairOfPair.init "unicorns" "minions" "pokemon" "lizards"

    model =
      { topGif = topGif
      , gifPair = gifPair
      , gifPairOfPair = gifPairOfPair'
      , button = Button.init
      , counter = Counter.init
      }
  in
    ( model, Effects.batch [ Effects.map Top topFx, Effects.map Pair pairFx, Effects.map PairOfPair pairOfPaiFx ] )


{-| This address will be passed to each sub-component's `update` function. They
are expected to send to it whenever a GIF is updated. We don't care what they
send (hence the `always`) since the message itself suffices to represent the
gif-updated event. If we did care about, say, which GIF component was updated we
could use different tags than just `SomeGifUpdated` or could add parameters to
the tag. There would be no necessary change to the components. -}
context : Signal.Address a
context =
  Signal.forwardTo actionsMailbox.address (always SomeGifUpdated)


update : Action -> Model -> ( Model, Effects Action )
update action model =
  case action of
    Top act ->
      let
        ( topGif', fx ) =
          RandomGif.update context act model.topGif
      in
        ( { model | topGif = topGif' }, Effects.map Top fx )

    Pair act ->
      let
        ( gifPair', fx ) =
          RandomGifPair.update context act model.gifPair
      in
        ( { model | gifPair = gifPair' }, Effects.map Pair fx )

    PairOfPair act ->
      let
        ( gifPairOfPair', fx ) =
          RandomPairOfPair.update context act model.gifPairOfPair
      in
        ( { model | gifPairOfPair = gifPairOfPair' }, Effects.map PairOfPair fx )

    Button act ->
      let
        button' =
          Button.update act model.button
      in
        ( { model | button = button' }, Effects.none )

    SomeGifUpdated ->
      let
        counter' =
          Counter.increment (Button.isActive model.button) model.counter
      in
        ( { model | counter = counter' }, Effects.none )

    _ ->
      ( model, Effects.none )


view : Signal.Address Action -> Model -> Html
view address model =
  let
    fwd =
      Signal.forwardTo address

    sep =
      br [] []
  in
    div
      []
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
app =
  StartApp.start
    { init = init
    , update = update
    , view = view
    , inputs = [ actionsMailbox.signal ]
    }


main : Signal Html
main =
  app.html


port tasks : Signal (Task Never ())
port tasks =
  app.tasks


{-| This is where we receive messages from the components, wrapped as Actions
that we feed back into the app via `app.inputs`. -}
actionsMailbox : Signal.Mailbox Action
actionsMailbox =
  Signal.mailbox SomeGifUpdated
