import express from 'express';
import multer from 'multer'
import bodyParser from 'body-parser';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';

const bucketName = 'noah-education-videos';
 

const serviceKey = path.join(__dirname, '..', 'key.json')


const googelStorage = new Storage({
    keyFilename: serviceKey,
});

const app = express()
const upload = multer({ dest: 'uploads/' })



app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/uploads/:type/:lesson/:image_name', upload.array('images', 30), async (req, res, next) => {
    const type = req.params['type'];
    const lesson = req.params['lesson'];
    const imageName = req.params['image_name'];
    const filePath = req.files['0'].path;
    const response = await googelStorage.bucket(bucketName).upload(filePath, {
        destination: 'testimage/image.png'
    });
    fs.unlinkSync(filePath);
    console.log(filePath);
    res.send('ok');
})

app.listen(9001, () => {
  console.log('app now listening for requests!!!')
})
// AIzaSyBlGCJaCVMX9LAYQKWU89Sm8gAk7Di8aj0