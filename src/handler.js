const { detailBooks, books } = require('./books');
const shortId = require('shortid');


//Untuk menyimpan buku
const addBooksHandler = (request, h) => {
	const 
	{ 
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

	const detailBook = 
	{
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
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
		response.code(400);
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
	const book = detailBooks.filter((detailBook) => detailBook.id === bookId)[0];

	if(book === undefined){
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
			book
		}
	});

	response.code(200);
	return response;


};

//Untuk edit data buku
const editDetailBookHandler = (request, h) => {
	const { bookId } = request.params;

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
	const updatedAt = new Date().toISOString();

	const index = detailBooks.findIndex((detailBook) => detailBook.id === bookId);
	const checkId = detailBooks.filter((detailBook) => detailBook.id === bookId)[0];

	if(name === undefined){
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku'
		});

		response.code(400);
		return response;
	}

	if(readPage > pageCount){
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
		});

		response.code(400);
		return response;
	}

	if(checkId === undefined){
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Id tidak ditemukan'
		});
		response.code(404);
		return response;
	}

	detailBooks[index] = {
		...detailBooks[index],
		name, 
		year, 
		author, 
		summary, 
		publisher, 
		pageCount, 
		readPage, 
		reading,
		updatedAt
	}

	books[index] = {
		...books[index],
		name,
		publisher
	};

	const response = h.response({
		status: 'success',
		message: 'Buku berhasil diperbarui'
	});

	response.code(200);
	return response;
}

//Untuk Menghapus Buku
const deleteBookHandler = (request, h) => {
	const { bookId } = request.params;
	const index = detailBooks.findIndex((detailBook) => detailBook.id === bookId);
	const checkId = detailBooks.filter((detailBook) => detailBook.id === bookId)[0];

	if(checkId === undefined){
		const response = h.response({
			status: 'fail',
			message: 'Buku gagal dihapus. Id tidak ditemukan'
		});

		response.code(404);
		return response;
	}

	detailBooks.splice(index, 1);
	books.splice(index, 1);

	const response = h.response({
		status: 'success',
		message: 'Buku berhasil dihapus'
	});

	response.code(200);
	return response;
}


module.exports = 
{ 
	addBooksHandler, 
	getAllBooksHandler, 
	getDetailBookHandler, 
	editDetailBookHandler,
	deleteBookHandler
};