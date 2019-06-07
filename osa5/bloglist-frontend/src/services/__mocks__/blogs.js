const blogs = [
  {
    id: '5cf2378da2bc5d3394537824',
    title: 'eka',
    author: 'Pekka',
    url: 'www.pekanblogi.fi',
    likes: 1,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'tjuslin',
      name: 'Tommi Juslin'
    }
  },
  {
    id: '5cf4ed7d65f6c81940a7a36d',
    title: 'toka',
    author: 'Jorma',
    url: 'www.jormanblogi.fi',
    likes: 2,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'tjuslin',
      name: 'Tommi Juslin'
    }
  },
  {
    id: '5cf4ee3a65f6c81940a7a36e',
    title: 'kolmas',
    author: 'Milton',
    url: 'www.miltoninblogi.fi',
    likes: 3,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'tjuslin',
      name: 'Tommi Juslin'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }