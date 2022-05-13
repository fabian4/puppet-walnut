#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test } from 'tstest'
import axios from 'axios'
import { closeServer, initServer } from './server.js'

test('server authorization test', async t => {
  await initServer(3000, '')
  await axios.request({
    data: {},
    headers: {
      echoStr: 'sadfgaegraeqgeafveagfeafrgag',
    },
    method: 'GET',
    url: 'http://localhost:3000/notifyPath',
  }).then(res => {
    const echoStr = res.headers['echostr']
    t.equal(echoStr, 'sadfgaegraeqgeafveagfeafrgag')
    return null
  })
  await closeServer()
})
