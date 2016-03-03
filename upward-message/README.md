# Approach

This version blatantly copies Peter's as a basis.

Instead of intercepting subcomponent events at the top, this approach passes an address down to the components for them to send a message when a new GIF is obtained. The main watches this signal and increments the counter each time it gets a message.
