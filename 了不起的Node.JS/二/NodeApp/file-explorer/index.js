/**
 * module dependencies
 */
var fs = require('fs');

/**
 * example 1
 * fs 模块的同步和异步使用
 */
// 同步方法：
// console.log(fs.readdirSync(__dirname));
// [ 'index.js', 'package.json' ]

// 异步方法
// function async (err, files) { console.log(files); }
// console.log(fs.readdirSync('.', async));
// [ 'index.js', 'package.json' ]

/**
 * example 2
 * 初始 stream
 */

//  console.log('Hello World');
//  process.stdout.write('Hello World');

// Hello World
// Hello World***********

/**
 * example 3
 * 输出当前目录下面的文件
 */

 fs.readdir(process.cwd(), function (err, files) {
     console.log('');

     if (!files.length) {
         return console.log('no files to show');
     }
    console.log('select which file ir directory you want to see \n');
    file(0);
    function file (i){
        var fileName = files[i];
        console.log(fileName);
        fs.stat(__dirname + '/' + fileName, function (err, stat){
            if (stat.isDirectory()) {

                console.log(' '+ i +' \033[36m' + fileName + '/\033[39m');
            } else {

                console.log(' '+ i +' \033[90m' + fileName + '/\033[39m');
            }
        });

        i++;
        if (i == files.length) {
            console.log(' ');
            process.stdout.write('enter your choice');
            process.stdin.resume();
            process.stdin.setEncoding('utf8')
        } else {
            file(i);
        }
    };
 });
