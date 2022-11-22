const { detailBooks, books } = require('./books');
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

	const detailBook = {
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

	const book = {
		id,
		name,
		publisher
	};

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
		status: 'success',
		message: 'Buku berhasil ditambahkan',
		data: {
			bookId: id
		}
	});
	detailBooks.push(detailBook);
	books.push(book);

	response.code(201);
	return response;


};

//Untuk mengambil semua data buku
const getAllBooksHandler = (request, h) => {

	const response = h.response({
		status : 'success',
		data: {
			books
		}
	});

	response.code(200);
	return response;
}

//Untuk mengambil detail buku
const getDetailBookHandler = (request, h) => {
	const { bookId } = request.params;
	const detailBookId = detailBooks.filter((detailBook) => detailBook.id === bookId)[0];

	if(detailBookId === undefined){
		const response = h.response({
			status: 'fail',
			message: 'Buku tidak ditemukan'
		});

		response.code(404);
		return response;
	}

	const response = h.response({
		status: 'success',
		data: {
			detailBookId
		}
	});

	response.code(200);
	return response;


};

module.exports = { addBooksHandler, getAllBooksHandler, getDetailBookHandler };