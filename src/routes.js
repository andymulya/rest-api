const 
{ 
	addBooksHandler, 
	getAllBooksHandler, 
	getDetailBookHandler, 
	editDetailBookHandler 
} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBooksHandler
	},
	{
		method: 'GET',
		path: '/books',
		handler: getAllBooksHandler
	},
	{
		method: 'GET',
		path: '/books/{bookId}',
		handler: getDetailBookHandler
	},
	{
		method: 'PUT',
		path: '/books/{bookId}',
		handler: editDetailBookHandler
	}
];

module.exports = routes;