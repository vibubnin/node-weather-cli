#!/usr/bin/env node
import { getAgs } from './helpers/args.js'
import { getIcon, getWeather } from './services/api.service.js'
import {
  printHelp,
  printSuccess,
  printError,
  printWeather
} from './services/log.service.js'
import {
  API_DICTIONARY,
  getKeyValue,
  saveKeyValue
} from './services/storage.service.js'

const saveToken = async token => {
  if (!token.length) {
    printError('Не передан токен')
    return
  }

  try {
    await saveKeyValue(API_DICTIONARY.token, token)
    printSuccess('Токен сохранен')
  } catch (error) {
    printError(error.message)
  }
}

const saveCity = async city => {
  if (!city.length) {
    printError('Не передан город')
    return
  }

  try {
    await saveKeyValue(API_DICTIONARY.city, city)
    printSuccess('Город сохранен')
  } catch (error) {
    printError(error.message)
  }
}

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(API_DICTIONARY.city))
    const weather = await getWeather(city)
    printWeather(weather, getIcon(weather.weather[0].icon))
  } catch (error) {
    console.log(error.message)
    if (error?.response?.status === 404) {
      printError('Неверно указан город')
    } else if (error?.response?.status === 401) {
      printError('Неверно указан токен')
    } else {
      printError(error.message)
    }
  }
}

const initCLI = () => {
  const args = getAgs(process.argv)

  if (args.h) {
    return printHelp()
  }
  if (args.s) {
    return saveCity(args.s)
  }

  if (args.t) {
    return saveToken(args.t)
  }

  return getForcast()
}

initCLI()
