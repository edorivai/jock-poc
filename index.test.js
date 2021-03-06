// import * as _ from 'lodash';
import { jock, writeJock, loadNock } from './jock';

import isCool from './';

describe('#isJestCool', () => {
	beforeAll(loadNock);

	afterAll(writeJock);
	test('for jest', async () => {
		console.log('STARTING JEST');
		// console.log(expect.getState());

		// Timeout: 100ms
		const { intercepted, getInterceptedRequest } = await jock('https://jest-playback-server.glitch.me', '/');
		const result = await isCool('jest');
		expect(getInterceptedRequest()).toMatchSnapshot();
	test('should return true', async () => {
		nock('https://jest-playback-server.glitch.me')
			.post('/', { jest: 'isCool' })
			.reply(200, { jest: 'isCool' });
		
		console.log(expect);
		
		const result = await isJestCool();
		
		expect(result).toBe(true);
	});
});

describe('#isAlexCool', () => {
	beforeEach(loadNock);

	afterEach(writeJock);

	test('for alex', async () => {
		// console.log(expect.getState());
		console.log('STARTING ALEX');

		jock('https://jest-playback-server.glitch.me', '/');
		const result = await isCool('alex');
		expect(result).toBe(true);
	});
});
