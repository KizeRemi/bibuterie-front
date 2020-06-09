export default {
    region: 'eu-west-1',
    identityPoolId: 'eu-west-1:f44e1031-2b65-4e74-8d76-be405dfb38e8',
    identityPoolRegion: 'eu-west-1',
    userPoolId: 'eu-west-1_K2m1icWIj',
    userPoolWebClientId: process.env.NODE_ENV === 'production' ? '7db59u7houaifcfgq2gi19s656' : '3pr6fdi8g3domth9huceohra3q',
    oauth: {
        domain: 'bibuterie.auth.eu-west-1.amazoncognito.com',
        scope: ['email', 'profile', 'openid'],
        redirectSignIn: process.env.NODE_ENV === 'production' ? 'https://bibuterie-front.herokuapp.com/' : 'http://localhost:3000/',
        redirectSignOut:  process.env.NODE_ENV === 'production' ? 'https://bibuterie-front.herokuapp.com/' : 'http://localhost:3000/',
        responseType: 'code'
    }
}
