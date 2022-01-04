import chalk from 'chalk'
import dedent from 'dedent-js'

export const printError = error => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}

export const printSuccess = message => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

export const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')} 
		Без параметра - вывод погоды 
		-s [SITY] - для установки города
		-h - для вывода помощи 
		-t [API_KEY] - для сохранения токена
		`
  )
}

export const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`
  )
}
