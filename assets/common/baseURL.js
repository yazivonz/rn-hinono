import { Platform } from 'react-native'

let baseURL = '';

{
    Platform.OS == 'android'

    ? baseURL = 'http://192.168.100.108:8080/api/v1'
    : baseURL = 'http://192.168.137.187:8080/api/v1'
}
export default baseURL;