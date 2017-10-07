var gulp = require('gulp'),
	pug = require('gulp-pug'),
	rename = require('gulp-rename'),
	watch = require('gulp-watch'),
	del = require('del'),
	envConfig = require('./gulp-env-config'),
	versioner = require('./gulp-version');

gulp.task('clean', function () {
	return del('./src/**/*.html');
});

gulp.task('pug', ['clean'], function (done) {
	gulp.src('./src/**/*.pug')
		.pipe(pug({ pretty: false, doctype: 'html' }))
		.pipe(gulp.dest('./src/'))
		.on('end', done);
});

gulp.task('watch', function () {
	gulp.watch(["src/**/*.pug"], ['pugwatch']).on('change', function (e) {
		console.log('Resource file ' + e.path + ' has been changed. Updating.');
	});
})
gulp.task('pugwatch', function (done) {
	gulp.src('./src/**/*.pug')
		.pipe(pug({
			pretty: false,
			doctype: 'html'
		}))
		.pipe(gulp.dest('./src/'))
		.on('end', done);
});

gulp.task('config', () => envConfig());

gulp.task('build', ['config', 'pug', 'onesignal-assets']);

gulp.task('version', () => versioner.exec());

gulp.task('release', ['config', 'version', 'pug', 'onesignal-assets', 'android:copy-signing']);

gulp.task('android:copy-signing', function (done) {
	var gTask;

	var signingFiles = [
		'*.keystore',
		'release-signing.properties'
	];

	signingFiles.forEach(file => {
		gTask = gulp.src(file)
			.pipe(gulp.dest('platforms/android'));
	});

	if (gTask) gTask.on('end', done);
});


gulp.task('onesignal-assets', done => {
	let gTask;

	'h l m xh xxh xxxh'.split(' ')
		.forEach(dpi => {
			dpi += 'dpi';
			gTask = gulp.src(`resources/android/icon/drawable-${dpi}-icon.png`)
				.pipe(rename('ic_stat_onesignal_default.png'))
				.pipe(gulp.dest(`platforms/android/res/drawable-${dpi}`));
		});

	if (gTask) gTask.on('end', done);
});
