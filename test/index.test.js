var utils = require('../index');
var expect = require('chai').expect;
var fs = require("fs");

describe('utils: 工具方法convertImgToDataURLviaCanvas测试', function () {
    // mkdirSync方法测试
    it('mkdir ../test/foo', function () {
        utils.mkdirSync('../test/foo', '0755', function () {
            expect(fs.existsSync('../test/foo')).to.be.ok;
        })
    });
    // rmdirSync方法测试
    it('rm -r ../test/foo', function () {
        utils.rmdirSync('../test/foo', function () {
            expect(fs.existsSync('../test/foo')).to.not.be.ok;
        });
    });
    // convertImgToDataURLviaCanvas方法测试
    it('backward.png', function () {
        utils.convertImgToDataURLviaCanvas('./images/backward.png', function (dataURL) {
            expect(dataURL).to.be.equal('data:image/png;base64,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');
        });
    });
    // convertFileToDataURLviaFileReader方法测试
    it('backward2.png', function () {
        utils.convertFileToDataURLviaFileReader('./images/backward2.png', function (dataURL) {
            expect(dataURL).to.be.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAB7klEQVR4Xu2aWW4DIRBE8U2dkyVHtbBCRMYsvRR0j+h8J8XjUU1mLD/S4T+Pw/efQkA04HADMQKHFyAuwRiBGAFfBp4ppR8g0jTP0whk2O+UYPcSKc+LgAKbDx/BRM5DLKZtbA2LEMDKsxZwhdUKYOdZCmjBagSI8qwE9GClAsR5FgJGsBIBqrzdAmawXAHqvJ0CKLAcAZC8XQKosFQBsLwdAjiwFAHQvNUCuLAzAeg8yGNn70lQAjsSgM57c69qgBS2x4TO+zu0FQI0sC0B6Lx/jUUL0MJeBaDzPsYVKQABWwtA5zXvKpQAFGwRgM7rvrIjBCBhM+jX7ydD2s8Zyt8P96gVgN48atN1zjIBd9j89F+9pgHHC8h27yBh2QiUOUNLuNUluEJCPjGk1OUNQEsowCgJ2wSg7oQaGCFhqwCEhCuwVsJ2AVoJLWCNBBMBGgk9YKkEMwFSCSNgiQRTARIJs6dTrgRzAVwJMwHQPMpiqDc06slRmSB51MV2SuAwUSS4GIFa4AyaI4AyDu4EzKC5AlR5ksVWj4OUqdcslw0YvUBJBfSa4FpAC1ojgJ2nXWzFOCCY6nFw34DrOCAE1E24jYACfexXZVHjxMpB1Y21qKdfDgGeTsOCJRpgYd3TmtEAT6dhwRINsLDuac0XOEpUQXjJrvQAAAAASUVORK5CYII=');
        });
    });
});