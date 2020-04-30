//Подключение модуля Gulp
const gulp = require('gulp');
//Подключение модуля бьединения файлов
const concat = require('gulp-concat');
//Подключение модуля автопрефиксера
const autoprefixer = require('gulp-autoprefixer');
const browserList = require('browserslist');
//Подключение модуля сжатия CSS
const cleanCss = require('gulp-clean-css');
//Подключение модуля отчистки выходной директории 
const del = require('del');
//Автообновление браузера
const browserSync = require('browser-sync').create();
//Подключение модуля сжатия JS
const uglify = require('gulp-uglify');
//Babel 7
const babel = require('gulp-babel');

//Обьединение файлов CSS переменная
const cssFiles = [
	'./src/css/style.css'
];

function styles() {
	//Входная папка
	return gulp.src(cssFiles)
		//Обьединение файлов
		.pipe(concat('style.css'))
		//Подключаем автопрефиксер (нужно обновить конфиг)
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		//Сжатие файла 
		.pipe(cleanCss({
			compatibility: 'ie8'
		}))
		//Выходная папка
		.pipe(gulp.dest('./dist/css'))
		//Автообновление браузера
		.pipe(browserSync.stream());
}

//Обьединение файлов JS переменная
const jsFiles = [
	'./src/js/main.js'
];

function scripts() {
	//Входная папка
	return gulp.src(jsFiles)
		//Обьединение файлов
		.pipe(concat('main.js'))
		//babel
		.pipe(babel())
		//Минимизация JS
		.pipe(uglify({
			toplevel: true // опция максимального сжатия
		}))
		//Выходная папка
		.pipe(gulp.dest('./dist/js'))
		//Автообновление браузера
		.pipe(browserSync.stream());
}

//Отчистка выходной директории (в данном случае папка build)
function cleanFolder() {
	return del([
		'dist/*'
	]);
}

function watch() {
	//Автообновление браузера (инициализация)
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	//Следить за CSS
	gulp.watch('./src/css/**/*.css', styles)
	//Следить за JS
	gulp.watch('./src/js/**/*.js', scripts)
	//Следить за HTML
	gulp.watch("./*.html").on('change', browserSync.reload);
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('cleanFolder', cleanFolder);
gulp.task('watch', watch);
//Последовательное и параллельное выполнение задач
gulp.task('build', gulp.series(cleanFolder, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));
