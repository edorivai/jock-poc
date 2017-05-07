import test from 'ava';
import request from 'supertest';
import nock from 'nock';

test('should nock', t => {
	nock('https://jest-playback-server.glitch.me')
		.post('/', { jest: 'isCool' })
		.reply(200, { jest: 'isCool' });

	return request
		.post('https://jest-playback-server.glitch.me')
		.send({
			jest: 'isCool'
		})
		.then(response => { t.is(response.body.jest, 'isCool'); });
});
