/**
 * /*
 *   complete the middleware code to check if the user is logged in
 *   before granting access to the next middleware/route handler
 *
 * @format
 */

module.exports = (req, res, next) => {
	if (req.sessiono && req.session.loggedIn) {
		next();
	} else {
		res.status(401).json({ you: 'shall not pass!' });
	}
};

function authenticateInTheMiddle(role) {
	return function (req, res, next) {
		if (req.decodedJwt.role && req.decodedJwt.role === role) {
			next();
		} else {
			res.status(401).json({ you: 'shall not pass!' });
		}
	};
}

module.exports = authenticateInTheMiddle;
