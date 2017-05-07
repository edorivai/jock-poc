import request from 'superagent';

export default async function isCool(name) {
	return request
		.post('https://jest-playback-server.glitch.me')
		.send({
			[name]: 'isCool'
		})
		.then(response => response.body[name] === 'isCool');
}
