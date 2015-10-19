module.exports = function(grunt) {
  // load all grunt tasks...
  require('load-grunt-tasks')(grunt);
  // display how long finished the task
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    options: {
      lib: 'lib',
      app: 'app',
      jsdest: 'public/javascripts',
      custjs: 'public/javascripts/custjs',
      trait: 'public/stylesheets',
      minjs: 'public/minjs',
      mincss: 'public/mincss'
    },

    concat: {
      lib: {
        src: [
          '<%= options.lib %>/jquery/dist/jquery.min.js',
          '<%= options.lib %>/angular/angular.min.js',
          '<%= options.lib %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
          '<%= options.lib %>/angular-ui-router/release/angular-ui-router.min.js',
        ],
        dest: '<%= options.jsdest %>/libs-compiled.js'
      },
      app: {
        src: [
          '<%= options.app %>/**/*.js'
        ],
        dest: '<%= options.jsdest %>/app-compiled.js'
      }
    },

    uglify: {
      app: {
        src: [
          '<%= options.jsdest %>/libs-compiled.js',
          '<%= options.jsdest %>/app-compiled.js',
          '<%= options.custjs%>/**/*.js'
        ],
        dest: '<%= options.minjs %>/js.min.js'
      }
      // target:{
      //   files:
      //   {
      //     '<%= options.jsdest %>/minfile/js.min.js': ['<%= options.jsdest %>/**/*.js']
      //   }
      // }
    },

    cssmin: {
        target: {
          files: [{
            // expand: true,
            src: ['<%= options.trait %>/**/*.css'],
            dest: '<%= options.mincss %>/app.min.css'
          }]
        }
    },

    /*jshint: {
      files: ['Gruntfile.js', '<%= options.jsdest %>/libs-compiled.js', '<%= options.jsdest %>/app-compiled.js'],
      options: {
        //"latedef": true,
        //"nonew": true,
        //"undef": true,
        //"unused": true,
        // "strict": true,
        "jquery": true,
        // "curly": true,
        "eqnull": true,
        "eqeqeq": true,
        "nocomma": true,
        "node": true
      }
    },*/

    watch: {
      app: {
        files: ['<%= options.app %>/**/*.js'],
        tasks: ['concat:app'],
        expand: true
      },
      jsCompressor:
      {
        files: ['<%= options.jsdest %>/**/*.js'],
        tasks: ['uglify']
      },
      cssCompressor:
      {
        files: ['<%= options.trait %>/**/*.css'],
        tasks: ['cssmin']
      }
      /*jshint:
      {
        files: ['Gruntfile.js', '<%= options.jsdest %>/libs-compiled.js', '<%= options.jsdest %>/app-compiled.js'],
        tasks: ['jshint']
      }*/
    }

  });

  // Load the plugin that provides the "uglify" task.
  // use load-grunt-tasks on top...
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'watch']);

};