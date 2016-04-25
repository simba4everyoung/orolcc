module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*', './package.json').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//Task - Watch
		watch: {
			options: {
				reload: true,
				atBegin: true,
			},
			css: {
				files: [
					'sass/*.scss',
					'sass/*/_*.scss',
					'sass/*/*/_*.scss'
				],
				tasks: ['sass', 'postcss']
			},
			js： {
				files: [
					'js/main/*.js',
					'js/main/*/*.js'
				],
				tasks: ['jshint', 'concat:myjs']
			},
			svg: {
				files: ['i/svg-store/*.svg'],
				tasks: ['svgstore']
			}
		},

		//Task - JSHint
		jshint: {
			all: ['js/main/*.js', 'js/main/function/*.js']
		},

		//Task - Compile Sass
		sass: {
			options: {
				sourceMap: true
			},
			dev: {
				files: {
					'css/orolcc.css': 'sass/main.scss'
				}
			}
		},

		//Task - PostCSS
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({
						browsers: ['last 2 versions']
					}),
					require('cssnano')({
						zindex: false
					})
				]
			},
			dev: {
				src: 'css/orolcc.css'
			}
		},

		//Task - Merge Codes
		concat: {
			myjs: {
				src: [
					'js/main/functions/*.js',
					'js/main/*.js'
				],
				dest: 'js/orolcc-main.js',
			},
			vendor: {
				src: [

				],
				dest: 'js/orolcc-vendor.js',
				nonull: true
			},
			vendorScss: {
				src: [
				],
				dest: 'sass/base/_vendor.scss',
				nonull: true
			}
		},

		//Task - Minify JS
		uglify: {
			vendor: {
				files: {
					'js/orolcc-vendor.js': ['js/orolcc-vendor.js']
				},
				options: {
					preserveComments: false
				}
			},
			main: {
				files: {
					'js/orolcc-main.js': ['js/orolcc-main.js']
				},
				options: {
					preserveComments: false
				}
			}
		},

		//Task - Create SVG Sprite
		svgstore: {
			options: {
				svg: {
					style: 'display: none;',
					viewBox: '0 0 500 500',
					x: '0px',
					y: '0px'
				},
				includedemo: true,
				includeTitleElement: false,
				preserveDescElement: false,
				cleanup: true
			},
			default: {
				files: {
					'i/assets.svg': ['i/svg-store/*.svg']
				}
			}
		},

	});		//grunt.initConfig()

	grunt.registerTask('buildProduct', ['uglify', 'postcss']);

}