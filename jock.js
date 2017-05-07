import nock from 'nock';
import path from 'path';
import fs from 'fs';

function jockExpect(val) {
	return expect(val);
}

const titles = {};

let recording = false;

const scopes = {};
const inFlight = {};

export const jock = (host, pathname) => {
	const tn = expect.getState().currentTestName;
	const scope = `${host}${pathname}`;
	scopes[tn] = scope;
	if (inFlight[scope]) {
		console.log('IN FLIGHT!', tn, scope);
	}
	nock(host).post(pathname);
	
	console.log(tn, 'active?', scope);

	titles[host + pathname] = titles[host + pathname] || [];
	titles[host + pathname].push(expect.getState().currentTestName);
	

	if (!recording && !fs.existsSync(file)) {
		recording = true;
		console.log('recording');
		nock.recorder.rec({
			output_objects: true,
			dont_print    : true,
		});
	}

	return writeJock;
};


export const writeJock = () => {
	const testName = expect.getState().currentTestName;
	const scope = scopes[testName];
	delete inFlight[scope];
	const responses = nock.recorder.play();
	console.log('Write jock', testName);
	console.log(responses.map(r => r.response));
	// console.log(titles);
	// console.log(responses);
	// fs.writeFileSync(
	// 	file,
	// 	JSON.stringify(responses, null, '  ')
	// );
};

const file = path.dirname(expect.getState().testPath) + '/__cheerleaders__/jock.json';

export function loadNock() {
	if (fs.existsSync(file)) {
		nock.define(require(file));
	}
}