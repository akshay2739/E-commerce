import express from 'express'
import multer from 'multer'
import path from 'path'
const uploadRouter = express.Router()

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	},
})

const checkFileType = (file, cb) => {
	const fileType = /jpg|jpeg|png/
	const extname = fileType.test(path.extname(file.originalname).toLowerCase())
	const mimetype = fileType.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb('Images only!!')
	}
}

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb)
	},
})

uploadRouter.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path.replace(/\\/g, '/')}`)
})

export default uploadRouter