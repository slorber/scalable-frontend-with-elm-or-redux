# Approach

The main strategy for this approach is to extend the API of each component to include helpers. 

I have put the business logic into `Counter.elm` and exposed an `increment` function that increments the model based on the button state that it receives. 

The RandomGif family of components API is augmented with a function that answeres the question "is this action a NewGif?" 

RandomGif implements the direct `NewGif` detection, each subsequent enclosure implements its own version using it's child API. 
