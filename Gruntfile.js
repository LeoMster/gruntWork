module.exports = function(grunt){
    grunt.initConfig({
        htmlmin:{
            options:{
                collapseWhitespace: true
            },
            files:{
                src: "dist/index.html",
                dest: "dist/index.html"
            }
        },
        cssmin:{
            "dist/index.css":"index.css"
        },
        uglify:{
            release:{
                files:{
                    "dist/bundle.min.js":"dist/bundle.js"
                }
            }
        },
        concat:{
            options:{
                separator: ";"
            },
            js:{
                src: ["index.js","prompt.js"],
                dest: "dist/bundle.js"
            }
        },
        copy:{
            html:{
                src: "./index.html",
                dest:"./dist/index.html"
            }
        },
        useminPrepare:{
            html: "index.html",
            options:{
                dest: "dist"
            }
        },
        usemin:{
            html: ["dist/index.html"]
        }
    })

    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-usemin");

    grunt.registerTask("release",["copy","useminPrepare","concat","uglify","usemin","htmlmin","cssmin"]);
}