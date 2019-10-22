
import Constants from 'expo-constants'

const ENV = {
    dev: {
        apiUrl: 'https://ammakadai.in/testuser/'
    },
    prod: {
        apiUrl: ''
    }
}

function getEnvVars(env = '') {
    if (env === null || env === undefined || env === '') return ENV.dev
    if (env.indexOf('dev') !== -1) return ENV.dev
    if (env.indexOf('prod') !== -1) return ENV.prod
}


export default getEnvVars(Constants.manifest.releaseChannel)