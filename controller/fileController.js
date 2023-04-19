import path from 'path';
import fs from 'fs';

// Find a single product with an id
export const get = (req, res) => {
    const filePath = path.join('./'+req.params.filename);
	console.log(filePath);
	const imgPath = filePath.replaceAll('|', '/')
	
	// Check if the file exists
	if (fs.existsSync(imgPath)) {
	  // Set the content type header
	  res.setHeader('Content-Type', 'image/jpeg');
  
	  // Read the file and stream it to the response
	  const fileStream = fs.createReadStream(imgPath);
	  fileStream.pipe(res);
	} else {
	  // Return a 404 error if the file doesn't exist
	  res.status(404).send('File not found');
	}
  };;
  
