/**
 * Created by shawnmccarthy on 1/22/17.
 */
'use strict;';
//Include crypto to generate the movie id
var crypto = require('crypto');
module.exports = function () {
    return {
        userList: [],
        movieList: [],
        /*
         * Save the user inside the "db".
         */
        save: function (user) {
            user.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.userList.push(user);
            return 1;
        },
        /*
         * Retrieve a movie with a given id or return all the movies if the id is undefined.
         */
        find: function (id) {
            if (id) {
                return this.movieList.find(function (element) {
                    return element.id === id;
                });
            }
            else {
                return this.movieList;
            }
        },
        /*
         *  Create a new movie
        */
        saveM: function(movie) {
            //movie.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.movieList.push(movie);
            return 1;
            
        },


        findOne: function (name) {
            if (name) {
                return this.userList.find(function (element) {
                    return element.username === name;
                });
            }
            else {
                return this.userList;
            }
        },
        /*
         * Delete a movie with the given id.
         */
        remove: function (id) {
            var found = 0;
            this.movieList = this.movieList.filter(function (element) {
                if (element.id === id) {
                    found = 1;
                }
                else {
                    return element.id !== id;
                }
            });
            return found;
        },
        /*
         * Update a movie with the given id
         */
        update: function (id, movie) {
            var movieIndex = this.movieList.findIndex(function (element) {
                return element.id === id;
            });
            if (movieIndex !== -1) {
                this.movieList[movieIndex].moviename = movie.moviename;
                this.movieList[movieIndex].id = movie.id;
                return 1;
            }
            else {
                return 0;
            }
        }
    };
};