const query = (books, h) => {
	
	const response = h.response({
		status: 'success',
		data: {
			books
		}
	});
	response.code(200);
	return response;
}

module.exports = query;