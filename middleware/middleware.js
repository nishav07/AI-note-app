
function flash(req,res,next){
    res.locals.success = req.flash("success");
    res.locals.success = req.flash("error");
    next();
}

module.exports = {
    flash
}