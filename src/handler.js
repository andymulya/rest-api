const books = require('./books');
const shortId = require('shortid');


//Untuk menyimpan buku
const addBooksHandler = (request, h) => {
	const { 
		name,
		year, 
		author, 
		summary, 
		publisher, 
		pageCount, 
		readPage, 
		reading 
	} = request.payload;
	const id = shortId();
	const finished = readPage === pageCount;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const book = {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
		id,
		finished,
		insertedAt,
		updatedAt
	}

	if(name === undefined){
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku'
		});
		response.code(400);
		return response;
	}

	if(readPage > pageCount){
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
		});
		response.code(500);
		return response;
	}

	const response = h.response({
		status: 'succes',
		message: 'Buku berhasil ditambahkan',
		data: {
			bookId: id
		}
	});
	books.push(book);

	response.code(201);
	return response;


};

module.exports = { addBooksHandler };