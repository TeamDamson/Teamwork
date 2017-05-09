import { Validator } from 'validators';
import { requester } from 'requester';
import { galleryModel } from 'view';
// import toastr from 'toastr';
mocha.setup('bdd');

const { expect, assert } = chai;

const AUTH_KEY = "SOME_AUTH_KEY";
const user = {
	username: 'SOME_USERNAME',
	passHash: 'SOME_PASSHASH',
	"grant_type": "password"
};


describe('Validator Tests', () => {

	it('It works', () => {
		expect(() => { Validator.validateUserName("$$$") }).to.throw();
	})
});

describe('View-requests tests', function () {
	beforeEach(function () {
		sinon.stub(requester, 'post')
			.returns(new Promise((resolve, reject) => {
				resolve({
					result: true
				});
			}));
		localStorage.clear();
	});
	afterEach(function () {
		requester.post.restore();
		localStorage.clear();
	});

	it('expect to add new Comment true', function (done) {
		// dataService.login(user)
		let content = {
			date: "25 Jan 2017",
			text: "I dont know",
			user: "mitkop",
			paintingId: "22"
		};
		galleryModel.addNewComment(content)
			.then(data => {
				console.log(data);
				expect(data.result).to.be.true;
			})
			.then(done, done);
	});
});

mocha.run();
