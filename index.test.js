// import * as _ from 'lodash';
import nock from 'nock';

import isJestCool from './';

describe('#isJestCool', () => {
	test('should return true', async () => {
		nock('https://jest-playback-server.glitch.me')
			.post('/', { jest: 'isCool' })
			.reply(200, { jest: 'isCool' });
		
		console.log(expect);
		
		const result = await isJestCool();
		
		expect(result).toBeTruthy();
	});
});
