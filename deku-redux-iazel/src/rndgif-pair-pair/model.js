import { init as pair } from '../pair/model'
import { init as rgp } from '../rndgif-pair/model'

export const init = (p1, p2, q1, q2) => pair( rgp(p1, p2), rgp(q1, q2) )
