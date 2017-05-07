# Features

## Capturing
Checks if we have a recorded req plus res. If not, makes a req. Asks if the req looks okay. If yes, stores the req plus its res, if no, stores nothing, fails your test.

## Playback
If we have a req plus res already, checks if your current req is equal to the stored one. If yes, replies with the stored res. If no, fails your test, diffing the changed req.

## Update snapshot
Asking Jock to update its snapshot makes Jock diff the recorded req against the actual req, and asks if the changes are okay. If yes, throw away req plus res and execute capturing. If no, fail test.

## Complications

### Overlapping interceptors
Jock can record in what order tests registered their interceptors, but has no way of knowing if the first test also starts its request first, and likewise if it is captured by Nock first. In the case of overlapping interceptors this causes a complication. It's possible that the second test to call Jock still completes its request first. However, the first test to call Jock completes its test first. After a test has run, Jock is called to store the request, response pair we wanted to snapshot, unfortunately there are two recorded responses for our interceptor. At this point Jock can't know which response corresponds to test one. Therefore, on seeing the same interceptor being registered, Jock returns a promise, indicating if a test can start its request. If a previously registered interceptor has not started recording a request, Jock will tell the test trying to register to wait. At the same time, Jock will wait 100ms for the test with the current lock to make its request. If it doesn't Jock will fail the corresponding test upon being asked for a req. After(!) an interceptor becomes active Jock records the name of the calling test, how many times it has seen the given interceptor, and releases the interceptor lock. Once a test completes, Jock can look up how many requests got recorded before its and pick out the corresponding recorded response.

### Alternatives
`ava-playback` - makes a smart trade-off and assumes a unique request always has an identical repsonse. This means ava-playback does not have to make any distinction between different requests using the same interceptor.
