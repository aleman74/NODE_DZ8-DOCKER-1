const express = require('express');
const router = express.Router();
module.exports = router;

const path = require('path');
const fs = require('fs');


router.get('/:bookId', (req, res) => {

    const {bookId} = req.params;

    const file_name = 'f' + bookId;
    const file_path = path.join('..', 'data', file_name);

    console.log('get file_path = ', file_path);

    const result = GetValue(file_path);

    res.status(200);
    res.json({result: result});
});

router.post('/:bookId/incr', (req, res) => {
    const {bookId} = req.params;

    const file_name = 'f' + bookId;
    const file_path = path.join('..', 'data', file_name); 

    console.log('post file_path = ', file_path);

    let result = GetValue(file_path);
    result += 1;

    const res2 = SetValue(file_path, result);
    
    res.status(200);
    res.json({result: res2});
});

function GetValue(file_path)
{
    // Проверяем наличие файла
    let result = 0;

    try {
        if (fs.existsSync(file_path)) {
            // Считываем данные из файла
            const str = fs.readFileSync(file_path, 'utf8'); 
            result = parseInt(str); 

            console.log('result = ' + result);
        }
    } catch(ex) {
        console.error(ex);
    }    

    return result;
}

function SetValue(file_path, value)
{
    let result = true;

    // Сохраняем новое значение в файл
    try{
        fs.writeFileSync(file_path, value.toString());
    } catch(ex) {
        console.error(ex);
        result = false;
    }

    return result;
}