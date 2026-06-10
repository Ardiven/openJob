import ClientError from '../../../exceptions/client-error.js';
import response from '../../../utils/response.js';
import process from 'process';
import path from 'path';
import { UPLOAD_FOLDER } from '../storage/storage-config.js';
import DocumentRepositories  from '../repositories/document-repositories.js';
import { deleteFile } from '../storage/storage-config.js';
 
export const uploadDocument = async (req, res, next) => {
 if (!req.file) {
   return next(new ClientError('File is required'));
 }
 
 const host = process.env.HOST;
 const port = process.env.PORT;
 const owner = req.user.id;
 const encodedFilename = encodeURIComponent(req.file.filename);
 const size = req.file.size;
 const originalName = req.file.originalname;
 const filename = req.file.filename;
 const fileLocation = `http://${host}:${port}/uploads/${encodedFilename}`;

 const document = await DocumentRepositories.createDocument({ originalName, filename, fileLocation, owner });
 const id = document.id; 
 
 return response(res, 201, 'success', { documentId: id, filename, originalName, size });
};

export const deleteDocument = async (req, res, next) => {

    try {
        const { id } = req.params;
        const documentName = await DocumentRepositories.getDocumentById(id);
        await deleteFile(documentName.filename, next);
        const owner = req.user.id;
        const document = await DocumentRepositories.deleteDocumentById(id, owner);
        if (!document) return response(res, 404, "Document tidak ditemukan", null);
        return response(res, 200, "Document berhasil dihapus", document);
    } catch (error) {
        next(error);
    }

};

export const getAllDocument = async (req, res, next) => {
    try {
        const document = await DocumentRepositories.getDocuments();
        if (!document) return response(res, 404, "Document tidak ditemukan", null);
        return response(res, 200, "Berhasil mendapatkan data", document);
    } catch (error) {
        next(error);
    }
};

export const getDocumentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const document = await DocumentRepositories.getDocumentById(id);
        if (!document) return response(res, 404, "Document tidak ditemukan", null);
        const filePath = path.join(UPLOAD_FOLDER, document.filename);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          `inline; filename="${document.filename}"`
        );
        return res.sendFile(filePath);
    } catch (error) {
        next(error);
    }
}
