let gulp = require('gulp'),
    watch = require('gulp-watch'),
    include = require('gulp-include');


gulp.task("watch", function () {
    watch('./test.js', function () {
        gulp.start('buildREADME');
    });
    watch('./src/README.md', function () {
        gulp.start("buildREADME");
    });
    console.log("Watch started!");
});

gulp.task("buildREADME", function () {
    console.log("===> building README.md");
    let ih = setInterval(function () {
        process.stdout.write('.');
    }, 500);
    gulp.src("./src/README.md")
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest("./"))
    .on("end", function () {
        clearInterval(ih);
        console.log("===> build finished!");
    });
});