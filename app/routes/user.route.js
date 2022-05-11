const UserController = require('../controllers/user.controller');
const userRoute = require('express').Router();
const verifyToken = require('../middlewares/authen.middleware');
const { checkResourceOwner, checkPermission } = require('../middlewares/author.middleware');

const router = require('./base.route')(userRoute, UserController, {
	detail: {
		isHide: true,
		permission: 'DETAIL_USER',
	},
	search: {
		isHide: false,
		permission: 'SEARCH_USER',
	},
	insert: {
		isHide: true,
		permission: 'CREATE_USER',
	},
	batchInsert: {
		isHide: true,
		permission: 'BULKCREATE_USER',
	},
	update: {
		isHide: false,
		permission: 'UPDATE_USER',
	},
	delete: {
		isHide: false,
		permission: 'DELETE_USER',
	},
});
userRoute.post('/login', (req, res, next) => UserController.login(req, res, next));
userRoute.post('/register', (req, res, next) => UserController.insert(req, res, next));
userRoute.get('/getManifestAndPermission', (req, res, next) => UserController.getManifestAndPermission(req, res, next));
userRoute.post('/addManifest', (req, res, next) => UserController.addManifest(req, res, next));
userRoute.get(
	'/detail/:id',
	(req, res, next) => verifyToken(req, res, next),
	(req, res, next) => checkResourceOwner(req, res, next),
	(req, res, next) => checkPermission('DETAIL_USER', req, res, next),
	(req, res, next) => UserController.detail(req, res, next),
);
userRoute.put(
	'/self-update/:id',
	(req, res, next) => verifyToken(req, res, next),
	(req, res, next) => checkResourceOwner(req, res, next),
	(req, res, next) => UserController.updateSelf(req, res, next),
);
userRoute.post(
	'/change-password',
	(req, res, next) => verifyToken(req, res, next),
	(req, res, next) => UserController.changePassword(req, res, next),
);
userRoute.post('/forgot-password', (req, res, next) => UserController.forgotPassword(req, res, next));
userRoute.get('/reset-password/:tokenReset', (req, res, next) => UserController.confirmResetPw(req, res, next));
module.exports = router;
