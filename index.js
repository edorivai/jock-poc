import request from 'superagent';

export default function isJestCool() {
	return request
		.post('https://jest-playback-server.glitch.me')
		.send({
			jest: 'isCool'
		})
		.then(response => response.body.jest === 'isCool');
}

isJestCool().then(answer => {
	if (answer) {
		console.log('Jest is cool');
	} else {
		console.log('Jest is not cool');
	}
});
