import { init as pair } from '../pair/model'
import { init as rndgif } from '../rndgif/model'

export const init = (topic1, topic2) => pair(rndgif(topic1), rndgif(topic2))
