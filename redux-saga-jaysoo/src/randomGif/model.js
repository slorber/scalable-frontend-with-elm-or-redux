import daggy from 'daggy'

export default daggy.taggedSum({
  Empty: ['topic'],
  Pending: ['topic'],
  Loaded: ['topic', 'url']
})
