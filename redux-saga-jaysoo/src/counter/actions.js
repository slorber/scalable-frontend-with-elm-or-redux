import { kAction } from '../utils'
import { name } from './__init__'

export const INC = `${name}/INC`
export const DEC = `${name}/DEC`

export const inc = kAction(INC)

export const dec = kAction(DEC)
