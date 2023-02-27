// starter code routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/", async (req, res, next) => {
    try {
        const allMovies = await Movie.find().populate("cast");
        console.log(allMovies);
        res.render("movies/movies", { allMovies });
    } catch (error) {
        next(error);
    }
});

router.get("/create", async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find();
        res.render("movies/new-movie", { allCelebrities });
    } catch (error) {
        next(error);
    }
});

router.post("/create", async (req, res, next) => {
    try {
        const { title, genre, plot, cast } = req.body;

        await Movie.create({ title, genre, plot, cast });
        res.redirect("/movies");
    } catch (error) {
        next(error);
    }
});

router.post("/:id/delete", async (req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.id)
        res.redirect("/movies");
    } catch (error) {
        next(error);
    }
});


module.exports = router;