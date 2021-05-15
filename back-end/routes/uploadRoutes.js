import express from 'express'
import multer from 'multer'
import path from 'path'
import 'colors'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'

dotenv.config()

const uploadRouter = express.Router()

// const storage = multer.diskStorage({
// 	destination(req, file, cb) {
// 		cb(null, 'uploads/')
// 	},
// 	filename(req, file, cb) {
// 		cb(
// 			null,
// 			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
// 		)
// 	},
// })

const checkFileType = (file, cb) => {
	console.log('CHECK')
	const fileType = /jpg|jpeg|png/
	const extname = fileType.test(path.extname(file.originalname).toLowerCase())
	const mimetype = fileType.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb('Images only!!')
	}
}

// const upload = multer({
// 	storage,
// 	fileFilter: (req, file, cb) => {
// 		checkFileType(file, cb)
// 	},
// })

// uploadRouter.post('/', upload.single('image'), (req, res) => {
// 	res.send(`/${req.file.path.replace(/\\/g, '/')}`)
// })

// uploadRouter.post('/', (req, res) => {
//
// 	aws.config.region = 'eu-west-1'
// 	const S3_BUCKET = 'my-shop27'

// 	const S3params = {
// 		Bucket: 'my-shop27',
// 		Key: req.fileName,
// 		Expires: 60,
// 		ContentType: 'jpeg',
// 		ACL: 'public-read',
// 	}

// 	s3.getSignedUrl('putObject', S3params, (err, data) => {
// 		if (err) {
// 			console.log(err)
// 			return res.end()
// 		}

// 		res.send(`https://my-shop27.s3.amazonaws.com/${req.fileName}`)
// 	})

// 	// res.send(`/${req.file.path.replace(/\\/g, '/')}`)
// })

const s3 = new aws.S3({
	accessKeyId: process.env.accessKeyId,
	secretAccessKey: process.env.secretAccessKey,
})

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.awsBucketName,
		acl: 'public-read',
		metadata: function (req, file, cb) {
			console.log('CHECK 2')
			cb(null, { fieldName: file.fieldname })
		},
		key: function (req, file, cb) {
			console.log('CHECK')
			cb(null, Date.now().toString())
		},
	}),
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb)
	},
})

uploadRouter.post('/', upload.single('image'), (req, res) => {
	// res.send(`/${req.file.path.replace(/\\/g, '/')}`)
	res.send(req.file.location)
})

export default uploadRouter
