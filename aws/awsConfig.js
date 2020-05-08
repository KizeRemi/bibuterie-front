export default {
    region: 'eu-west-1',
    identityPoolId: 'eu-west-1:f44e1031-2b65-4e74-8d76-be405dfb38e8',
    identityPoolRegion: 'eu-west-1',
    userPoolId: 'eu-west-1_K2m1icWIj',
    userPoolWebClientId: '3pr6fdi8g3domth9huceohra3q',
    oauth: {
        domain: 'bibuterie.auth.eu-west-1.amazoncognito.com',
        scope: ['email', 'profile', 'openid'],
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/',
        responseType: 'code'
    }
}
