$(document).ready(function () {
    var element1 = document.getElementById('react-circle');
    var circleColor = 'deeppink';
    var circle1 = new ProgressBar.Circle(element1, {
        strokeWidth: 5,
    });
    circle1.path.setAttribute('stroke', circleColor);
    circle1.animate(1, function() {
        circle1.animate(0.85);
    });
    circle1.setText("react");

    var element2 = document.getElementById('javascript-circle');
    var circle2 = new ProgressBar.Circle(element2, {
        strokeWidth: 5,
    });
    circle2.path.setAttribute('stroke', circleColor);
    circle2.animate(1, function() {
        circle2.animate(0.75);
    });
    circle2.setText("javascript");

    var element3 = document.getElementById('css-circle');
    var circle3 = new ProgressBar.Circle(element3, {
        strokeWidth: 5,
    });
    circle3.path.setAttribute('stroke', circleColor);
    circle3.animate(1, function() {
        circle3.animate(0.7);
    });
    circle3.setText("css");
    // backend
    var element4 = document.getElementById('php-circle');
    var circleColor = 'deeppink';
    var circle4 = new ProgressBar.Circle(element4, {
        strokeWidth: 5,
    });
    circle4.path.setAttribute('stroke', circleColor);
    circle4.animate(1, function() {
        circle4.animate(0.9);
    });
    circle4.setText("php");

    var element5 = document.getElementById('laravel-circle');
    var circle5 = new ProgressBar.Circle(element5, {
        strokeWidth: 5,
    });
    circle5.path.setAttribute('stroke', circleColor);
    circle5.animate(1, function() {
        circle5.animate(0.75);
    });
    circle5.setText("laravel");

    var element6 = document.getElementById('sql-circle');
    var circle6 = new ProgressBar.Circle(element6, {
        strokeWidth: 5,
    });
    circle6.path.setAttribute('stroke', circleColor);
    circle6.animate(1, function() {
        circle6.animate(0.7);
    });
    circle6.setText("SQL");
})