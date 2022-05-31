#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
/**
 *   Wechaty Chatbot SDK - https://github.com/wechaty/wechaty
 *
 *   @copyright 2016 Huan LI (李卓桓) <https://github.com/huan>, and
 *                   Wechaty Contributors <https://github.com/wechaty>.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

import {
  log,
}             from 'wechaty-puppet'
import { IoClient, IoClientOptions, WechatyBuilder } from 'wechaty'
import PuppetWalnut from '../src/puppet-walnut.js'

const welcome = `
| __        __        _           _
| \\ \\      / /__  ___| |__   __ _| |_ _   _
|  \\ \\ /\\ / / _ \\/ __| '_ \\ / _\` | __| | | |
|   \\ V  V /  __/ (__| | | | (_| | |_| |_| |
|    \\_/\\_/ \\___|\\___|_| |_|\\__,_|\\__|\\__, |
|                                     |___/

=============== Powered by Wechaty ===============
       -------- https://www.chatie.io --------

My super power: download cloud bot from www.chatie.io

__________________________________________________

`

log.level('silly')
// process.env['WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_SERVER'] = 'true'

async function main () {
  const token = 'puppet_wxwork_b88f78f33d042661'

  console.info(welcome)
  log.info('Client', 'Starting for WECHATY_TOKEN: %s', token)

  const puppet = new PuppetWalnut({
    // port: 30001,
  })

  const wechaty = WechatyBuilder.build({
    name: token,
    puppet,
  })

  let port
  if (process.env['WECHATY_PUPPET_SERVER_PORT']) {
    port = parseInt(process.env['WECHATY_PUPPET_SERVER_PORT'])
  }

  const options: IoClientOptions = {
    token,
    wechaty,
  }
  if (port) {
    options.port = port
  }

  const client = new IoClient(options)

  client.start()
    .catch(onError.bind(client))
}

async function onError (
  this : IoClient,
  e    : Error,
) {
  log.error('Client', 'start() fail: %s', e)
  await this.quit()
  process.exit(-1)
}

main()
  .catch(console.error)
