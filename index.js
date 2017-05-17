/**
 * Created by liu on 17-5-17.
 */
const oauth = require('./libs/oauth');
const config = require('config');
const download = require('download');
const fs = require('fs');
const path = require('path');
const access_token = config.get('access_token');

async function getCourses() {
    try {
        let result = [];
        let data = await oauth.get(['api', 'v1', 'courses?per_page=100&page=1'], access_token);
        result = result.concat(data);
        data = await oauth.get(['api', 'v1', 'courses?per_page=100&page=2'], access_token);
        result = result.concat(data);
        for (let i = 0; i < result.length; i++) {
            result[i] = {
                id: result[i].id,
                name: result[i].name,
                course_code: result[i].course_code,
                enrollment_term_id: result[i].enrollment_term_id,
                sis_course_id: result[i].sis_course_id
            }
        }
        fs.writeFileSync(path.resolve('.', 'course.json'), JSON.stringify(result, null, '    '));
    } catch (e) {
        console.log(e);
    }
}


setTimeout(async function () {

    await getCourses();

    const str = 'export_type=common_cartridge';
    try {
        //let data = await oauth.post(['api', 'v1', 'courses', 195, 'content_exports'], str, access_token);
        //let data = await oauth.get(['api', 'v1', 'courses', 195, 'content_exports'], access_token);
        //let data = await oauth.get(['api', 'v1', 'progress', '7213'], access_token);
        //console.log(data);
        //console.log(data.length);
    } catch (e) {
        console.log(e);
    }
    /*    const url = 'https://sjtu-umich.instructure.com/files/46365/download?download_frd=1&verifier=WhgOZcRDvjFAHNNUuKfqhiklTOYps75zQNcTv6b9';
     await download(url).then((data) => {
     const buffer = data;
     console.log(buffer);
     let err = fs.writeFileSync(path.resolve('./', '1.zip'), buffer);
     console.log(err);
     });*/
}, 0);
