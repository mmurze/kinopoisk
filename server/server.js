import axios from 'axios';

let config = {
	baseURL: 'http://localhost:3000/'
};

const httpClient = axios.create(config);

const loggerInterceptor = config => {
	/** как-то обрабатываем логи */
	return config;
}