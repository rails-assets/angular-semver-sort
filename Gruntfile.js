module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      build: {
        options: {
          banner: [
            '/*!',
            '  <%= pkg.name %> v<%= pkg.version %> <http://git.io/angular-semver>',
            '  @includes <http://git.io/semver> by Isaac Z. Schlueter',
            '  @license <%= pkg.license %>',
            '*/',
          ].concat('').join('\n')
        },
        src: [
          'node_modules/semver/semver.browser.js',
          'src/<%= pkg.name %>.js'
        ],
        dest: '<%= pkg.name %>.js'
      }
    },

    karma: {
      options: {
        files: [
          'bower_components/angular/angular.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'node_modules/should/should.js',
          '<%= pkg.name %>.js',
          'test/**/*.js'
        ],
        frameworks: ['jasmine'],
        logLevel: 'warn',
        singleRun: true
      },
      test: {
        browsers: ['PhantomJS', 'Chrome', 'Firefox']
      },
      ci: {
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.registerTask('default', ['concat']);
  grunt.registerTask('test', ['karma:test']);
  grunt.registerTask('test:ci', ['concat', 'karma:ci']);
};
