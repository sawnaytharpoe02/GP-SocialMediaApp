import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer, { StorageEngine } from 'multer';
import path from 'path';

import User from './models/User';
import Post from './models/Post';

// CONFIGURATION
const _filename = path.resolve(
	path.dirname(require.resolve(process.argv[1])),
	process.argv[1]
);
const _dirname = path.dirname(_filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', inflate: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(_dirname, 'public/assets')));

// FILE STORAGE
const storage: StorageEngine = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void
	): void => {
		cb(null, 'public/assets');
	},
	filename: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, filename: string) => void
	): void => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;

if (!process.env.MONGO_URL) {
	throw new Error('MONGO_URL is not defined in the environment variables');
}

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as any;

mongoose
	.connect(process.env.MONGO_URL, options)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error: any) => console.log(`${error}: did not connect`));